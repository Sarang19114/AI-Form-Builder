"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
        <Link href="/">
        <div className="flex gap-4 items-center">
          <Image src={"/logo.png"} width={70} height={100} alt={"logo"} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            AI Form Builder
          </h1>
        </div>
        </Link>

        {/* Buttons Section */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-5">
                <Link href="/dashboard">
                <Button variant={"outline"}>Dashboard</Button>
                </Link>
              <UserButton />
            </div>
          ) : (
            <SignInButton>
            <Button className="bg-gradient-to-r from-blue-400 to-blue-600">
            Get Started
          </Button>
          </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
