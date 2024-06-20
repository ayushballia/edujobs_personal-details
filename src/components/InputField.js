import Image from "next/image";

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
          error ? "border-red-500" : "border-[#0A65CC]"
        } ${icon ? "pl-[40px]" : ""}`}
        disabled={disabled}
      />
      {error && (
        <Image
          src={"/path/to/exclamation-icon.svg"}
          width={16}
          height={16}
          className="absolute right-3 top-3"
          alt="exclamation icon"
        />
      )}
    </div>
  );
};

export default InputField;
