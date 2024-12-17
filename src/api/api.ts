import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  AuthSignInResponse,
  AuthSignUpResponse,
  FolderResponse,
  LinkResponse,
  OAuthAppResponse,
  UserResponse,
} from '../types/api';

const TEAMID = '11-4';
const PATHS = {
  AUTH: `/teamId/auth/`.replace('teamId', TEAMID),
  FOLDER: `/teamId/folders/`.replace('teamId', TEAMID),
  LINK: `/teamId/links/`.replace('teamId', TEAMID),
  OAUTH: `/teamId/oauthApps/`.replace('teamId', TEAMID),
  USER: `/teamId/users`.replace('teamId', TEAMID),
};

const instance: AxiosInstance = axios.create({
  baseURL: 'https://linkbrary-api.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 accessToken
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
// 로그인하는 API
export const postSignIn = async (email: string, password: string): Promise<AuthSignInResponse> => {
  const response: AxiosResponse<AuthSignInResponse> = await instance.post(PATHS.AUTH + 'sign-in', {
    email,
    password,
  });

  // Access token 저장
  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);

    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  } else {
    console.error('No access token found in response!');
  }

  return response.data;
};

// 회원가입하는 API
export const postSignUp = async (
  email: string,
  password: string,
  name: string,
): Promise<AuthSignUpResponse> => {
  const response: AxiosResponse<AuthSignUpResponse> = await instance.post(PATHS.AUTH + 'sign-up', {
    email,
    password,
    name,
  });
  return response.data;
};

// sns 로그인을 위한 API
export const postSignInWithProvider = async (
  provider: string,
  name: string,
  token: string,
  redirectUri: string,
): Promise<AuthSignInResponse> => {
  const response: AxiosResponse<AuthSignInResponse> = await instance.post(
    `${PATHS.AUTH}sign-in/${provider}`,
    {
      name,
      token,
      redirectUri,
    },
  );
  return response.data;
};

// sns 회원가입을 위한 API
export const postSignUpWithProvider = async (
  token: string,
  redirectUri: string,
  provider: string,
): Promise<AuthSignUpResponse> => {
  const response: AxiosResponse<AuthSignUpResponse> = await instance.post(
    `${PATHS.AUTH}sign-up/${provider}`,
    { token, redirectUri },
  );
  return response.data;
};

// Folder API
// 모든 폴더를 가져오는 API
export const getFolders = async (): Promise<FolderResponse[]> => {
  const response: AxiosResponse<FolderResponse[]> = await instance.get(PATHS.FOLDER);
  return response.data;
};

// 폴더를 생성하는 API
export const postFolder = async (name: string): Promise<FolderResponse> => {
  const response: AxiosResponse<FolderResponse> = await instance.post(PATHS.FOLDER, { name });
  return response.data;
};

// 특정 폴더를 ID로 가져오는 API
export const getFolderById = async (folderId: number): Promise<FolderResponse> => {
  const response: AxiosResponse<FolderResponse> = await instance.get(`${PATHS.FOLDER}${folderId}`);
  return response.data;
};

// 특정 폴더를 삭제하는 API
export const deleteFolder = async (folderId: number): Promise<void> => {
  await instance.delete(`${PATHS.FOLDER}${folderId}`);
};

// 특정 폴더를 수정하는 API
export const putFolder = async (folderId: number, name: string): Promise<FolderResponse> => {
  const response: AxiosResponse<FolderResponse> = await instance.put(`${PATHS.FOLDER}${folderId}`, {
    name,
  });
  return response.data;
};

// Link API
// 특정 폴더에 있는 링크를 가져오는 API
export const getLinksByFolderId = async (
  folderId: number,
  page: number = 1,
  pageSize: number = 9,
): Promise<LinkResponse[]> => {
  const response: AxiosResponse<LinkResponse[]> = await instance.get(
    `${PATHS.FOLDER}${folderId}/links`,
    {
      params: {
        page,
        pageSize,
      },
    },
  );
  return response.data;
};

// 모든 링크를 가져오는 API
export const getLinks = async (
  page: number = 1,
  pageSize: number = 9,
  search: string = '',
): Promise<LinkResponse[]> => {
  const response: AxiosResponse<LinkResponse[]> = await instance.get(PATHS.LINK, {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return response.data;
};

// 즐겨찾기된 링크를 가져오는 API
export const getFavorites = async (
  page: number = 1,
  pageSize: number = 9,
): Promise<LinkResponse[]> => {
  const response: AxiosResponse<LinkResponse[]> = await instance.get(`${PATHS.LINK}favorites`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

// 새 링크를 생성하는 API
export const postLink = async (folderId: number, url: string): Promise<LinkResponse> => {
  const response: AxiosResponse<LinkResponse> = await instance.post(PATHS.LINK, { folderId, url });
  return response.data;
};

// 특정 링크를 업데이트하는 API
export const putLink = async (
  linkId: number,
  data: Partial<LinkResponse>,
): Promise<LinkResponse> => {
  const response: AxiosResponse<LinkResponse> = await instance.put(`${PATHS.LINK}${linkId}`, data);
  return response.data;
};

// 특정 링크를 삭제하는 API
export const deleteLink = async (linkId: number): Promise<void> => {
  await instance.delete(`${PATHS.LINK}${linkId}`);
};

// 특정 링크를 즐겨찾기로 설정하는 API
export const putFavoriteLink = async (linkId: number): Promise<void> => {
  await instance.put(`${PATHS.LINK}${linkId}/favorite`);
};

// OAuth API
// OAuth 앱을 생성하는 API
export const createOAuthApp = async (appData: {
  name: string;
  redirectUri: string;
}): Promise<OAuthAppResponse> => {
  const response: AxiosResponse<OAuthAppResponse> = await instance.post(PATHS.OAUTH, appData);
  return response.data;
};

// User API
// 모든 유저를 가져오는 API
export const getUser = async (): Promise<UserResponse> => {
  const response: AxiosResponse<UserResponse> = await instance.get(PATHS.USER);
  return response.data;
};

// 이메일 존재 여부를 확인하는 API
export const checkEmail = async (email: string): Promise<boolean> => {
  const response: AxiosResponse<{ exists: boolean }> = await instance.post(
    PATHS.USER + '/check-email',
    { email },
  );
  return response.data.exists;
};
