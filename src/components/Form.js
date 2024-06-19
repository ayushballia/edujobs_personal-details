"use client";
import Image from "next/image";
import { useState } from "react";
import BCCLIcon from "@/images/BG.svg";
import EditIcon from "@/images/edit.svg";
import UserIcon from "@/images/User.svg";
import SaveIcon from "@/images/save-icon.svg";
import Label from "./Label";

const Form = () => {
  const [isPersonalDetailsEditable, setIsPersonalDetailsEditable] =
    useState(false);
  const [isInstitutionDetailsEditable, setIsInstitutionDetailsEditable] =
    useState(false);

  return (
    <form>
      <div className="flex gap-6">
        <div className="relative flex items-center justify-center  h-max w-1/4">
          <Image
            src={BCCLIcon}
            width={240}
            height={240}
            alt="bccl icon"
            className="w-full"
          />
          <button className="absolute bottom-0 right-0 bg-[#0A65CC] border rounded-[10px] px-[9px] py-[6px]">
            <Image src={EditIcon} width={24} height={24} alt="edit icon" />
          </button>
        </div>

        <div className="w-3/4 p-4">
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="flex gap-4 text-[24px] text-[#0A65CC] font-bold">
                <Image src={UserIcon} width={24} height={24} alt="user icon" />{" "}
                Personal Details
              </h2>
              <button
                className="flex items-center gap-3 bg-[#0A65CC] px-[17px] py-[13px] text-[16px] text-white font-bold rounded-[10px] "
                onClick={(e) => {
                  e.preventDefault();
                  setIsPersonalDetailsEditable(!isPersonalDetailsEditable);
                }}
              >
                {isPersonalDetailsEditable ? "Save" : "Edit"}
                {isPersonalDetailsEditable ? (
                  <Image
                    src={SaveIcon}
                    width={16}
                    height={16}
                    alt="save icon"
                  />
                ) : (
                  <Image
                    src={EditIcon}
                    width={16}
                    height={16}
                    alt="edit icon"
                  />
                )}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Label title={"first name"}>
                <input
                  type="text"
                  className="capitalize px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"last name"}>
                <input
                  type="text"
                  className="capitalize px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"designation"}>
                
                <input
                  type="text"
                  placeholder="Designation"
                  className="capitalize px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"gender"}>
                <input
                  type="text"
                  placeholder="gender"
                  className="capitalize px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"gmail"}>
                <input
                  type="text"
                  placeholder="gmail"
                  value="ABC@gmail.com"
                  className="capitalize px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"mobile no."}>
                <input
                  type="text"
                  placeholder="moblie no."
                  value="+91 8056*******"
                  className="capitalize px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>
            </div>
          </div>
          <div className="bg-white shadow-md rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Institution Details</h2>
              <button
                className="text-blue-500"
                onClick={() =>
                  setIsInstitutionDetailsEditable(!isInstitutionDetailsEditable)
                }
              >
                {isInstitutionDetailsEditable ? "Save" : "Edit"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                placeholder="About the institution"
                className="border p-2 rounded col-span-2"
                disabled={!isInstitutionDetailsEditable}
              ></textarea>
              <input
                type="text"
                placeholder="Institution Name"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="Institution Type"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="url"
                placeholder="Website"
                className="border p-2 rounded col-span-2"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="Address line 1"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="Address line 2"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="Pincode"
                className="border p-2 rounded"
                disabled={!isInstitutionDetailsEditable}
              />
              <input
                type="text"
                placeholder="No. of Employees"
                className="border p-2 rounded"
                value="10-15 employees"
                disabled
              />
              <div className="flex items-center col-span-2">
                <span className="mr-2">Institution Document</span>
                <button className="text-blue-500">Edit Docs</button>
                <button className="text-red-500 ml-4">Delete</button>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
