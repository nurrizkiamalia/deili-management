export interface project{
    project: boards[];
}

export interface boards{
    boardId: number;
    boardName: string;
    boardDesc: string;
    lanes?: lanes[];
}

export interface lanes{
    laneId: number;
    laneName: string;
    cards?: cards[]
}

export interface cards{
    cardId: number;
    cardName: string;
    cardDesc: string;
    checklist?: checklistItem[];
    labels?: labels[];
    assignee?: assignee[];
    dueDate?: string;
}

export interface checklistItem{
    checklistId: number;
    checklistText: string;
    checklistCond: boolean;
}

export interface labels{
    labelId: number;
    labelName: string;
}

export interface assignee{
    assigneeId: number;
    assigneeName: string;
    assigneeRole: string;
    assigneeImage?: string;
}