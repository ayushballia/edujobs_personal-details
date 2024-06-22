"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  setError,
  updateField,
} from "@/libs/store/features/formSlice";
import BCCLIcon from "@/images/BG.svg";
import EditIcon from "@/images/edit.svg";
import UserIcon from "@/images/User.svg";
import SaveIcon from "@/images/save-icon.svg";
import UserCircleIcon from "@/images/UserCircle.svg";
import EnvelopeIcon from "@/images/Envelope.svg";
import IndiaIcon from "@/images/India.svg";
import BriefcaseIcon from "@/images/Briefcase.svg";
import LinkIcon from "@/images/LinkSimple.svg";
import UploadCloud from "@/images/Upload-cloud.svg";
import X from "@/images/X.svg";
import Label from "./Label";
import InputField from "./InputField";
import Modal from "./Modal";

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

  const [uploadedImageName, setUploadedImageName] = useState("");
  const [temporaryImage, setTemporaryImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemporaryImage(reader.result);
        setUploadedImageName(file.name);
        setShowFileInput(true); // Show the modal to crop the image after uploading
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditButtonClick = (e) => {
    e.preventDefault();
    setShowFileInput(true);
  };

  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
    setTemporaryImage(null); // Clear the temporary image
    setShowFileInput(false); // Close the modal
  };

  const handleInputChange = (section, field, value) => {
    dispatch(updateField({ section, field, value }));
  };

  const validateForm = (section) => {
    const errors = {};
    const fields = formState[section];
    Object.keys(fields).forEach((field) => {
      if (!fields[field]) {
        errors[field] = "This is required";
      }
    });
    return errors;
  };

  const handleSave = (section) => {
    console.log(`Saving ${section}`);
    const errors = validateForm(section);
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((field) => {
        dispatch(setError({ field, error: errors[field] }));
      });
      console.log("Errors:", errors);
    } else {
      dispatch(clearErrors());
      if (section === "personalDetails") {
        setIsPersonalDetailsEditable(false);
      } else if (section === "institutionDetails") {
        setIsInstitutionDetailsEditable(false);
      }
      console.log("Save successful");
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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setTemporaryImage(imageUrl);
    setUploadedImageName(file.name);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-center gap-6 relative">
        <div className="relative flex items-center justify-center h-max w-1/4">
          <Image
            src={croppedImage || BCCLIcon}
            width={240}
            height={240}
            alt="bccl icon"
            className="max-w-[240px] max-h-[240px] rounded-full"
          />
          <button
            className="absolute bottom-0 right-0 bg-[#0A65CC] border rounded-[10px] px-[9px] py-[6px]"
            onClick={handleEditButtonClick}
          >
            <Image src={EditIcon} width={24} height={24} alt="edit icon" />
          </button>
        </div>

        <Modal
        show={showFileInput}
        onClose={() => setShowFileInput(false)}
        onUpload={handleImageUpload}
        imageName={uploadedImageName}
        temporaryImage={temporaryImage}
        onCropComplete={handleCropComplete}
      />

        <div className="w-3/4 p-4">
          {/* Personal Details Section */}
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
                    handleSave("personalDetails");
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
                    handleInputChange(
                      "personalDetails",
                      "firstName",
                      e.target.value
                    )
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
                    handleInputChange(
                      "personalDetails",
                      "lastName",
                      e.target.value
                    )
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
                    handleInputChange(
                      "personalDetails",
                      "gender",
                      e.target.value
                    )
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
                    handleInputChange(
                      "personalDetails",
                      "email",
                      e.target.value
                    )
                  }
                  disabled={!isPersonalDetailsEditable}
                  icon={EnvelopeIcon}
                  error={formState.errors.email}
                />
              </Label>

              <Label title="mobile">
                <InputField
                  type="tel"
                  placeholder="mobile"
                  value={formState.personalDetails.mobile}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "mobile",
                      e.target.value
                    )
                  }
                  disabled={!isPersonalDetailsEditable}
                  icon={IndiaIcon}
                  error={formState.errors.mobile}
                />
              </Label>
            </div>
          </div>

          {/* Institution Details Section */}
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
                    handleSave("institutionDetails");
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
            <div className="w-11/12">
              <Label title={"About the institution"}>
                <textarea
                  placeholder="About the institution"
                  className="px-[22px] py-[12px] mt-1.5 h-[178px] text-[13px] w-full border border-[#E4E5E8] p-2 rounded-[15px] w-full"
                  value={formState.institutionDetails.about}
                  onChange={(e) =>
                    handleInputChange(
                      "institutionDetails",
                      "about",
                      e.target.value
                    )
                  }
                  disabled={!isInstitutionDetailsEditable}
                  error={formState.errors.about}
                ></textarea>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label title="Institution Name">
                  <InputField
                    placeholder="Institution Name"
                    value={formState.institutionDetails.name}
                    onChange={(e) =>
                      handleInputChange(
                        "institutionDetails",
                        "name",
                        e.target.value
                      )
                    }
                    disabled={!isInstitutionDetailsEditable}
                    error={formState.errors.name}
                  />
                </Label>

                <Label title="institution type">
                  <InputField
                    placeholder="Department Name"
                    value={formState.institutionDetails.type}
                    onChange={(e) =>
                      handleInputChange(
                        "institutionDetails",
                        "type",
                        e.target.value
                      )
                    }
                    disabled={!isInstitutionDetailsEditable}
                    error={formState.errors.type}
                  />
                </Label>
              </div>
              <Label title={"website"}>
                <InputField
                  placeholder="website"
                  value={formState.institutionDetails.website}
                  onChange={(e) =>
                    handleInputChange(
                      "institutionDetails",
                      "website",
                      e.target.value
                    )
                  }
                  disabled={!isInstitutionDetailsEditable}
                  icon={LinkIcon}
                  error={formState.errors.website}
                />
              </Label>
              <Label title={"Address"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    placeholder="address1"
                    value={formState.institutionDetails.address1}
                    onChange={(e) =>
                      handleInputChange(
                        "institutionDetails",
                        "address1",
                        e.target.value
                      )
                    }
                    disabled={!isInstitutionDetailsEditable}
                    error={formState.errors.address1}
                  />
                  <InputField
                    placeholder="address2"
                    value={formState.institutionDetails.address2}
                    onChange={(e) =>
                      handleInputChange(
                        "institutionDetails",
                        "address2",
                        e.target.value
                      )
                    }
                    disabled={!isInstitutionDetailsEditable}
                    error={formState.errors.address2}
                  />
                </div>
              </Label>
              <div className="flex items-center gap-4">
                <Label title="State">
                  <select
                    className="block w-full px-[22px] py-[12px] border rounded-[15px]"
                    value={selectedState}
                    onChange={handleStateChange}
                    disabled={!isInstitutionDetailsEditable}
                    error={formState.errors.state}
                  >
                    <option value="">Select State</option>
                    {Object.keys(stateCityData).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </Label>

                <Label title="City">
                  <select
                    className="block w-full px-[22px] py-[12px] border rounded-[15px]"
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!isInstitutionDetailsEditable}
                  >
                    <option value="">Select City</option>
                    {selectedState &&
                      stateCityData[selectedState].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </Label>
                <Label title="pincode">
                  <InputField
                    placeholder="pincode"
                    value={formState.institutionDetails.pincode}
                    onChange={(e) =>
                      handleInputChange(
                        "institutionDetails",
                        "pincode",
                        e.target.value
                      )
                    }
                    disabled={!isInstitutionDetailsEditable}
                    error={formState.errors.pincode}
                  />
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
