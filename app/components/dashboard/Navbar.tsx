import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowDown } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

function Navbar({
  user,
}: {
  user: { id: string; name: string; email: string; image: string };
}) {
  return (
    <div className="flex justify-end items-center p-4 shadow-md h-16">
      <div className="flex items-center mr-4">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer px-2 py-4 flex justify-center items-center">
          {user.name}
          <ArrowDown className="w-3 h-3 ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-[1px] border-gray-100 py-2 bg-white">
          <DropdownMenuLabel className="flex items-center">
            <div>
              <Image
                src={user.image}
                height={30}
                width={30}
                alt={user.name}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-semibold ml-2">{user.name}</p>
              <p className="text-xs text-gray-500 ml-2">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut();
              toast.success("Signed out successfully");
            }}
            className="cursor-pointer mt-5 hover:outline-0 pl-2"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Navbar;
