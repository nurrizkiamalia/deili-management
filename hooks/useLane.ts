import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_LANES,
  GET_LANE_BY_ID,
  GET_LANES_BY_BOARD,
} from '@/graphql/query/laneQuery';
import {
  CREATE_LANE,
  UPDATE_LANE,
  DELETE_LANE,
  REORDER_LANES,
} from '@/graphql/mutation/laneMutation';

export const useLanes = () => {
  const { data, loading, error } = useQuery(GET_ALL_LANES);

  return {
    lanes: data?.getAllLanes || [],
    loading,
    error,
  };
};

export const useLanesByBoard = (boardId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_LANES_BY_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });

  return {
    lanes: data?.getLanesByBoard || [],
    refetch,
    loading,
    error,
  };
};

export const useLaneById = (laneId: number) => {
  const { data, loading, error } = useQuery(GET_LANE_BY_ID, {
    variables: { id: laneId },
    skip: !laneId,
  });

  return {
    lane: data?.getLaneById,
    loading,
    error,
  };
};

export const useCreateLane = () => {
  const [createLane, { data, loading, error }] = useMutation(CREATE_LANE);

  const handleCreateLane = async (variables: {
    laneName: string;
    boardId: number;
    position: number;
  }) => {
    try {
      const response = await createLane({ variables });
      return response.data?.createLane;
    } catch (err) {
      console.error('Error creating lane:', err);
      throw err;
    }
  };

  return {
    handleCreateLane,
    data,
    loading,
    error,
  };
};

export const useUpdateLane = () => {
  const [updateLane, { data, loading, error }] = useMutation(UPDATE_LANE);

  const handleUpdateLane = async (variables: {
    laneId: number,
    laneName: string;
    boardId: number;
    position: number;
  }) => {
    try {
      const response = await updateLane({ variables });
      return response.data?.updateLane;
    } catch (err) {
      console.error('Error updating lane:', err);
      throw err;
    }
  };

  return {
    handleUpdateLane,
    data,
    loading,
    error,
  };
};

export const useDeleteLane = () => {
  const [deleteLane, { loading, error }] = useMutation(DELETE_LANE);

  const handleDeleteLane = async (laneId: number) => {
    try {
      const response = await deleteLane({ variables: { laneId } });
      return response.data?.deleteLane;
    } catch (err) {
      console.error('Error deleting lane:', err);
      throw err;
    }
  };

  return {
    handleDeleteLane,
    loading,
    error,
  };
};

export const useReorderLanes = () => {
  const [reorderLanes, { loading, error }] = useMutation(REORDER_LANES);

  const handleReorderLanes = async (boardId: number, laneIds: number[]) => {
    try {
      const stringLaneIds = laneIds.map(id => id.toString());
      const response = await reorderLanes({ 
        variables: { 
          boardId: boardId.toString(), 
          laneIds: stringLaneIds 
        },
        optimisticResponse: {
          reorderLanes: true
        }
      });
      
      if (response?.data?.reorderLanes) {
        console.log("Reordered lanes:", response.data.reorderLanes);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error reordering lanes:', err);
      throw err;
    }
  };

  return {
    handleReorderLanes,
    loading,
    error,
  };
};