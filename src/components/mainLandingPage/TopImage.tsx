import React from "react";
import Image from "next/image";
import imageAtTop from "../../../public/images/image25.png";
import AddLinkButton from "./AddLinkButton";
import styles from "./TopImage.module.css";

const TopImage = () => {
  return (
    <section className={styles["top-image-section"]}>
      <div className={styles["text-content"]}>
        <h1 className={styles.title}>
          <span className={styles["gradient-text"]}>세상의 모든 정보</span>를
          <p className={styles.description}>쉽게 저장하고 관리해 보세요</p>
        </h1>
        <AddLinkButton />
      </div>
      <div className={styles["image-content"]}>
        <Image
          src={imageAtTop}
          alt="Top Image"
          layout="responsive"
          width={800}
          height={500}
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default TopImage;