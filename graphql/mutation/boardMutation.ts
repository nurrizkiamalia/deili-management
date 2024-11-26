import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation CreateBoard($boardName: String!, $boardDesc: String!, $isComplete: Boolean!, $userId: ID!) {
    createBoard(
    boardRequestDTO: {
      boardName: $boardName
      boardDesc: $boardDesc
      isComplete: $isComplete
      userId: $userId
    }) {
      id
      boardName
      boardDesc
      isComplete
      assignees {
        userId
        userName
        role
        email
        status
      }
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation UpdateBoard($id: ID!, $boardName: String, $boardDesc: String, $isComplete: Boolean!, $userId: ID!) {
    updateBoard(id: $id, boardRequestDTO: {
      boardName: $boardName
      boardDesc: $boardDesc
      isComplete: $isComplete
      userId: $userId
    }) {
      id
      boardName
      boardDesc
      isComplete
      assignees {
        userId
        userName
        role
        email
        status
      }
    }
  }
`;

export const TOGGLE_BOARD_COMPLETION = gql`
  mutation ToggleBoardCompletion($id: ID!) {
    toggleBoardCompletion(id: $id) {
      id
      boardName
      boardDesc
      isComplete
      assignees {
        userId
        userName
        role
        email
        status
      }
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id)
  }
`;

export const INVITE_USER_TO_BOARD = gql`
  mutation InviteUserToBoard($boardId: ID!, $userId: ID!, $role: BoardRole!) {
    inviteUserToBoard(boardId: $boardId, userId: $userId, role: $role)
  }
`;

export const RESPOND_TO_INVITATION = gql`
  mutation RespondToInvitation($boardId: ID!, $userId: ID!, $accept: Boolean!){
    respondToInvitation(boardId: $boardId, userId: $userId, accept: $accept)
  }
`;

export const UPDATE_BOARD_ROLE = gql`
  mutation UpdateBoardRole($boardId: ID!, $userId: ID!, $role: BoardRole!) {
    updateBoardRole(boardId: $boardId, userId: $userId, role: $role)
  }
`;

export const REMOVE_BOARD_ASSIGNEE = gql`
  mutation RemoveBoardAssignee($boardId: ID!, $userId: ID!) {
    removeBoardAssignee(boardId: $boardId, userId: $userId)
  }
`;
