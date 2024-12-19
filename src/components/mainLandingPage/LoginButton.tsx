import Link from "next/link";
import styles from "./LoginButton.module.css";

const LoginButton = () => {
  return (
    <Link href="/login" className={styles["login-button"]}>
      로그인
    </Link>
  );
};

export default LoginButton;