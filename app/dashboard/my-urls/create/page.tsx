"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateUrl() {
  const session = useSession();
  const user = session?.data?.user;
  const [inputLink, setInputLink] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputLink) {
      const error = toast.error("Please enter a URL to shorten.");
      return;
    }
    setLoading(true);
    const loading = toast.loading("Creating short Url..");
    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        url: inputLink,
      }),
    });
    const data = await res.json();
    if (data.status) {
      toast.success("Short URL created successfully!", {
        id: loading,
      });
    } else {
      toast.error(data.message || "Failed to create short URL", {
        id: loading,
      });
    }
    setLoading(false);
    setInputLink("");
    redirect("/dashboard/my-urls");
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold">Create New Link</h1>
      <p className="mt-2 text-gray-600">
        Use the form below to create a new shortened URL.
      </p>
      <form action="" className="mt-6 bg-white p-5" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <Label htmlFor="url" className="text-lg">
            Destination
          </Label>
          <Input
            type="text"
            placeholder="https://example.com/my-long-url"
            onChange={(e) => setInputLink(e.target.value)}
          />
        </div>
        <Button
          className="mt-5 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Short URL"}
        </Button>
      </form>
    </div>
  );
}

export default CreateUrl;
