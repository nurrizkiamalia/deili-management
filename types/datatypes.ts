export interface project {
  project: boards[];
}

export interface boards {
  id: number;
  boardName: string;
  boardDesc: string;
  isComplete: boolean;
  assignees: assignees[];
}

export interface lanes {
  laneId: number;
  laneName: string;
  cards?: cards[];
}

export interface cards {
  cardId: number;
  cardName: string;
  cardDesc: string;
  checklist?: checklistItem[];
  labels?: labels[];
  assignee?: assignees[];
  dueDate?: string;
}

export interface checklistItem {
  checklistId: number;
  checklistText: string;
  checklistCond: boolean;
}

export interface labels {
  labelId: number;
  labelName: string;
}

export interface assignees {
  userId: string | number;
  userName: string;
  role: string;
  email: string;
  status: string;
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