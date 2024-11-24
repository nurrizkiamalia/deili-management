import { gql } from "@apollo/client";

export const GET_ALL_BOARDS = gql`
  query GetAllBoards {
    getAllBoards {
      id
      boardName
      boardDesc
      isComplete
      assignees {
        userId
        userName
        role
      }
    }
  }
`;

export const GET_BOARD_BY_ID = gql`
  query GetBoardById($id: Long!) {
    getBoardById(id: $id) {
      id
      boardName
      boardDesc
      isComplete
      assignees {
        userId
        userName
        role
      }
    }
  }
`;
