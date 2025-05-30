"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Copy, Dot } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ShortLink = {
  id: string;
  url: string;
  shortId: string;
  clicks: number;
  userId: string;
  createdAt: string;
  bookmark: boolean;
  metadata: any;
};

function Links() {
  const session = useSession();
  const user = session?.data?.user;
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [host, setHost] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.host);
    }
    const fetchData = async () => {
      const res = await fetch(`/api/links/?userId=${user?.id}`);
      const data = await res.json();
      if (data) {
        console.log(data.data);
        setLinks(data.data);
      } else {
        setLinks([]);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center md:w-[60vw]">
        <h1 className="text-2xl font-semibold">Ditly Links</h1>
        <Button className="bg-blue-500 text-white rounded-none">
          <Link href={"/dashboard/my-urls/create"}>Create Link</Link>
        </Button>
      </div>
      <div className="flex flex-col justify-around space-y-3 pt-10">
        {links.map((link) => {
          return (
            <div
              key={link.id}
              className="bg-white p-5 md:pl-10 flex flex-col justify-around md:w-[60vw]"
            >
              <h1 className="text-lg font-semibold flex items-center">
                {link.metadata.title == ""
                  ? link.metadata.domain
                  : link.metadata.title}
                {<Dot />}
                {link.metadata.siteName == null
                  ? "untitled"
                  : link.metadata.siteName}
              </h1>
              <div className="flex justify-between items-center">
                <Link
                  href={`http://${host}/${link.shortId}`}
                  className="text-sm text-blue-600 font-semibold"
                  target="_blank"
                >
                  {host}/{link.shortId}
                </Link>
                <Button
                  onClick={() => {
                    const shareableLink = `http://${host}/${link.shortId}`;
                    navigator.clipboard.writeText(shareableLink).then(
                      () => {
                        toast.success("Link Copied to Clipboard");
                      },
                      (err) => {
                        toast.error("Error while copying link to clipboard");
                      }
                    );
                  }}
                  className="bg-white text-black border-[1px] border-gray-100 hover:bg-gray-100 cursor-pointer"
                >
                  {" "}
                  <Copy /> Copy{" "}
                </Button>
              </div>
              <Link href={link.url} className="hover:underline font-semibold">
                {link.url}
              </Link>
              <div className="flex items-center text-sm mt-5">
                <Calendar className="h-4" />
                <span> {new Date(link.createdAt).toDateString()}</span>
                <span className="ml-3">Clicks : {link.clicks}</span>
              </div>
            </div>
          );
        })}
        {links.length === 0 && (
          <div>
            <h1 className="text-2xl font-semibold">No Links Found</h1>
            <p className="text-gray-500">Create your first link now!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Links;
