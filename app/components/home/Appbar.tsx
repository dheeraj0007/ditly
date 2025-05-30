"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Appbar = () => {
  const session = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 px-10 md:px-20 py-5 flex justify-between items-center ${
        isScrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-[#022b52]"
      }`}
    >
      <h1
        className={`text-3xl underline italic ${
          isScrolled ? "text-[#022b52]" : "text-orange-500"
        }`}
      >
        Ditly
      </h1>

      <div className="items-center gap-6 hidden md:flex">
        <Link
          href={"/"}
          className={`${!isScrolled ? "text-white" : "text-[#022b52]"}`}
        >
          Home
        </Link>
        <Link
          href={"/dashboard"}
          className={`${!isScrolled ? "text-white" : "text-[#022b52]"}`}
        >
          Dashboard
        </Link>
        <Link
          href={"/dashboard/my-urls"}
          className={`${!isScrolled ? "text-white" : "text-[#022b52]"}`}
        >
          My URLs
        </Link>
        <Link
          href={"/dashboard/analytics"}
          className={`${!isScrolled ? "text-white" : "text-[#022b52]"}`}
        >
          Analytics
        </Link>
        <Link
          href={"/contact"}
          className={`${!isScrolled ? "text-white" : "text-[#022b52]"}`}
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {session.data?.user ? (
          <Button
            onClick={() => signOut()}
            className={`cursor-pointer border-2 ${
              isScrolled
                ? "bg-[#042e55] text-white border-[#042e55]"
                : "bg-[#042e55] text-white border-white"
            }`}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => signIn()}
            className={`cursor-pointer border-2 ${
              isScrolled
                ? "bg-[#042e55] text-white border-[#042e55]"
                : "bg-[#042e55] text-white border-white"
            }`}
          >
            Sign in
          </Button>
        )}
        {session && session.data && (
          <Image
            src={session.data.user.image || "/vercel.svg"}
            alt="Profile"
            height={45}
            width={45}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default Appbar;
