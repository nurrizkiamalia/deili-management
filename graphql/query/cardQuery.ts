import { gql } from "@apollo/client";

export const GET_ALL_CARDS = gql`
    query GetAllCards {
        getAllCards {
            id
            cardName
            cardDesc
            dueDate
            position
            laneId
        }
    }
`;

export const GET_CARD_BY_ID = gql`
    query GetCardById($cardId: ID!) {
        getCardById(cardId: $cardId) {
            id
            cardName
            cardDesc
            dueDate
            position
            laneId
        }
    }
`;

export const GET_CARDS_BY_LANE = gql`
    query GetCardsByLane($laneId: ID!) {
        getCardsByLane(laneId: $laneId) {
            id
            cardName
            cardDesc
            dueDate
            position
            laneId
        }
    }
`;

export const GET_ASSIGNEES_BY_CARD = gql`
    query GetAssigneesByCard($cardId: ID!) {
        getAssigneesByCard(cardId: $cardId) {
            id
            cardId
            userId
            username
            email
            jobRole {
                id
                title
                department {
                    id
                    name
                }
            }
        } 
    }
`;

export const GET_ASSIGNEE_BY_ID = gql`
    query GetAssigneeById($assigneeId: ID!) {
        getAssigneeById(assigneeId: $assigneeId) {
            id
            cardId
            userId
            username
            email
            jobRole {
                id
                title
                department {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_LABELS_BY_CARD = gql`
    query GetLabelsByCard($cardId: ID!) {
        getLabelsByCard(cardId: $cardId) {
            id
            cardId
            labelItems {
                id
                labelName
            }
        }
    }
`;

export const GET_LABEL_BY_ID = gql`
    query GetLabelById($labelId: ID!) {
        getLabelById(labelId: $labelId) {
            id
            cardId
            labelItems {
                id
                labelName
            }
        }
    }
`;

export const GET_CHECKLISTS_BY_CARD = gql`
    query GetChecklistsByCard($cardId: ID!) {
        getChecklistsByCard(cardId: $cardId) {
            id
            cardId
            checklistItems {
                id
                checklistId
                content
                status
            }
        }
    }
`;

export const GET_CHECKLIST_BY_ID = gql`
    query GetChecklistById($checklistId: ID!) {
        getChecklistById(checklistId: $checklistId) {
            id
            cardId
            checklistItems {
                id
                checklistId
                content
                status
            }
        }
    }
`;

export const GET_CHECKLIST_ITEM_BY_ID = gql`
    query GetChecklistItemById($checklistItemId: ID!) {
        getChecklistItemById(checklistItemId: $checklistItemId) {
            id
            checklistId
            content
            status
        }
    }
`;
