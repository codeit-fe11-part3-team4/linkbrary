import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>©codeit - 2024</div>
      <div className={styles["footer-menu"]}>
        <Link href="/privacy" className={styles.link}>
          Privacy Policy
        </Link>
        <Link href="/faq" className={styles.link}>
          FAQ
        </Link>
      </div>
      <div className={styles["social-media"]}>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="페이스북"
        >
          <Image
            src="/icons/facebook.svg"
            alt="페이스북"
            width={20}
            height={20}
            className={styles["social-icon"]}
          />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="트위터"
        >
          <Image
            src="/icons/twitter.svg"
            alt="트위터"
            width={20}
            height={20}
            className={styles["social-icon"]}
          />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="유튜브"
        >
          <Image
            src="/icons/youtube.svg"
            alt="유튜브"
            width={20}
            height={20}
            className={styles["social-icon"]}
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램"
        >
          <Image
            src="/icons/instagram.svg"
            alt="인스타그램"
            width={20}
            height={20}
            className={styles["social-icon"]}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;