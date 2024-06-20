import Image from "next/image";

const SelectInput = ({ value, onChange, options, placeholder, disabled }) => (
  <div className="relative w-full">
    <Image
      src={"/path/to/caret-down-icon.svg"} 
      width={20}
      height={20}
      alt="down icon"
      className="pointer-events-none z-10 right-3 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
    />
    <select
      value={value}
      onChange={onChange}
      className="appearance-none row-start-1 col-start-1 px-[22px] py-[12px] text-[13px] w-full border border-[#0A65CC] p-2 rounded-[15px]"
      disabled={disabled}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
