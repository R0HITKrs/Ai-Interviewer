"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {}, []);

  return (
    <div className="flex p-4 justify-between items-center bg-transparent shadow-md">
      <Image src={"/logo.png"} width={160} height={80} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-purple-700 font-bold"
          }`}
        >
          dashboard
        </li>
        <li
          className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/question" && "text-purple-800 font-bold"
          }`}
        >
          question
        </li>
        <li
          className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-purple-800 font-bold"
          }`}
        >
          upgrade
        </li>
        <li
          className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/work" && "text-purple-800 font-bold"
          }`}
        >
          How it work
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
