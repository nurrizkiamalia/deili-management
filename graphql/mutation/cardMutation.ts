import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
    mutation CreateCard($cardName: String!, $cardDesc: String, $laneId: ID!) {
        createCard(cardInput: {
            cardName: $cardName
            cardDesc: $cardDesc
            laneId: $laneId
        }) {
            id
            cardName
            cardDesc
            dueDate
            position
            laneId
        }
    }
`;

export const UPDATE_CARD = gql`
    mutation UpdateCard($cardId: ID!, $cardName: String!, $cardDesc: String, $laneId: ID!) {
        updateCard(cardId: $cardId, cardInput: {
            cardName: $cardName
            cardDesc: $cardDesc
            laneId: $laneId
        }) {
            id
            cardName
            cardDesc
            dueDate
            position
            laneId
        }
    }
`;

export const UPDATE_DUE_DATE = gql`
    mutation UpdateDueDate($cardId: ID!, $dueDate: String!) {
        updateDueDate(cardId: $cardId, dueDate: $dueDate) {
            id
            dueDate
        }
    }
`;

export const DELETE_CARD = gql`
    mutation DeleteCard($cardId: ID!) {
        deleteCard(cardId: $cardId)
    }
`;

export const REORDER_CARDS_IN_LANE = gql`
    mutation ReorderCardsInLane($laneId: ID!, $cardIds: [ID!]!) {
        reorderCardsInLane(laneId: $laneId, cardIds: $cardIds)
    }
`;

export const MOVE_CARD_TO_LANE = gql`
    mutation MoveCardToLane($cardId: ID!, $targetLaneId: ID!, $newPosition: Int!) {
        moveCardToLane(cardId: $cardId, targetLaneId: $targetLaneId, newPosition: $newPosition)
    }
`;

export const ADD_ASSIGNEE_TO_CARD = gql`
    mutation AddAssigneeToCard($cardId: ID!, $userId: ID!) {
        addAssigneeToCard(cardId: $cardId, userId: $userId) {
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

export const REMOVE_ASSIGNEE_FROM_CARD = gql`
    mutation RemoveAssigneeFromCard($cardAssigneeId: ID!) {
        removeAssigneeFromCard(cardAssigneeId: $cardAssigneeId)
    }
`;

export const ADD_LABEL_TO_CARD = gql`
    mutation AddLabelToCard($cardId: ID!, $labelName: String!) {
        addLabelToCard(cardId: $cardId, labelName: $labelName) {
            id
            cardId
            labelItems {
                id
                labelName
            }
        }
    }
`;

export const UPDATE_LABEL = gql`
    mutation UpdateLabel($labelId: ID!, $labelName: String!) {
        updateLabel(labelId: $labelId, labelName: $labelName) {
            id
            cardId
            labelItems {
                id
                labelName
            }
        }
    }
`;

export const REMOVE_LABEL = gql`
    mutation RemoveLabel($labelId: ID!) {
        removeLabel(labelId: $labelId)
    }
`;

export const ADD_CHECKLIST_ITEM = gql`
    mutation AddChecklistItem($cardId: ID!, $content: String!) {
        addChecklistItem(cardId: $cardId, content: $content) {
            id
            checklistId
            content
            status
        }
    }
`;

export const UPDATE_CHECKLIST_ITEM = gql`
    mutation UpdateChecklistItem($checklistItemId: ID!, $content: String!, $status: Boolean) {
        updateChecklistItem(checklistItemId: $checklistItemId, content: $content, status: $status) {
            id
            checklistId
            content
            status
        }
    }
`;

export const TOGGLE_CHECKLIST_ITEM = gql`
    mutation ToggleChecklistItem($checklistItemId: ID!) {
        toggleChecklistItem(checklistItemId: $checklistItemId) {
            id
            checklistId
            content
            status
        }
    }
`;

export const REMOVE_CHECKLIST_ITEM = gql`
    mutation RemoveChecklistItem($checklistItemId: ID!) {
        removeChecklistItem(checklistItemId: $checklistItemId)
    }
`;
