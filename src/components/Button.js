
import Image from "next/image";

const Button = ({ onClick, children, className, icon, alt }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
      {icon && <Image src={icon} width={16} height={16} alt={alt} />}
    </button>
  );
};

export default Button;
