import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_CARDS,
  GET_CARD_BY_ID,
  GET_CARDS_BY_LANE,
} from "@/graphql/query/cardQuery";
import {
  CREATE_CARD,
  UPDATE_CARD,
  UPDATE_DUE_DATE,
  DELETE_CARD,
  REORDER_CARDS_IN_LANE,
  MOVE_CARD_TO_LANE,
} from "@/graphql/mutation/cardMutation";

export const useCards = () => {
  const { data, loading, error } = useQuery(GET_ALL_CARDS);

  return {
    cards: data?.getAllCards || [],
    loading,
    error,
  };
};

export const useCardsByLane = (laneId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_CARDS_BY_LANE, {
    variables: { laneId },
    skip: !laneId,
  });

  return {
    cards: data?.getCardsByLane || [],
    refetch,
    loading,
    error,
  };
};

export const useCardById = (cardId: number) => {
  const { data, loading, error } = useQuery(GET_CARD_BY_ID, {
    variables: { cardId },
    skip: !cardId,
  });

  return {
    card: data?.getCardById,
    loading,
    error,
  };
};

export const useCreateCard = () => {
  const [createCard, { data, loading, error }] = useMutation(CREATE_CARD);

  const handleCreateCard = async (variables: { cardName: string; cardDesc: string; laneId: number }) => {
    try {
      const response = await createCard({ variables });
      return response.data?.createCard;
    } catch (err) {
      console.error("Error creating card:", err);
      throw err;
    }
  };

  return {
    handleCreateCard,
    data,
    loading,
    error,
  };
};

export const useUpdateCard = () => {
  const [updateCard, { data, loading, error }] = useMutation(UPDATE_CARD);

  const handleUpdateCard = async (variables: { cardId: number; cardName: string; cardDesc: string, laneId: number }) => {
    try {
      const response = await updateCard({ variables });
      return response.data?.updateCard;
    } catch (err) {
      console.error("Error updating card:", err);
      throw err;
    }
  };

  return {
    handleUpdateCard,
    data,
    loading,
    error,
  };
};

export const useUpdateDueDate = () => {
  const [updateDueDate, { data, loading, error }] = useMutation(UPDATE_DUE_DATE);

  const handleUpdateDueDate = async (variables: { cardId: number; dueDate: string }) => {
    try {
      const response = await updateDueDate({ variables });
      return response.data?.updateDueDate;
    } catch (err) {
      console.error("Error updating due date:", err);
      throw err;
    }
  };

  return {
    handleUpdateDueDate,
    data,
    loading,
    error,
  };
};

export const useDeleteCard = () => {
  const [deleteCard, { loading, error }] = useMutation(DELETE_CARD);

  const handleDeleteCard = async (cardId: number) => {
    try {
      const response = await deleteCard({ variables: { cardId } });
      return response.data?.deleteCard;
    } catch (err) {
      console.error("Error deleting card:", err);
      throw err;
    }
  };

  return {
    handleDeleteCard,
    loading,
    error,
  };
};

export const useReorderCardsInLane = () => {
  const [reorderCardsInLane, { loading, error }] = useMutation(REORDER_CARDS_IN_LANE);

  const handleReorderCardsInLane = async (laneId: number, cardIds: number[]) => {
    try {
      const response = await reorderCardsInLane({ variables: { laneId, cardIds } });
      return response.data?.reorderCardsInLane;
    } catch (err) {
      console.error("Error reordering cards:", err);
      throw err;
    }
  };

  return {
    handleReorderCardsInLane,
    loading,
    error,
  };
};

export const useMoveCardToLane = () => {
  const [moveCardToLane, { loading, error }] = useMutation(MOVE_CARD_TO_LANE);

  const handleMoveCardToLane = async (variables: { cardId: number; targetLaneId: number; newPosition: number }) => {
    try {
      const response = await moveCardToLane({ variables });
      return response.data?.moveCardToLane;
    } catch (err) {
      console.error("Error moving card:", err);
      throw err;
    }
  };

  return {
    handleMoveCardToLane,
    loading,
    error,
  };
};