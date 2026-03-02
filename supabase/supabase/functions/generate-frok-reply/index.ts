import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_USERNAME = "frok";
const SYSTEM_EMAIL = "frok@system.local";
const FROK_TRIGGER = /@frok\b/i;

type FrokRequest = {
  commentId: string;
  postId: string;
  content: string;
};

type ChatCompletionResponse = {
  choices: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureSystemUser(supabaseAdmin: ReturnType<typeof createClient>) {
  const { data: existing, error: lookupError } = await supabaseAdmin
    .from("users")
    .select("id, username")
    .eq("username", SYSTEM_USERNAME)
    .maybeSingle();

  if (lookupError) {
    throw new Error(lookupError.message);
  }

  if (existing) {
    return existing;
  }

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: SYSTEM_EMAIL,
      password: crypto.randomUUID(),
      email_confirm: true,
      user_metadata: {
        username: SYSTEM_USERNAME,
      },
    });

  if (authError || !authData.user) {
    throw new Error(authError?.message ?? "Failed to create system user");
  }

  const { error: profileError } = await supabaseAdmin.from("users").upsert({
    id: authData.user.id,
    username: SYSTEM_USERNAME,
    first_name: "Frok",
    last_name: "Bot",
    bio: "System assistant for threaded replies.",
    avatar_url: null,
    role: "user",
    is_blocked: false,
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  return { id: authData.user.id, username: SYSTEM_USERNAME };
}

async function generateReply(
  apiKey: string,
  commentContent: string,
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are Frok: technical, concise, slightly witty, and helpful. " +
            "Reply in a single paragraph (1-3 sentences, max 60 words). " +
            "No emojis, no fluff, no lists.",
        },
        {
          role: "user",
          content: `Comment: ${commentContent}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${errorText}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error("OpenAI response was empty");
  }

  return reply;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const openAiApiKey = Deno.env.get("OPENAI_API_KEY");

  if (!supabaseUrl || !supabaseServiceRoleKey || !openAiApiKey) {
    return new Response("Missing Supabase or OpenAI configuration", {
      status: 500,
      headers: corsHeaders,
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const token = authHeader.replace("Bearer ", "");
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.getUser(token);

  if (authError || !authData.user) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const body = (await req.json()) as FrokRequest;
  const { commentId, postId, content } = body;

  if (!commentId || !postId || !content) {
    return new Response("Invalid payload", {
      status: 400,
      headers: corsHeaders,
    });
  }

  if (!FROK_TRIGGER.test(content)) {
    return new Response(JSON.stringify({ skipped: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const systemUser = await ensureSystemUser(supabaseAdmin);
    const reply = await generateReply(openAiApiKey, content);

    await sleep(900);

    const { error: insertError } = await supabaseAdmin.from("comments").insert({
      post_id: postId,
      parent_id: commentId,
      author_id: systemUser.id,
      content: reply,
    });

    if (insertError) {
      return new Response(insertError.message, {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(message, { status: 500, headers: corsHeaders });
  }
});
