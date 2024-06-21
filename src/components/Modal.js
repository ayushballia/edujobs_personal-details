"use client";
import Image from "next/image";
import UploadCloud from "@/images/Upload-cloud.svg";

const Modal = ({ show, onClose, onUpload, imageName, temporaryImage }) => {
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    show && (
      <div className="absolute w-full h-full bg-gray-700 bg-opacity-75 flex z-10 justify-center translate-x-50">
        <div className="relative bg-white p-4 rounded-[12px] shadow-md w-[536px] h-[316px] m-auto">
          <label className="block text-[14px] font-normal text-[#18191C]">
            Upload Logo
          </label>
          <button
            className="absolute top-0 right-0 -m-5 text-[16px] font-semibold px-[12px] py-[8px] bg-[#E7F0FA] text-[#0A65CC] rounded-[50%]"
            onClick={onClose}
          >
            X
          </button>
          <div className="border-2 border-dashed rounded-[12px]" onClick={triggerFileInput}>
            <div className="flex flex-col items-center justify-center bg-[#F1F2F466] bg-opacity-40">
              {temporaryImage ? (
                <Image
                  src={temporaryImage}
                  width={48}
                  height={48}
                  alt="uploaded logo preview"
                />
              ) : (
                <Image
                  src={UploadCloud}
                  width={48}
                  height={48}
                  alt="upload cloud"
                />
              )}
              <p className="text-[14px font-medium">{imageName || "Browse Logo or drop here"}</p>
              <p className="text-[12px] text-[#5E6670] font-normal">
                Only JPG, PNG format available. Max file size 12 MB.
              </p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="mt-2 h-full hidden"
                onChange={onUpload}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-[16px] font-semibold mt-4 px-[24px] py-[12px] bg-[#E7F0FA] text-[#0A65CC] rounded-[3px]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="text-[16px] font-semibold mt-4 px-[24px] py-[12px] bg-[#0A65CC] text-white rounded-[3px]"
              onClick={() => {
                onClose();
              }}
            >
              Add Logo
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
