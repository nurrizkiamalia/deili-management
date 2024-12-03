import { gql } from '@apollo/client';

export const CREATE_LANE = gql`
  mutation CreateLane($laneName: String!, $boardId: ID!, $position: Int) {
    createLane(laneDto: {
        laneName: $laneName
        boardId: $boardId
        position: $position
    }) {
      id
      laneName
      boardId
      position
    }
  }
`;

export const UPDATE_LANE = gql`
  mutation UpdateLane($laneId: ID!, $laneName: String!, $boardId: ID!, $position: Int!) {
  updateLane(
    laneId: $laneId,
    laneDto: {
      laneName: $laneName
      boardId: $boardId
      position: $position
    }
    ) {
      id
      laneName
      boardId
      position
    }
  }
`;

export const DELETE_LANE = gql`
  mutation DeleteLane($laneId: ID!) {
    deleteLane(laneId: $laneId)
  }
`;

export const REORDER_LANES = gql`
  mutation ReorderLanes($boardId: ID!, $laneIds: [ID!]!) {
    reorderLanes(boardId: $boardId, laneIds: $laneIds)
  }
`;
