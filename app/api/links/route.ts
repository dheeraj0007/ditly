import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { nanoid } from "nanoid";
import { getLinkPreview } from "link-preview-js";

const CreateUrlSchema = z.object({
  userId: z.string(),
  url: z.string().url(),
});

function sanitize(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitize);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        val === undefined ? null : sanitize(val),
      ])
    );
  }
  return obj;
}
export async function POST(req: NextRequest) {
  try {
    const data = CreateUrlSchema.parse(await req.json());
    const { userId, url } = data;
    const preview = await getLinkPreview(url);
    const previewSanitized = sanitize({
      ...preview,
      domain: new URL(url).hostname,
    });
    const newUrl = await prismaClient.shorturl.create({
      data: {
        shortId: nanoid(10),
        url: url,
        userId: userId,
        metadata: previewSanitized,
      },
    });
    return NextResponse.json({
      status: true,
      message: "Short URL created successfully",
      data: newUrl,
    });
  } catch (error: any) {
    console.error("Error creating short URL:", error);
    return NextResponse.json({
      status: false,
      message: "Failed to create short URL",
    });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 403,
      }
    );
  }
  const links = await prismaClient.shorturl.findMany({
    where: {
      userId: userId,
    },
  });
  return NextResponse.json({
    status: true,
    message: "Links fetched successfully",
    data: links,
  });
}
