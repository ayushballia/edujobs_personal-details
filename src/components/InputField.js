import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
  disabled,
}) => {
  return (
    <div className="relative w-full mt-1.5">
      {icon && (
        <Image
          src={icon}
          width={24}
          height={24}
          className="absolute left-2.5 top-2.5"
          alt={`${placeholder} icon`}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`capitalize px-[22px] py-[12px] text-[13px] w-full border p-2 rounded-[15px] ${
          error ? "border-red-500" : "border-[#E4E5E8]"
        } ${icon ? "pl-[40px]" : ""}`}
        disabled={disabled}
      />
      {error && (
        <FontAwesomeIcon
        color="red"
        icon={faExclamationCircle}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      />
      )}
    </div>
  );
};

export default InputField;
