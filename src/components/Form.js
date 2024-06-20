"use client";
import Image from "next/image";
import { useState } from "react";
import BCCLIcon from "@/images/BG.svg";
import EditIcon from "@/images/edit.svg";
import UserIcon from "@/images/User.svg";
import SaveIcon from "@/images/save-icon.svg";
import Label from "./Label";
import UserCircleIcon from "@/images/UserCircle.svg";
import EnvelopeIcon from "@/images/Envelope.svg";
import IndiaIcon from "@/images/India.svg";
import BriefcaseIcon from "@/images/Briefcase.svg";
import CaretDownIcon from "@/images/CaretDown.svg";
import FileTextIcon from "@/images/FileText.svg";
import LinkIcon from "@/images/LinkSimple.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  setError,
  updateField,
} from "@/libs/store/features/formSlice";

// Sample data for states and cities
const stateCityData = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar"],
  Bihar: ["Patna", "Gaya", "Bhagalpur"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Haryana: ["Chandigarh", "Gurugram", "Faridabad"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Manipur: ["Imphal", "Churachandpur", "Thoubal"],
  Meghalaya: ["Shillong", "Tura", "Nongpoh"],
  Mizoram: ["Aizawl", "Lunglei", "Saiha"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  Sikkim: ["Gangtok", "Pelling", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala", "Dharmanagar", "Kailashahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Siliguri", "Asansol"],
};

const Form = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [isPersonalDetailsEditable, setIsPersonalDetailsEditable] =
    useState(false);
  const [isInstitutionDetailsEditable, setIsInstitutionDetailsEditable] =
    useState(false);

  const handleInputChange = (section, field, value) => {
    dispatch(updateField({ section, field, value }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formState.personalDetails).forEach((field) => {
      if (!formState.personalDetails[field]) {
        errors[field] = "This is required";
      }
    });
    Object.keys(formState.institutionDetails).forEach((field) => {
      if (!formState.institutionDetails[field]) {
        errors[field] = "This is required";
      }
    });
    return errors;
  };

  const handleSave = (section) => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((field) => {
        dispatch(setError({ field, error: errors[field] }));
      });
    } else {
      dispatch(clearErrors());
      if (section === "personal") {
        setIsPersonalDetailsEditable(false);
      } else if (section === "institution") {
        setIsInstitutionDetailsEditable(false);
      }
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    handleStateChange("institutionDetails", "state", state);
    handleInputChange("institutionDetails", "city", "");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    handleInputChange("institutionDetails", "city", city);
  };

  const renderInput = (section, field, placeholder, type = "text") => {
    const isEditable =
      section === "personalDetails"
        ? isPersonalDetailsEditable
        : isInstitutionDetailsEditable;
    const value = formState[section][field];
    const error = formState.errors[field];
    return (
      <div className="relative w-full mt-1.5">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(section, field, e.target.value)}
          className={`capitalize px-[22px] py-[12px] text-[13px] w-full border p-2 rounded-[15px] ${
            error ? "border-red-500" : "border-[#0A65CC]"
          }`}
          disabled={!isEditable}
        />
        {error && (
          <Image
            src={ExclamationIcon}
            width={16}
            height={16}
            className="absolute right-3 top-3"
            alt="exclamation icon"
          />
        )}
      </div>
    );
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <form>
      <div className="flex gap-6">
        <div className="relative flex items-center justify-center h-max w-1/4">
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
                className="flex items-center gap-3 bg-[#0A65CC] px-[17px] py-[13px] text-[16px] text-white font-bold rounded-[10px]"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12">
              <Label title={"first name"}>
                {renderInput("personalDetails", "firstName", "First Name")}
              </Label>

              <Label title={"last name"}>
                <input
                  type="text"
                  className="capitalize mt-1.5 px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"designation"}>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Designation"
                    className="capitalize pl-[40px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isPersonalDetailsEditable}
                  />
                  <Image
                    src={UserCircleIcon}
                    width={24}
                    height={24}
                    className="absolute left-2.5 top-2.5"
                    alt="user circle icon"
                  />
                </div>
              </Label>

              <Label title={"gender"}>
                <input
                  type="text"
                  placeholder="gender"
                  className="capitalize mt-1.5 px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isPersonalDetailsEditable}
                />
              </Label>

              <Label title={"gmail"}>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="gmail"
                    value="ABC@gmail.com"
                    className="capitalize mt-1.5 pl-[40px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isPersonalDetailsEditable}
                  />
                  <Image
                    src={EnvelopeIcon}
                    width={24}
                    height={24}
                    className="absolute left-2.5 top-2.5"
                    alt="envelope icon"
                  />
                </div>
              </Label>

              <Label title={"mobile no."}>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="moblie no."
                    value="8056*******"
                    className="capitalize mt-1.5 pl-[112px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isPersonalDetailsEditable}
                  />
                  <div className="absolute left-2.5 top-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={IndiaIcon}
                        width={24}
                        height={24}
                        alt="India icon"
                      />
                      <span className="text-[16px] font-normal ">+91</span>
                      <Image
                        src={CaretDownIcon}
                        width={24}
                        height={24}
                        alt="caret down icon"
                      />
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          </div>
          <div className="bg-white shadow-md rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="flex gap-4 text-[24px] text-[#0A65CC] font-bold">
                <Image
                  src={BriefcaseIcon}
                  width={24}
                  height={24}
                  alt="user icon"
                />{" "}
                Institution Details
              </h2>
              <button
                className="flex items-center gap-3 bg-[#0A65CC] px-[17px] py-[13px] text-[16px] text-white font-bold rounded-[10px]"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("form data", formState);

                  

                  setIsInstitutionDetailsEditable(
                    !isInstitutionDetailsEditable
                  );
                }}
              >
                {isInstitutionDetailsEditable ? "Save" : "Edit"}
                {isInstitutionDetailsEditable ? (
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

            <div className="w-11/12">
              <Label title={"About the institution"}>
                <textarea
                  placeholder="About the institution"
                  className="px-[22px] py-[12px] mt-1.5 h-[178px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px] w-full"
                  disabled={!isInstitutionDetailsEditable}
                ></textarea>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label title={"Institution name"}>
                  <input
                    type="text"
                    placeholder="Institution Name"
                    className="px-[22px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable}
                  />
                </Label>

                <Label title={"Institution Type"}>
                  <input
                    type="text"
                    placeholder="Institution Type"
                    className="px-[22px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable}
                  />
                </Label>
              </div>
              <Label title={"website"}>
                <div className="relative w-full">
                  <input
                    type="url"
                    placeholder="Website"
                    className="pl-[40px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable}
                  />
                  <Image
                    src={LinkIcon}
                    width={24}
                    height={24}
                    className="absolute left-2.5 top-2.5"
                    alt="envelope icon"
                  />
                </div>
              </Label>

              <Label title={"Address"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Address line 1"
                    className="px-[22px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable}
                  />
                  <input
                    type="text"
                    placeholder="Address line 2"
                    className="px-[22px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable}
                  />
                </div>
              </Label>
              <div className="flex items-center gap-6 mb-5 mt-3.5">
                <div className="grid w-full">
                  <Image
                    src={CaretDownIcon}
                    width={20}
                    height={20}
                    alt="down icon"
                    className="pointer-events-none z-10 right-3 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
                  />
                  <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="appearance-none row-start-1 col-start-1 px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {Object.keys(stateCityData).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid w-full">
                  <Image
                    src={CaretDownIcon}
                    width={20}
                    height={20}
                    alt="down icon"
                    className="pointer-events-none z-10 right-3 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
                  />
                  <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="appearance-none row-start-1 col-start-1 px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    disabled={!isInstitutionDetailsEditable || !selectedState}
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    {selectedState &&
                      stateCityData[selectedState].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Pincode"
                  className="px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                  disabled={!isInstitutionDetailsEditable}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label title={"No.of employees"}>
                  <input
                    type="text"
                    placeholder="No. of Employees"
                    className="px-[22px] py-[12px] mt-1.5 text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
                    value="10-15 employees"
                    disabled
                  />
                </Label>
                <div className="flex items-center gap-4 bg-[#F1F2F480] bg-opacity-50 rounded-[6px] p-[20px]">
                  <Image
                    src={FileTextIcon}
                    width={32}
                    height={32}
                    alt="file icon"
                  />
                  <div className="flex flex-col">
                    <span className="mr-2 text-[14px] text-[#18191C] font-medium">
                      Institution Document
                    </span>
                    <span className="mr-2 text-[14px] text-[#5E6670] font-normal">
                      3.5MB
                    </span>
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="ml-auto"
                  >
                    ...
                  </button>
                  {/* <button className="text-blue-500">Edit Docs</button>
                <button className="text-red-500 ml-4">Delete</button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-[#0A65CC] text-[16px] text-white font-semibold px-[32px] py-[16px] rounded-[15px]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
