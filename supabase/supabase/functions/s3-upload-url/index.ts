import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import {
  S3Client,
  PutObjectCommand,
} from "npm:@aws-sdk/client-s3";
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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

  const { fileName, contentType } = await req.json();

  const bucket = Deno.env.get("BUCKET_NAME");
  const region = Deno.env.get("BUCKET_REGION");
  const accessKeyId = Deno.env.get("ACCESS_KEY");
  const secretAccessKey = Deno.env.get("SECRET_ACCESS_KEY");

  if (!bucket || !region || !accessKeyId || !secretAccessKey) {
    return new Response("Missing AWS configuration", { status: 500, headers: corsHeaders });
  }

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const objectKey = `files/${crypto.randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${objectKey}`;

  return new Response(
    JSON.stringify({ uploadUrl, publicUrl, objectKey }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
});