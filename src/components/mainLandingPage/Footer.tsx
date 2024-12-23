import Link from "next/link";
import Image from "next/image";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright">©codeit - 2024</div>
      <div className="footerMenu">
        <Link href="/privacy">
          Privacy Policy
        </Link>
        <Link href="/faq">
           FAQ
        </Link>
      </div>
      <div className="socialMedia">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="페이스북"
        >
          <Image
            src="/icons/social/facebook-logo.svg"
            alt="페이스북"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="트위터"
        >
          <Image
            src="/icons/social/twitter-logo.svg"
            alt="트위터"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="유튜브"
        >
          <Image
            src="/icons/social/youtube-logo.svg"
            alt="유튜브"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램"
        >
          <Image
            src="/icons/social/instagram-logo.svg"
            alt="인스타그램"
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;