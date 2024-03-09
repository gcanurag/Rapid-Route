import React from "react";

const Button = ({
  children,
  textColor="text-white",
  bgColor = "bg-black",
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <>
      <button className={`px-3 py-2  rounded-lg ${bgColor} ${textColor} `}{...props}>{children}</button>
    </>
  );
};

export default Button;
