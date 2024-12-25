import React from "react";
import Image from "next/image";
import sectionImage1 from "../../../public/images/img1.png";
import sectionImage2 from "../../../public/images/img2.png";
import sectionImage3 from "../../../public/images/img3.png";
import sectionImage4 from "../../../public/images/img4.png";
import styles from "./SectionImage.module.css";

const SectionImage = () => {
  return (
    <div className={styles["section-container"]}>
      {/* 첫 번째 섹션 */}
      <section className={`${styles.section} ${styles["group-1-3"]}`}>
        <div className={styles["section-text"]}>
          <h2 className={styles["section-heading"]}>
            <span className={styles["gradient-text-1"]}>원하는 링크</span>를
            <p>저장하세요</p>
          </h2>
          <p className={styles["section-description"]}>
            나중에 읽고 싶은 글, 다시 보고 싶은 영상,
          </p>
          <p className={styles["section-description"]}>
            사고 싶은 옷, 기억하고 싶은 모든 것을
          </p>
          <p className={styles["section-description"]}>한 공간에 저장하세요</p>
        </div>
        <Image
          src={sectionImage1}
          alt="Section Image 1"
          className={styles["section-image"]}
          width={550}
          height={450}
        />
      </section>

      {/* 두 번째 섹션 */}
      <section className={`${styles.section} ${styles["group-2-4"]}`}>
        <Image
          src={sectionImage2}
          alt="Section Image 2"
          className={styles["section-image"]}
          width={550}
          height={450}
        />
        <div className={styles["section-text"]}>
          <h2 className={styles["section-heading"]}>
            링크를 폴더로
            <p>
              <span className={styles["gradient-text-2"]}>관리</span>하세요
            </p>
          </h2>
          <p className={styles["section-description"]}>
            나만의 폴더를 무제한으로 만들고
          </p>
          <p className={styles["section-description"]}>
            다양하게 활용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 세 번째 섹션 */}
      <section className={`${styles.section} ${styles["group-1-3"]}`}>
        <div className={styles["section-text"]}>
          <h2 className={styles["section-heading"]}>
            저장한 링크를
            <p>
              <span className={styles["gradient-text-3"]}>공유</span>해 보세요
            </p>
          </h2>
          <p className={styles["section-description"]}>
            여러 링크를 폴더에 담고 공유할 수 있습니다.
          </p>
          <p className={styles["section-description"]}>
            가족, 친구, 동료들에게 쉽고 빠르게 링크를
          </p>
          <p className={styles["section-description"]}>공유해 보세요.</p>
        </div>
        <Image
          src={sectionImage3}
          alt="Section Image 3"
          className={styles["section-image"]}
          width={550}
          height={450}
        />
      </section>

      {/* 네 번째 섹션 */}
      <section className={`${styles.section} ${styles["group-2-4"]}`}>
        <Image
          src={sectionImage4}
          alt="Section Image 4"
          className={styles["section-image"]}
          width={550}
          height={450}
        />
        <div className={styles["section-text"]}>
          <h2 className={styles["section-heading"]}>
            저장한 링크를
            <p>
              <span className={styles["gradient-text-4"]}>검색</span>해 보세요
            </p>
          </h2>
          <p className={styles["section-description"]}>
            중요한 정보들을 검색으로 쉽게 찾아보세요.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SectionImage;