"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const router = useRouter();
  async function upload(e) {
    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      console.log(files[0]);
      const file = files[0];
      const res = await axios.postForm("/api/upload", {
        file,
      });
      console.log(res.data);
      router.push("/" + res.data.newName);
    }
  }
  return (
    <label htmlFor="video" className="cursor-pointer">
      <span className="px-4 py-2 bg-lime-600 rounded-full">Upload Video</span>
      <input
        onChange={upload}
        type="file"
        className="hidden"
        accept="video/*"
        id="video"
        name="video"
      />
    </label>
  );
};

export default UploadForm;
