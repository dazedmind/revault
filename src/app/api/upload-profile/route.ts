import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import formidable, { IncomingForm } from "formidable";
import path from "path";
import { mkdir, stat } from "fs/promises";
import { Readable } from "stream";

// Enable streaming
export const dynamic = "force-dynamic";

// Helper to convert NextRequest to Node-compatible stream with headers
function buildRequestLike(req: NextRequest): any {
  const readable = Readable.fromWeb(req.body as any);
  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
  });
}

export async function POST(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), "/public/uploads");

    try {
      await stat(uploadDir);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      multiples: false,
    });

    const reqLike = buildRequestLike(req);

    const { fields, files } = await new Promise<any>((resolve, reject) => {
      form.parse(reqLike, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const userId = Number(fields.user_id);
    const file = files.profile_picture?.[0];
    if (!file || !userId) {
      return new Response(JSON.stringify({ error: "Missing file or user_id" }), { status: 400 });
    }

    const fileUrl = `/uploads/${path.basename(file.filepath)}`;

    await prisma.users.update({
      where: { user_id: userId },
      data: { profile_picture: fileUrl },
    });

    return new Response(JSON.stringify({ success: true, fileUrl }), { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), { status: 500 });
  }
}
