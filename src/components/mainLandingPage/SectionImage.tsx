import React from "react";
import Image from "next/image";
import sectionImage1 from "../../../public/images/img1.png";
import sectionImage2 from "../../../public/images/img2.png";
import sectionImage3 from "../../../public/images/img3.png";
import sectionImage4 from "../../../public/images/img4.png";
import "./SectionImage.css"; // CSS 파일 import

const SectionImage = () => {
  return (
    <div className="section-container">
      {/* 첫 번째 섹션: "원하는 링크"에 그라디언트 적용 */}
      <section className="section group-1-3">
        <div className="section-text">
          <h2 className="section-heading">
            <span className="gradient-text-1">원하는 링크</span>를
            <p>저장하세요</p>
          </h2>
          <p className="section-description">
            나중에 읽고 싶은 글, 다시 보고 싶은 영상,
          </p>
          <p className="section-description">
            사고 싶은 옷, 기억하고 싶은 모든 것을
          </p>
          <p className="section-description">한 공간에 저장하세요</p>
        </div>
        <Image
          src={sectionImage1}
          alt="Section Image 1"
          className="section-image"
          width={550}
          height={450}
        />
      </section>

      {/* 두 번째 섹션: "관리"에 그라디언트 적용 */}
      <section className="section group-2-4">
        <Image
          src={sectionImage2}
          alt="Section Image 2"
          className="section-image"
          width={550}
          height={450}
        />
        <div className="section-text">
          <h2 className="section-heading">
            링크를 폴더로
            <p>
              <span className="gradient-text-2">관리</span>하세요
            </p>
          </h2>
          <p className="section-description">
            나만의 폴더를 무제한으로 만들고
          </p>
          <p className="section-description">다양하게 활용할 수 있습니다.</p>
        </div>
      </section>

      {/* 세 번째 섹션: "공유"에 그라디언트 적용 */}
      <section className="section group-1-3">
        <div className="section-text">
          <h2 className="section-heading">
            저장한 링크를
            <p>
              <span className="gradient-text-3">공유</span>해 보세요
            </p>
          </h2>
          <p className="section-description">
            여러 링크를 폴더에 담고 공유할 수 있습니다.
          </p>
          <p className="section-description">
            가족, 친구, 동료들에게 쉽고 빠르게 링크를
          </p>
          <p className="section-description">공유해 보세요.</p>
        </div>
        <Image
          src={sectionImage3}
          alt="Section Image 3"
          className="section-image"
          width={550}
          height={450}
        />
      </section>

      {/* 네 번째 섹션: "검색"에 그라디언트 적용 */}
      <section className="section group-2-4">
        <Image
          src={sectionImage4}
          alt="Section Image 4"
          className="section-image"
          width={550}
          height={450}
        />
        <div className="section-text">
          <h2 className="section-heading">
            저장한 링크를
            <p>
              <span className="gradient-text-4">검색</span>해 보세요
            </p>
          </h2>
          <p className="section-description">
            중요한 정보들을 검색으로 쉽게 찾아보세요.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SectionImage;