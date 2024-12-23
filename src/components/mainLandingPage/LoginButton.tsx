import Link from "next/link";
import "./LoginButton.css";

const LoginButton = () => {
  return (
    <Link href="/login" className="login-button">
        로그인
    </Link>
  );
};

export default LoginButton;