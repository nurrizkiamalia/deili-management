export interface LoginResponse {
    accessToken: string;
    userId: number;
    email: string;
    role: string;
    jobRole: string;
    isVerified: boolean;
  }
  
  export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    jobRole: number;
    isVerified: boolean;
  }
  
  export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    jobRoleId: number | null;
  }