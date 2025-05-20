import React from "react";
import ButtonSvg from "../../public/assets/svg/ButtonSvg";
const Button = ({ className, href, onClick, children, px, white, disabled }) => {
  const classes = `button relative inline-flex items-center justify-center 
  h-11  hover:text-color-1 
  ${px || "px-7"} 
  ${white ? "text-n-8" : "text-n-1" }
  ${className || ""} `
  const spanClass = "relative z-10"
  const renderButton = () => (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <span className={spanClass}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () =>(
    <a className={classes} href={href} >
      <span className={spanClass}>{children}</span>
      {ButtonSvg(white)}
    </a>
  )

  return href ? renderLink() : renderButton()
};

export default Button;
