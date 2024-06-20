import React from "react";

const Label = ({ title, children }) => (
  <div className="w-full">
    <label className="capitalize text-[14px] leading-[20px] font-normal text-[#18191C]">{title}</label>
    <div className="flex space-x-6 mt-2 mb-5 w-full">{children}</div>
    
  </div>
);

export default Label;