"use server";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_WIDTH = 1920;

export async function uploadImage(
  file: File
): Promise<{ path?: string; error?: string }> {
  if (!file || file.size === 0) {
    return { error: "Keine Datei ausgewählt" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Nur JPEG, PNG und WebP erlaubt" };
  }

  if (file.size > MAX_SIZE) {
    return { error: "Datei zu groß (max. 10MB)" };
  }

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const randomId = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}-${randomId}.webp`;

    const rawBuffer = Buffer.from(await file.arrayBuffer());
    const optimized = await sharp(rawBuffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    await fs.writeFile(path.join(UPLOAD_DIR, filename), optimized);

    return { path: `/uploads/${filename}` };
  } catch {
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
