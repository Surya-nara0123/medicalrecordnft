"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen gradient-bg-welcome p-2">
      <div className="flex justify-center items-center h-1/3 white-glassmorphism">
        <h1 className="text-5xl text-white font-bold">Welcome to The NFT Explorer</h1>
      </div>
      <div className="flex items-center justify-center blue-glassmorphism p-3 mt-10">
        <div className="flex justify-center items-center h-1/3 white-glassmorphism m-3 p-3 hover:bg-[#ff4312] cursor-pointer" onClick={() => { }}>
          <h1 className="text-3xl text-white font-bold">Explore the NFTs</h1>
        </div>
        <div className="flex justify-center items-center h-1/3 white-glassmorphism m-3 p-3 hover:bg-[#ff4312] cursor-pointer" onClick={() => { router.push("/uploadipfs") }}>
          <h1 className="text-3xl text-white font-bold">Create your own NFTs</h1>
        </div>
      </div>
    </div>
  );
}
