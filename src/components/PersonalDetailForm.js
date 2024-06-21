"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import BCCLIcon from "@/images/BG.svg";
import EditIcon from "@/images/edit.svg";

const PersonalDetailForm = () => {
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [temporaryImage, setTemporaryImage] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemporaryImage(reader.result);
        setUploadedImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
    setShowFileInput(false);
  };

  const handleEditButtonClick = (e) => {
    e.preventDefault();
    setShowFileInput(true);
  };

  return (
    <form className="relative flex gap-6">
      <div className="w-1/4 relative">
        <Image
          src={temporaryImage || BCCLIcon}
          width={240}
          height={240}
          alt="bccl icon"
          className="w-full rounded-full"
        />
        <button
          className="absolute bottom-0 right-0 bg-[#0A65CC] border rounded-[10px] px-[9px] py-[6px]"
          onClick={handleEditButtonClick}
        >
          <Image src={EditIcon} width={24} height={24} alt="edit icon" />
        </button>
      </div>
      <div className="w-3/4"></div>
      <Modal
        show={showFileInput}
        onClose={() => setShowFileInput(false)}
        onUpload={handleImageUpload}
        imageName={uploadedImageName}
        temporaryImage={temporaryImage}
      />
    </form>
  );
};

export default PersonalDetailForm;
