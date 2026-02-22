import { supabase } from "../config/supabaseClient";

type UploadOptions = {
    folder?: string;
};

export async function uploadFileToS3(
    file: File,
    options?: UploadOptions
): Promise<string> {
    if (!file) {
        throw new Error("No file provided");
    }

    const { data, error } = await supabase.functions.invoke(
        "s3-upload-url",
        {
            body: {
                fileName: file.name,
                contentType: file.type,
                folder: options?.folder ?? "files",
            },
        }
    );

    if (error || !data?.uploadUrl || !data?.publicUrl) {
        throw new Error("Failed to get signed URL");
    }

    const { uploadUrl, publicUrl } = data;

    const blob = new Blob([await file.arrayBuffer()], { type: file.type, });

    const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: blob,
    });

    if (!uploadRes.ok) {
        const text = await uploadRes.text();
        throw new Error(`S3 upload failed: ${text}`);
    }

    return publicUrl;
}