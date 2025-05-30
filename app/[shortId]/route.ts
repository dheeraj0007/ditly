export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/lib/db";

type Params = Promise<{ shortId: string }>;
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { shortId } = await params;

  try {
    const existingUrl = await prismaClient.shorturl.findUnique({
      where: {
        shortId: shortId,
      },
    });

    if (!existingUrl) {
      return NextResponse.json(
        {
          status: false,
          message: "Short URL not found",
        },
        { status: 404 }
      );
    }

    await prismaClient.shorturl.updateMany({
      where: {
        shortId: shortId,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.redirect(existingUrl.url);
  } catch (err) {
    console.error("Error during redirect:", err);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
