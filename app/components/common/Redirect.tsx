"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

function Redirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      if (pathname !== "/") {
        router.push("/");
      }
    } else {
      if (pathname === "/") {
        router.push("/dashboard");
      }
    }
  }, [session, status, pathname, router]);

  return null;
}

export default Redirect;
