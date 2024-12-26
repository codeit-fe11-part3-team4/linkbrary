const regex = /^https?:\/\/.*/i;

export const LinkData = (url: string) => {
  return regex.test(url);
};