import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

export const formatUpdatedAt = (dateInput: string | Date) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput; // 문자열이면 Date 객체로 변환
  const now = new Date(); // 현재 시간

  const diffInDays = differenceInDays(now, date); // 일 단위
  const diffInHours = differenceInHours(now, date); // 시간 단위
  const diffInMinutes = differenceInMinutes(now, date); // 분 단위
  const diffInSeconds = differenceInSeconds(now, date); // 초 단위

  if (diffInSeconds < 60) {
    return 'just now'; // Less than 1 minute
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`; // Less than 1 hour
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`; // Less than 1 day
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`; // Less than 30 days
  } else {
    // More than one month
    return 'a month ago';
  }
};
