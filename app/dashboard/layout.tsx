"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Redirect from "../components/common/Redirect";
import Navbar from "../components/dashboard/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  try {
    if (!session?.user.id) {
      return <Redirect />;
    }
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Navbar
            user={{
              id: session.user.id,
              name: session.user.name ?? "Unknown",
              email: session.user.email ?? "",
              image: session.user.image ?? "",
            }}
          />
          <main>
            <SidebarTrigger />
            <div className="py-5 px-10 bg-gray-100 h-full w-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  } catch (e) {}
}
