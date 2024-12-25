import Logo from "./Logo";
import LoginButton from "./LoginButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles["login-button"]}>
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;