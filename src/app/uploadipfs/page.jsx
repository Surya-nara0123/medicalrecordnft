// "use client"
// import { useState } from "react";

// function Page() {
//   const [selectedFile, setSelectedFile] = useState();
//   const [cid, setCid] = useState();
//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmission = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       const metadata = JSON.stringify({
//         name: "File name",
//       });
//       formData.append("pinataMetadata", metadata);

//       const options = JSON.stringify({
//         cidVersion: 0,
//       });
//       formData.append("pinataOptions", options);

//       const res = await fetch(
//         "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
//           },
//           body: formData,
//         }
//       );
//       const resData = await res.json();
//       setCid(resData.IpfsHash);
//       console.log(resData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
// <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-400">
//   <label className="w-1/2 bg-blue-500 flex items-center justify-center rounded-md border-black border-2 m-2"> Choose File</label>
//   <input type="file" onChange={changeHandler} className="w-1/3 bg-green-400 flex items-center justify-center rounded-lg m-2 text-black"/>
//   <button onClick={handleSubmission} className="h-[50px] w-[200px] bg-green-600 rounded-full">Submit</button>
//   {cid && <p>IPFS CID: {cid}</p>}
// </div>
//   );
// }

// export default Page;

"use client";

import { useState, useRef } from "react";

export default function Page() {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

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
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-400">
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
      {cid && <p>IPFS CID: {cid}</p>}
    </div>
    // <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
    //   <input type="file" id="file" ref={inputFile} onChange={handleChange} />
    //   <button disabled={uploading} onClick={() => inputFile.current.click()}>
    //     {uploading ? "Uploading..." : "Upload"}
    //   </button>
    // </main>
  );
}
