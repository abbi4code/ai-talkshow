"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants/const";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useAudio } from "@/providers/AudioProvider";
import { Button } from "./ui/button";
const LeftSidebar = () => {
  const pathName = usePathname();
  console.log("pathname",pathName)
  const router = useRouter();
  const { signOut } = useClerk();
  const { audio } = useAudio();
  return (
    <div
      className={cn("left_sidebar h-[calc(100vh-5px)]", {
        "h-[calc(100vh-140px)]": audio?.audioUrl,
      })}
    >
      <nav className="flex flex-col gap-6 mb-10">
        <Link
          href="/"
          className="flex cursor-pointer items-center max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">
            WAVE
          </h1>
        </Link>
        {sidebarLinks.map(({ imgURL, label, route }) => {
          const isActive =
            pathName === route || pathName.startsWith(`${route}/`);
          console.log("pathname", pathName, route);
          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex gap-3 max-lg:px-4 py-10 items-center justify-center lg:justify-start",
                { "bg-nav-focus border-r-4 border-orange-1": isActive }
              )}
            >
              <Image src={imgURL} alt="label" width={24} height={24} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-16 w-full bg-orange-1 font-extrabold"
            onClick={() => signOut(() => router.push("/"))}
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </div>
  );
};

export default LeftSidebar;
