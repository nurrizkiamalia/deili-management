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

export interface BoardCardProps {
  board: {
    id: number;
    boardName?: string;
    boardDesc?: string;
    isComplete?: Boolean;
    assignee: assignees[];
  };
}

export interface BoardRequestDto{
  boardName: string;
  boardDesc: string;
  isComplete: boolean;
  userId: string | number;
}

export interface assignees{
  userId: string | number;
  userName: string;
  role: string;
  email: string;
  status: string;
  jobRole?: JobRole;
}

export interface JobRole{
  id: number;
  title: string;
  department?: Department; 
}

export interface Department{
  id: number;
  name: string;
}

export interface LaneDTO {
  id: number;
  laneName: string;
  boardId: number;
  position: number;
}

export interface LaneInputDTO {
  laneName: string;
  boardId: number;
  position?: number;
}