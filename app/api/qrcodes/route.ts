import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import QRCode from "qrcode";
import cloudinary from "@/app/lib/cloudinary";
import { prismaClient } from "@/app/lib/db";

const CreateQrCodeSchema = z.object({
  userId: z.string(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateQrCodeSchema.parse(await req.json());
    const { userId, url } = data;
    const qrDataUrl = await QRCode.toDataURL(url);
    const uploadResult = await cloudinary.uploader.upload(qrDataUrl, {
      folder: `qrcodes/${userId}`,
    });
    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json({
        status: false,
        message: "Failed to upload qr code image",
      });
    }

    const newQrCode = await prismaClient.qRCode.create({
      data: {
        userId: userId,
        url: url,
        image: uploadResult.secure_url,
      },
    });
    return NextResponse.json({
      status: true,
      message: "QR Code generated successfully",
      data: newQrCode,
    });
  } catch (err: any) {
    console.error("Error generating QR Code:", err);
    return NextResponse.json({
      status: false,
      message: "Failed to generate QR Code",
      error: err.message || "Unknown error",
    });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({
      status: false,
      message: "User ID is required",
    });
  }

  try {
    const qrCodes = await prismaClient.qRCode.findMany({
      where: { userId: userId },
    });
    return NextResponse.json({
      status: true,
      data: qrCodes,
    });
  } catch (error) {
    console.error("Error fetching QR Codes:", error);
    return NextResponse.json({
      status: false,
      message: "Failed to fetch QR Codes",
    });
  }
}
