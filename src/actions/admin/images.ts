"use server";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_WIDTH = 1920;

async function optimizeWithSharp(buffer: Buffer): Promise<Buffer | null> {
  try {
    const sharp = (await import("sharp")).default;
    return await sharp(buffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch (err) {
    console.error("[Upload] Sharp optimization failed:", err);
    return null;
  }
}

export async function uploadImage(
  file: File
): Promise<{ path?: string; error?: string }> {
  console.log("[Upload] Called with:", { name: file?.name, size: file?.size, type: file?.type });

  if (!file || file.size === 0) {
    console.log("[Upload] No file or empty");
    return { error: "Keine Datei ausgewählt" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    console.log("[Upload] Invalid type:", file.type);
    return { error: "Nur JPEG, PNG und WebP erlaubt" };
  }

  if (file.size > MAX_SIZE) {
    console.log("[Upload] Too large:", file.size);
    return { error: "Datei zu groß (max. 10MB)" };
  }

  try {
    console.log("[Upload] Writing to:", UPLOAD_DIR);
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const rawBuffer = Buffer.from(await file.arrayBuffer());
    console.log("[Upload] Buffer size:", rawBuffer.length);
    const randomId = crypto.randomBytes(8).toString("hex");

    // Try to optimize with sharp, fallback to raw file
    const optimized = await optimizeWithSharp(rawBuffer);
    console.log("[Upload] Sharp result:", optimized ? `${optimized.length} bytes` : "null (fallback)");

    if (optimized) {
      const filename = `${Date.now()}-${randomId}.webp`;
      await fs.writeFile(path.join(UPLOAD_DIR, filename), optimized);
      console.log("[Upload] Saved:", filename);
      return { path: `/uploads/${filename}` };
    }

    // Fallback: save original file as-is
    const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
    const filename = `${Date.now()}-${randomId}.${ext}`;
    await fs.writeFile(path.join(UPLOAD_DIR, filename), rawBuffer);
    console.log("[Upload] Saved (fallback):", filename);
    return { path: `/uploads/${filename}` };
  } catch (err) {
    console.error("[Upload] Failed:", err);
    return { error: "Upload fehlgeschlagen" };
  }
}

export async function uploadImageAction(
  _prevState: { path?: string; error?: string } | null,
  formData: FormData
): Promise<{ path?: string; error?: string }> {
  const file = formData.get("file") as File;
  return uploadImage(file);
}
