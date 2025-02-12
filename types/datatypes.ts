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

export interface assignee{
  assigneeId: number;
  assigneeName: string;
  assigneeRole: string;
  assigneeImage: string;
}

export interface LaneDTO {
  id: number;
  laneName: string;
  boardId: number;
  position: number;
}

export interface LaneandCards{
  id: number;
  laneName: string;
  boardId: number;
  position: number;
  cards: CardDto[];
}

export interface LaneInputDTO {
  laneName: string;
  boardId: number;
  position?: number;
}

export interface CardDto{
  id: number;
  cardName: string;
  cardDesc: string;
  dueDate: string;
  position: number;
  laneId: number;
}

export interface CardInput{
  cardName: string,
  cardDesc: String
  laneId: number;
}

export interface CardAssigneeDto{
  id: number;
  cardId: number;
  userId: number;
  username: string;
  email: string;
  jobRole: string;
}

export interface LabelDto{
  id: number;
  cardId: number;
  labelItem: LabelItems[];
}

export interface LabelItems{
  id: number;
  labelName: string;
}

export interface ChecklistDto{
  id: number;
  cardId: number;
  checklistItems: ChecklistItems[];
}

export interface ChecklistItems{
  id: number;
  checklistId: number;
  content: string;
  status: boolean;
}