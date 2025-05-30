"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

function Header() {
  const [activeTab, setActiveTab] = useState("short-link");
  return (
    <div className="py-10 flex flex-col items-center space-y-8 justify-center px-5 bg-[#022b52]">
      <h1 className="text-white text-3xl md:text-5xl font-bold">
        Build Stronger Digital Connections
      </h1>

      <p className="text-white md:text-xl mt-4 md:max-w-4xl md:text-center">
        Use our URL shortener, QR Codes to engage your audience and connect them
        to the right information. Build, edit, and track everything inside the
        Ditly Connections Platform.
      </p>

      <div className="mt-5">
        <Button
          className={`${
            activeTab === "short-link"
              ? "bg-white text-black"
              : "text-white bg-[#022b52]"
          } mr-2 hover:text-white p-3`}
          onClick={() => {
            setActiveTab("short-link");
          }}
        >
          Short link
        </Button>
        <Button
          className={`${
            activeTab === "qr-code"
              ? "bg-white text-black"
              : "text-white bg-[#022b52]"
          } hover:text-white p-3`}
          onClick={() => {
            setActiveTab("qr-code");
          }}
        >
          QR Code
        </Button>
      </div>
      {activeTab === "short-link" ? (
        <div className="w-full mx-3 md:w-[55vw] bg-white h-72 md:h-80 rounded-xl p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold">Shortner a long link</h1>
          <p className="text-lg font-bold pt-8">Paste your long link here</p>
          <Input
            placeholder="https://example.com/my-long-url"
            className="placeholder:text-gray-500 mt-2"
          />
          <Button
            className="mt-10 bg-[#054581] text-white hover:bg-[#022b52]/90 cursor-pointer w-fit"
            onClick={() => signIn("google")}
          >
            Get your link for free <ArrowRight />
          </Button>
        </div>
      ) : (
        <div className="w-full mx-3 md:w-[55vw] bg-white h-72 md:h-80 rounded-xl p-6 flex justify-between">
          <div className="flex flex-col justify-center w-full">
            <h1 className="text-3xl font-semibold">Create a QR code</h1>
            <p className="text-lg font-bold pt-8">
              Enter your QR Code destination
            </p>
            <Input
              placeholder="https://example.com/my-long-url"
              className="placeholder:text-gray-500 mt-2"
            />
            <Button
              className="mt-10 bg-[#054581] text-white hover:bg-[#022b52]/90 cursor-pointer w-fit"
              onClick={() => signIn("google")}
            >
              Get your QR code for free <ArrowRight />
            </Button>
          </div>
          <Image
            src={"/qrcode.png"}
            alt="qrcode"
            height={720}
            width={1080}
            className="w-[50%] hidden md:block"
          />
        </div>
      )}
    </div>
  );
}

export default Header;
