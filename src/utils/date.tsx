import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from "date-fns";

export const formatUpdatedAt = (dateString: Date) => {
  const date = new Date(dateString); // 입력된 날짜 문자열을 Date 객체로 변환
  const now = new Date(); // 현재 기준 Date 객체 생성

  const diffInDays = differenceInDays(now, date); // 일 단위
  const diffInHours = differenceInHours(now, date); // 시간 단위
  const diffInMinutes = differenceInMinutes(now, date); // 분 단위
  const diffInSeconds = differenceInSeconds(now, date); // 초 단위

  if (diffInSeconds < 60) {
    return "방금 전"; // 1분 미만
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`; // 1시간 미만
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`; // 1일 미만
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`; // 7일 이내
  } else {
    // 7일 이상
    return format(date, "yyyy.MM.dd hh:mm a");
  }
};