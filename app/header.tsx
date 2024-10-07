"use client";

import { useState, useEffect, useRef } from "react"; // Import useRef and useEffect
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon, Menu } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data you have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"} className="flex items-center">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{session.data?.user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2 h-4 w-4" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <DeleteIcon className="mr-2 h-4 w-4" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg py-2 dark:bg-gray-900/30 dark:border-white/10 dark:backdrop-blur-lg z-10 relative flex-shrink-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex gap-2 items-center text-xl hover:underline"
          >
            <Image
              src="/icon.png"
              width="40"
              height="40"
              alt="the application icon of a magnifying glass"
              className="rounded-lg"
            />
            <span className="hidden sm:inline">DevMate</span>
          </Link>

          <nav className="hidden md:flex gap-4 lg:gap-8 items-center">
            {isLoggedIn && (
              <>
                <Link className="hover:underline" href="/browse">
                  Browse
                </Link>
                <Link className="hover:underline" href="/your-rooms">
                  Your Rooms
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {isLoggedIn && <AccountDropdown />}
            {!isLoggedIn && (
              <Button onClick={() => signIn()} variant="link" className="hidden md:flex">
                <LogInIcon className="mr-2 h-4 w-4" /> Sign In
              </Button>
            )}
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/browse">Browse</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/your-rooms">Your Rooms</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {!isLoggedIn && (
                  <DropdownMenuItem onClick={() => signIn()}>
                    <LogInIcon className="mr-2 h-4 w-4" /> Sign In
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
