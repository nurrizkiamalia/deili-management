import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation CreateBoard($boardRequestDTO: BoardRequestDto!) {
    createBoard(boardRequestDTO: $boardRequestDTO) {
      id
      boardName
      boardDesc
      isComplete
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation UpdateBoard($id: Long!, $boardRequestDTO: BoardRequestDto!) {
    updateBoard(id: $id, boardRequestDTO: $boardRequestDTO) {
      id
      boardName
      boardDesc
      isComplete
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: Long!) {
    deleteBoard(id: $id)
  }
`;

export const INVITE_USER_TO_BOARD = gql`
  mutation InviteUserToBoard($boardId: Long!, $userId: Long!, $role: BoardRole!) {
    inviteUserToBoard(boardId: $boardId, userId: $userId, role: $role)
  }
`;

export const UPDATE_BOARD_ROLE = gql`
  mutation UpdateBoardRole($boardId: Long!, $userId: Long!, $role: BoardRole!) {
    updateBoardRole(boardId: $boardId, userId: $userId, role: $role)
  }
`;

export const REMOVE_BOARD_ASSIGNEE = gql`
  mutation RemoveBoardAssignee($boardId: Long!, $userId: Long!) {
    removeBoardAssignee(boardId: $boardId, userId: $userId)
  }
`;
