"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useContext } from "react";
import { MyContext } from "../context";

export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const { data, setData } = useContext(MyContext);

  const inputFile = useRef(null);

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    } finally {
      setData({"link": `https://gateway.pinata.cloud/ipfs/${cid}`});
      //router.push("/mintnft");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="h-screen w-screen gradient-bg-welcome p-2 flex flex-col items-center justify-center bg-gray-400">
      <div className="flex flex-col w-full justify-center items-center blue-glassmorphism">
        <label className="w-1/2 bg-blue-500 flex items-center justify-center rounded-md border-black border-2 m-2">
          Choose File
        </label>
        <input
          type="file"
          ref={inputFile}
          onChange={handleChange}
          className="w-1/3 bg-green-400 flex items-center justify-center rounded-lg m-2 text-black p-2"
        />
        <button
          onClick={() => uploadFile(file)}
          className="h-[50px] w-[200px] bg-green-600 rounded-full"
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
        {cid && (
          <p className="p-2 m-4 bg-[#ff4323]">
            IPFS Link: https://gateway.pinata.cloud/ipfs/{cid}
          </p>
        )}
      </div>
    </div>
  );
}
