import {
  BarChart,
  Calendar,
  ChartBar,
  Home,
  Inbox,
  LinkIcon,
  QrCode,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Links",
    url: "/dashboard/my-urls",
    icon: LinkIcon,
  },
  {
    title: "QR Codes",
    url: "/dashboard/qr-codes",
    icon: QrCode,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-2xl text-orange-500 italic underline font-bold ml-2">
        D
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button className="bg-[#022d94] flex items-center justify-center  text-white rounded-none my-2 py-5">
            <p className="py-2">Create New</p>
          </Button>
          <DropdownMenuSeparator className="mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1 ">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
