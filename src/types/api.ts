import { ReactNode } from "react";

// Auth types
export interface AuthSignInResponse {
    user: any;
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
    id: string;
    folderId: string;
    url: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
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
    id: string;
    email: string;
    nickname: string;
    createdAt: string;
  }
  