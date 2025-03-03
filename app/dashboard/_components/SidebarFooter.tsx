import React from "react";

import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

export const SidebarFooter = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <footer className="max-lg:p-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-11 px-2"
          >
            <div className="flex gap-2 items-center">
              <div className="rounded-md w-7 h-7 relative overflow-hidden">
                {user?.imageUrl && (
                  <Image src={user.imageUrl} alt="User Account Logo" fill />
                )}
              </div>

              <p className="text-sm font-semibold text-gray-700 max-w-[140px] truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <ChevronsUpDown className="w-4 h-4 text-gray-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 bottom-5" side="right" align="end">
          <div className="flex flex-col">
            <Button variant={"ghost"} className="h-12 justify-between">
              Manage Account
              <User className="h-4 w-4 text-gray-700" />
            </Button>

            <Button
              variant={"ghost"}
              onClick={() => signOut()}
              className="h-12 justify-between"
            >
              Logout
              <LogOut className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </footer>
  );
};
