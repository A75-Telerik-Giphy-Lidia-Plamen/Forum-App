import { supabase } from "../config/supabaseClient";

export type PresignedUpload = {
  uploadUrl: string;
  publicUrl: string;
  objectKey: string;
  bucket: string;
  storageProvider: "s3";
};

export type UploadedMedia = {
  publicUrl: string;
  objectKey: string;
  bucket: string;
  storageProvider: "s3";
};

export async function getS3PresignedUpload(
  file: File,
): Promise<PresignedUpload> {
  if (!file) {
    throw new Error("No file provided");
  }

  const { data, error } = await supabase.functions.invoke("s3-upload-url", {
    body: {
      fileName: file.name,
      contentType: file.type,
    },
  });

  if (error || !data?.uploadUrl || !data?.publicUrl || !data?.objectKey) {
    throw new Error("Failed to get signed URL");
  }

  const bucket = extractBucket(data.publicUrl);
  if (!bucket) {
    throw new Error("Failed to determine S3 bucket");
  }

  return {
    uploadUrl: data.uploadUrl,
    publicUrl: data.publicUrl,
    objectKey: data.objectKey,
    bucket,
    storageProvider: "s3",
  };
}

export async function uploadMediaToS3(file: File): Promise<UploadedMedia> {
  const { uploadUrl, publicUrl, objectKey, bucket, storageProvider } =
    await getS3PresignedUpload(file);

  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

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

  return { publicUrl, objectKey, bucket, storageProvider };
}

function extractBucket(publicUrl: string): string {
  try {
    const { host } = new URL(publicUrl);
    const [bucket] = host.split(".s3.");
    return bucket ?? "";
  } catch {
    return "";
  }
}
