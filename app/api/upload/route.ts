import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { isRequestAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: { secure_url: string } = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "pklakhani-blog",
            format: "webp",
            transformation: [{ quality: "auto" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string });
          },
        );
        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
