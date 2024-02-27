import { NextResponse, NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const POST = async (request) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
        },
        body: data,
    });
    const { IpfsHash } = await res.json();
    console.log(IpfsHash);

    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
