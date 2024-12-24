"use client";

// import CardList from "@/components/favorite/CardList";
import { useAuth } from "@/utils/AuthContext";

export default function Favorite() {
  const { accessToken } = useAuth();

  return (
    <div>
      <div className="w-full bg-[#F0F6FF] pb-[60px]">
        <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
      </div>
      {accessToken ? (
        <div>
          {/* <CardList isFavorite={false} /> */}
        </div>
      ) : (
        <div className="text-center mt-8 text-lg font-medium">
          로그인이 필요합니다. 로그인 후 즐겨찾기를 확인해주세요.
        </div>
      )}
      
    </div>
  );
}
