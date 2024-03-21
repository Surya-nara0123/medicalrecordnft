"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context";

const Page = () => {
  const { data, setData } = useContext(MyContext);
  const router = useRouter();
  return (
    <div className="h-screen w-screen gradient-bg-welcome p-2 flex flex-col items-center justify-center bg-gray-400">
      <div className="flex flex-col w-2/3 h-2/3 items-center blue-glassmorphism p-3">
        <div className="flex flex-col justify-center items-center white-glassmorphism p-4 hover:bg-[#ffabcd] cursor-pointer">
          {data && <span className="text-white text-2xl">{data["link"]}</span>}
        </div>
      </div>
    </div>
  );
};

export default Page;
