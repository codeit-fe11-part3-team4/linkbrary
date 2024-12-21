import Link from "next/link";
import Image from "next/image";
import "./Logo.css";

const Logo = () => {
  return (
    <Link href="/" className="logo">
      <Image 
        src="/icons/logo.svg" 
        alt="Linkbrary Logo" 
        width={150} 
        height={40} 
        className="logo-image"
      />
    </Link>
  );
};

export default Logo;