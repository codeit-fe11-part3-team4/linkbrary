import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src="/icons/logo.svg"
        alt="Linkbrary Logo"
        width={150}
        height={40}
        className={styles["logo-image"]}
      />
    </Link>
  );
};

export default Logo;