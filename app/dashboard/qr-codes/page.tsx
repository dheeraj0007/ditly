"use client";
import { Button } from "@/components/ui/button";
import { Dot, Download, Calendar, ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type QRCode = {
  id: string;
  url: string;
  userId: string;
  createdAt: string;
  image: string;
};

function QRCodes() {
  const session = useSession();
  const user = session?.data?.user;
  const [qrcodes, setQRCodes] = useState<QRCode[]>([]);
  const [host, setHost] = useState("");
  const handleDownload = async (imageUrl: string, id: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Download failed");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.host);
    }
    const fetchData = async () => {
      const res = await fetch(`/api/qrcodes/?userId=${user?.id}`);
      const data = await res.json();
      if (data) {
        console.log(data.data);
        setQRCodes(data.data);
      } else {
        setQRCodes([]);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center md:w-[60vw]">
          <h1 className="text-2xl font-semibold">QR Codes</h1>
          <Button className="bg-blue-500 text-white rounded-none">
            <Link href={"/dashboard/qr-codes/create"}>Create Code</Link>
          </Button>
        </div>
        <div className="flex flex-col justify-around space-y-3 pt-10">
          {qrcodes.map((qrcode) => {
            return (
              <div
                key={qrcode.id}
                className="bg-white p-5 md:pl-10 flex flex-row justify-between px-10 md:w-[60vw]"
              >
                <div className="flex space-x-5 items-center">
                  <Image
                    src={qrcode.image}
                    alt="qrcode"
                    width={100}
                    height={100}
                  ></Image>
                  <div className="space-y-2">
                    <h1 className="text-lg font-semibold flex items-center">
                      {qrcode.url}
                    </h1>
                    <p className="flex *:space-x-2">
                      <span>Website </span>
                      <ArrowUpRight className="w-5" />{" "}
                      <Link href={qrcode.url} className="hover:underline">
                        {qrcode.url}
                      </Link>
                    </p>
                    <p className="text-sm flex space-x-2">
                      <Calendar className="w-5 h-5" />{" "}
                      <span>{new Date(qrcode.createdAt).toDateString()}</span>
                    </p>
                  </div>
                </div>
                <Download
                  onClick={() => handleDownload(qrcode.image, qrcode.id)}
                  className="w-10 border-[1px] border-gray-300 p-1 cursor-pointer"
                />
              </div>
            );
          })}
          {qrcodes.length === 0 && (
            <div>
              <h1 className="text-2xl font-semibold">No QR Codes Found</h1>
              <p className="text-gray-500">Create your first QR Code Now!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRCodes;
