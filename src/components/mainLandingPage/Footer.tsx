import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#111322] flex flex-wrap justify-between items-center w-full mt-[120px] p-[32px] md:px-[104px] md:pb-[110px] lg:pb-[108px]">
      <div className="text-[#676767] whitespace-nowrap order-3 w-full mt-[60px] md:mt-0 md:order-1 md:w-auto">
        ©codeit - 2024
      </div>
      <div className="flex items-center gap-[30px] whitespace-nowrap order-1">
        <Link href="/privacy" className="text-[#cfcfcf] no-underline">
          Privacy Policy
        </Link>
        <Link href="/faq" className="text-[#cfcfcf] no-underline">
          FAQ
        </Link>
      </div>
      <div className="flex gap-[12px] lg:gap-[13px] order-2 md:order-3">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="페이스북"
        >
          <Image
            src="/icons/facebook.svg"
            width={20}
            height={20}
            alt="페이스북"
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
            width={20}
            height={20}
            alt="트위터"
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
            width={20}
            height={20}
            alt="유튜브"
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
            width={20}
            height={20}
            alt="인스타그램"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
