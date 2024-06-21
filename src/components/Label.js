import React from "react";



const Label = ({ title, children }) => (
  <label className="block w-full mt-4">
    <span className="capitalize text-[14px] font-normal text-[#18191C]">{title}</span>
    {children}
  </label>
);

export default Label;