// Auth types
export interface AuthSignInResponse {
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
  