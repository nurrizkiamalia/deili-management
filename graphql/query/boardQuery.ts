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
        email
        status
      }
    }
  }
`;

export const GET_BOARD_BY_USER = gql`
  query GetBoardByUser($userId: ID!){
    getBoardByUser(userId: $userId){
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

export const GET_BOARD_BY_ID = gql`
  query GetBoardById($id: ID!) {
    getBoardById(id: $id) {
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
