import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ASSIGNEES_BY_CARD,
  GET_ASSIGNEE_BY_ID,
  GET_LABELS_BY_CARD,
  GET_LABEL_BY_ID,
  GET_CHECKLISTS_BY_CARD,
  GET_CHECKLIST_BY_ID,
  GET_CHECKLIST_ITEM_BY_ID,
} from "@/graphql/query/cardQuery";

import {
  ADD_ASSIGNEE_TO_CARD,
  REMOVE_ASSIGNEE_FROM_CARD,
  ADD_LABEL_TO_CARD,
  UPDATE_LABEL,
  REMOVE_LABEL,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM,
  TOGGLE_CHECKLIST_ITEM,
  REMOVE_CHECKLIST_ITEM,
} from "@/graphql/mutation/cardMutation";

// Assignee Hooks
export const useGetAssigneesByCard = (cardId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_ASSIGNEES_BY_CARD, {
    variables: { cardId },
    skip: !cardId,
  });

  return {
    assignees: data?.getAssigneesByCard || [],
    refetch,
    loading,
    error,
  };
};

export const useGetAssigneeById = (assigneeId: number) => {
  const { data, loading, error } = useQuery(GET_ASSIGNEE_BY_ID, {
    variables: { assigneeId },
    skip: !assigneeId,
  });

  return {
    assignee: data?.getAssigneeById,
    loading,
    error,
  };
};

export const useAddAssigneeToCard = () => {
  const [addAssigneeToCard, { loading, error }] = useMutation(ADD_ASSIGNEE_TO_CARD);

  const handleAddAssigneeToCard = async (variables: { cardId: number; userId: number }) => {
    try {
      const response = await addAssigneeToCard({ variables });
      return response.data?.addAssigneeToCard;
    } catch (err) {
      console.error("Error adding assignee:", err);
      throw err;
    }
  };

  return {
    handleAddAssigneeToCard,
    loading,
    error,
  };
};

export const useRemoveAssigneeFromCard = () => {
  const [removeAssigneeFromCard, { loading, error }] = useMutation(REMOVE_ASSIGNEE_FROM_CARD);

  const handleRemoveAssigneeFromCard = async (cardAssigneeId: number) => {
    try {
      const response = await removeAssigneeFromCard({ variables: { cardAssigneeId } });
      return response.data?.removeAssigneeFromCard;
    } catch (err) {
      console.error("Error removing assignee:", err);
      throw err;
    }
  };

  return {
    handleRemoveAssigneeFromCard,
    loading,
    error,
  };
};

// Label Hooks
export const useGetLabelsByCard = (cardId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_LABELS_BY_CARD, {
    variables: { cardId },
    skip: !cardId,
  });

  return {
    labels: data?.getLabelsByCard || [],
    refetch,
    loading,
    error,
  };
};

export const useGetLabelById = (labelId: number) => {
  const { data, loading, error } = useQuery(GET_LABEL_BY_ID, {
    variables: { labelId },
    skip: !labelId,
  });

  return {
    label: data?.getLabelById,
    loading,
    error,
  };
};

export const useAddLabelToCard = () => {
  const [addLabelToCard, { loading, error }] = useMutation(ADD_LABEL_TO_CARD);

  const handleAddLabelToCard = async (variables: { cardId: number; labelName: string }) => {
    try {
      const response = await addLabelToCard({ variables });
      return response.data?.addLabelToCard;
    } catch (err) {
      console.error("Error adding label:", err);
      throw err;
    }
  };

  return {
    handleAddLabelToCard,
    loading,
    error,
  };
};

export const useUpdateLabel = () => {
  const [updateLabel, { loading, error }] = useMutation(UPDATE_LABEL);

  const handleUpdateLabel = async (variables: { labelId: number; labelName: string }) => {
    try {
      const response = await updateLabel({ variables });
      return response.data?.updateLabel;
    } catch (err) {
      console.error("Error updating label:", err);
      throw err;
    }
  };

  return {
    handleUpdateLabel,
    loading,
    error,
  };
};

export const useRemoveLabel = () => {
  const [removeLabel, { loading, error }] = useMutation(REMOVE_LABEL);

  const handleRemoveLabel = async (labelId: number) => {
    try {
      const response = await removeLabel({ variables: { labelId } });
      return response.data?.removeLabel;
    } catch (err) {
      console.error("Error removing label:", err);
      throw err;
    }
  };

  return {
    handleRemoveLabel,
    loading,
    error,
  };
};

// Checklist Hooks
export const useGetChecklistsByCard = (cardId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_CHECKLISTS_BY_CARD, {
    variables: { cardId },
    skip: !cardId,
  });

  return {
    checklists: data?.getChecklistsByCard || [],
    refetch,
    loading,
    error,
  };
};

export const useGetChecklistById = (checklistId: number) => {
  const { data, loading, error } = useQuery(GET_CHECKLIST_BY_ID, {
    variables: { checklistId },
    skip: !checklistId,
  });

  return {
    checklist: data?.getChecklistById,
    loading,
    error,
  };
};

export const useGetChecklistItemById = (checklistItemId: number) => {
  const { data, loading, error } = useQuery(GET_CHECKLIST_ITEM_BY_ID, {
    variables: { checklistItemId },
    skip: !checklistItemId,
  });

  return {
    checklistItem: data?.getChecklistItemById,
    loading,
    error,
  };
};

export const useAddChecklistItem = () => {
  const [addChecklistItem, { loading, error }] = useMutation(ADD_CHECKLIST_ITEM);

  const handleAddChecklistItem = async (variables: { cardId: number; content: string }) => {
    try {
      const response = await addChecklistItem({ variables });
      return response.data?.addChecklistItem;
    } catch (err) {
      console.error("Error adding checklist item:", err);
      throw err;
    }
  };

  return {
    handleAddChecklistItem,
    loading,
    error,
  };
};

export const useUpdateChecklistItem = () => {
  const [updateChecklistItem, { loading, error }] = useMutation(UPDATE_CHECKLIST_ITEM);

  const handleUpdateChecklistItem = async (variables: { checklistItemId: number; content: string; status: boolean }) => {
    try {
      const response = await updateChecklistItem({ variables });
      return response.data?.updateChecklistItem;
    } catch (err) {
      console.error("Error updating checklist item:", err);
      throw err;
    }
  };

  return {
    handleUpdateChecklistItem,
    loading,
    error,
  };
};

export const useToggleChecklistItem = () => {
  const [toggleChecklistItem, { loading, error }] = useMutation(TOGGLE_CHECKLIST_ITEM);

  const handleToggleChecklistItem = async (checklistItemId: number) => {
    try {
      const response = await toggleChecklistItem({ variables: { checklistItemId } });
      return response.data?.toggleChecklistItem;
    } catch (err) {
      console.error("Error toggling checklist item:", err);
      throw err;
    }
  };

  return {
    handleToggleChecklistItem,
    loading,
    error,
  };
};

export const useRemoveChecklistItem = () => {
  const [removeChecklistItem, { loading, error }] = useMutation(REMOVE_CHECKLIST_ITEM);

  const handleRemoveChecklistItem = async (checklistItemId: number) => {
    try {
      const response = await removeChecklistItem({ variables: { checklistItemId } });
      return response.data?.removeChecklistItem;
    } catch (err) {
      console.error("Error removing checklist item:", err);
      throw err;
    }
  };

  return {
    handleRemoveChecklistItem,
    loading,
    error,
  };
};