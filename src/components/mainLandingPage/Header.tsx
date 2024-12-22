import Logo from "./Logo";
import LoginButton from "./LoginButton";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="login-buttonH">
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;