"use client";
import Image from "next/image";
import { useState } from "react";
import BCCLIcon from "@/images/BG.svg";
import EditIcon from "@/images/edit.svg";
import UserIcon from "@/images/User.svg";
import SaveIcon from "@/images/save-icon.svg";
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
import Label from "./Label";
import InputField from "./InputField";

// Sample data for states and cities
const stateCityData = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  // Add other states and cities...
};

const Form = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [isPersonalDetailsEditable, setIsPersonalDetailsEditable] =
    useState(false);
  const [isInstitutionDetailsEditable, setIsInstitutionDetailsEditable] =
    useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
    setSelectedState(state);
    handleInputChange("institutionDetails", "state", state);
    handleInputChange("institutionDetails", "city", "");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    handleInputChange("institutionDetails", "city", city);
  };

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
                <Image src={UserIcon} width={24} height={24} alt="user icon" />
                Personal Details
              </h2>
              <button
                className="flex items-center gap-3 bg-[#0A65CC] px-[17px] py-[13px] text-[16px] text-white font-bold rounded-[10px]"
                onClick={(e) => {
                  e.preventDefault();
                  if (isPersonalDetailsEditable) {
                    handleSave("personal");
                  } else {
                    setIsPersonalDetailsEditable(true);
                  }
                }}
              >
                {isPersonalDetailsEditable ? "Save" : "Edit"}
                <Image
                  src={isPersonalDetailsEditable ? SaveIcon : EditIcon}
                  width={16}
                  height={16}
                  alt={isPersonalDetailsEditable ? "save icon" : "edit icon"}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12">
              <Label title="First Name">
                <InputField
                  placeholder="First Name"
                  value={formState.personalDetails.firstName}
                  onChange={(e) =>
                    handleInputChange("personalDetails", "firstName", e.target.value)
                  }
                  disabled={!isPersonalDetailsEditable}
                  error={formState.errors.firstName}
                />
              </Label>

              <Label title="Last Name">
                <InputField
                  placeholder="Last Name"
                  value={formState.personalDetails.lastName}
                  onChange={(e) =>
                    handleInputChange("personalDetails", "lastName", e.target.value)
                  }
                  disabled={!isPersonalDetailsEditable}
                  error={formState.errors.lastName}
                />
              </Label>

              <Label title="Designation">
                <InputField
                  placeholder="Designation"
                  value={formState.personalDetails.designation}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "designation",
                      e.target.value
                    )
                  }
                  disabled={!isPersonalDetailsEditable}
                  icon={UserCircleIcon}
                  error={formState.errors.designation}
                />
              </Label>

              <Label title="Gender">
                <InputField
                  placeholder="Gender"
                  value={formState.personalDetails.gender}
                  onChange={(e) =>
                    handleInputChange("personalDetails", "gender", e.target.value)
                  }
                  disabled={!isPersonalDetailsEditable}
                  error={formState.errors.gender}
                />
              </Label>

              <Label title="Email Address">
                <InputField
                  type="email"
                  placeholder="Email Address"
                  value={formState.personalDetails.email}
                  onChange={(e) =>
                    handleInputChange("personalDetails", "email", e.target.value)
                  }
                  disabled={!isPersonalDetailsEditable}
                  icon={EnvelopeIcon}
                  error={formState.errors.email}
                />
              </Label>

              <Label title="Nationality">
                <InputField
                  placeholder="Nationality"
                  value={formState.personalDetails.nationality}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "nationality",
                      e.target.value
                    )
                  }
                  disabled={!isPersonalDetailsEditable}
                  icon={IndiaIcon}
                  error={formState.errors.nationality}
                />
              </Label>
            </div>
          </div>

          <div className="bg-white shadow-md rounded p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="flex gap-4 text-[24px] text-[#0A65CC] font-bold">
                <Image
                  src={BriefcaseIcon}
                  width={24}
                  height={24}
                  alt="briefcase icon"
                />
                Institution Details
              </h2>
              <button
                className="flex items-center gap-3 bg-[#0A65CC] px-[17px] py-[13px] text-[16px] text-white font-bold rounded-[10px]"
                onClick={(e) => {
                  e.preventDefault();
                  if (isInstitutionDetailsEditable) {
                    handleSave("institution");
                  } else {
                    setIsInstitutionDetailsEditable(true);
                  }
                }}
              >
                {isInstitutionDetailsEditable ? "Save" : "Edit"}
                <Image
                  src={isInstitutionDetailsEditable ? SaveIcon : EditIcon}
                  width={16}
                  height={16}
                  alt={isInstitutionDetailsEditable ? "save icon" : "edit icon"}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12">
              <Label title="Institution Name">
                <InputField
                  placeholder="Institution Name"
                  value={formState.institutionDetails.name}
                  onChange={(e) =>
                    handleInputChange("institutionDetails", "name", e.target.value)
                  }
                  disabled={!isInstitutionDetailsEditable}
                  icon={FileTextIcon}
                  error={formState.errors.name}
                />
              </Label>

              <Label title="Website Link">
                <InputField
                  placeholder="Website Link"
                  value={formState.institutionDetails.website}
                  onChange={(e) =>
                    handleInputChange("institutionDetails", "website", e.target.value)
                  }
                  disabled={!isInstitutionDetailsEditable}
                  icon={LinkIcon}
                  error={formState.errors.website}
                />
              </Label>

              <Label title="State">
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={handleStateChange}
                    disabled={!isInstitutionDetailsEditable}
                    className="capitalize px-[22px] py-[12px] text-[13px] w-full border p-2 rounded-[15px] border-[#0A65CC] appearance-none"
                  >
                    <option value="">Select State</option>
                    {Object.keys(stateCityData).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <Image
                    src={CaretDownIcon}
                    width={24}
                    height={24}
                    className="absolute right-3 top-3 pointer-events-none"
                    alt="caret down icon"
                  />
                </div>
              </Label>

              <Label title="City">
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!isInstitutionDetailsEditable}
                    className="capitalize px-[22px] py-[12px] text-[13px] w-full border p-2 rounded-[15px] border-[#0A65CC] appearance-none"
                  >
                    <option value="">Select City</option>
                    {stateCityData[selectedState]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <Image
                    src={CaretDownIcon}
                    width={24}
                    height={24}
                    className="absolute right-3 top-3 pointer-events-none"
                    alt="caret down icon"
                  />
                </div>
              </Label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
