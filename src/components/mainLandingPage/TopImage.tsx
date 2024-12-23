import React from "react";
import Image from "next/image"; // next/image 사용
import imageAtTop from "../../../public/images/image25.png"; // 이미지 경로 수정
import "./TopImage.css"; // CSS 파일 import

const TopImage = () => {
  return (
    <section className="top-image-section">
      {/* 배경이 포함된 상단 이미지 섹션 */}
      <div className="text-content">
        <h1 className="title">
          <span className="gradient-text">세상의 모든 정보</span>를
            <p className="description">
              쉽게 저장하고 관리해 보세요
            </p>
        </h1>

        <button className="add-link-button">링크 추가하기</button>
      </div>

      {/* 이미지 배치: 화면 하단에 배치 */}
      <div className="image-content">
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