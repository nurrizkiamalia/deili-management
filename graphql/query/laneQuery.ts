import { gql } from '@apollo/client';

export const GET_ALL_LANES = gql`
  query GetAllLanes {
    getAllLanes {
      id
      laneName
      boardId
      position
    }
  }
`;

export const GET_LANE_BY_ID = gql`
  query GetLaneById($id: ID!) {
    getLaneById(id: $id) {
      id
      laneName
      boardId
      position
    }
  }
`;

export const GET_LANES_BY_BOARD = gql`
  query GetLanesByBoard($boardId: ID!) {
    getLanesByBoard(boardId: $boardId) {
      id
      laneName
      boardId
      position
    }
  }
`;

export const GET_LANESWITHCARD_BY_BOARD = gql`
  query GetLanesWithCardsByBoard($boardId: ID!) {
    getLanesWithCardsByBoard(boardId: $boardId) {
      id
      laneName
      boardId
      position
      cards{
        id
        cardName
        cardDesc
        dueDate
        position
        laneId
      }
    }
  }
`;