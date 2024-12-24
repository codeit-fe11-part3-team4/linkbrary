import { ReactNode } from 'react';

// Auth types
export interface AuthSignInResponse {
  user: string;
  email: ReactNode;
  accessToken: string;
  token: string;
  userId: string;
}

export interface AuthSignUpResponse {
  userId: string;
  message: string;
  name: string;
}

// Folder types
export interface FolderResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Link types
export interface LinkResponse {
  favorite: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource: any;
  id: number;
  folderId: string;
  url: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardListResponse {
  totalCount: number;
  list: LinkResponse[];
}

// OAuth types
export interface OAuthAppResponse {
  id: string;
  name: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}

// User types
export interface UserResponse {
  imageSource: ReactNode;
  name: ReactNode;
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
}
