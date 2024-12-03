import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  INVITE_USER_TO_BOARD,
  UPDATE_BOARD_ROLE,
  REMOVE_BOARD_ASSIGNEE,
  RESPOND_TO_INVITATION,
  TOGGLE_BOARD_COMPLETION,
} from "@/graphql/mutation/boardMutation";
import {
  GET_ALL_BOARDS,
  GET_BOARD_BY_ID,
  GET_BOARD_BY_USER,
} from "@/graphql/query/boardQuery";
import { boards } from "@/types/datatypes";

export const useBoards = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOARDS);
  return {
    boards: data?.getAllBoards || [],
    loading,
    error,
  };
};

export const useBoardByUser = (userId: number) => {
  const { data, loading, error } = useQuery(GET_BOARD_BY_USER, {
    variables: { userId },
    skip: !userId,
  });

  const pendingInvitations = data?.getBoardByUser?.filter((board: boards) => 
    board.assignees.some((assignee) => {
      return assignee.userId === userId && assignee.status === 'PENDING';
    })
  ) || []; 

  return {
    pendingInvitations,
    boardByUser: data?.getBoardByUser,
    loading,
    error,
  };
};


export const useBoardById = (id: number) => {
  const { data, refetch, loading, error } = useQuery(GET_BOARD_BY_ID, {
    variables: { id },
    skip: !id,
  });
  return {
    board: data?.getBoardById,
    loading,
    refetch,
    error,
  };
};

export const useCreateBoard = () => {
  const [createBoard, { data, loading, error }] = useMutation(CREATE_BOARD);

  const handleCreateBoard = async (variables: {
    boardName: string;
    boardDesc: string;
    isComplete: boolean;
    userId: string | number;
  }) => {
    try {
      const response = await createBoard({ variables });
      return response.data;
    } catch (err) {
      console.error("Error creating board:", err);
      throw err;
    }
  };

  return {
    handleCreateBoard,
    data,
    loading,
    error,
  };
};

export const useUpdateBoard = () => {
  const [updateBoard, { data, loading, error }] = useMutation(UPDATE_BOARD);
  
  const handleUpdateBoard = async (variables: {
    id: number;
    boardName: string;
    boardDesc: string;
    isComplete: boolean;
    userId: string | number;
  }) => {
    const response = await updateBoard({variables});
    return response.data;
  };

  const [toggleBoardCompletion] = useMutation(TOGGLE_BOARD_COMPLETION);
  const handleToggleCompletion = async (boardId: number) => {
    try {
      const { data } = await toggleBoardCompletion({
        variables: { id: boardId },
      });
      alert(
        data.toggleBoardCompletion.isComplete
          ? "Board marked as completed!"
          : "Board reopened successfully!"
      );
      return data?.updateBoard;
    } catch (error) {
      console.error("Failed to toggle board completion:", error);
      alert("Failed to toggle board completion. Please try again.");
    }
  };
  return { handleUpdateBoard, handleToggleCompletion, data, loading,error };
};

export const useDeleteBoard = () => {
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const handleDeleteBoard = async (id: number) => {
    const { data } = await deleteBoard({ variables: { id } });
    return data?.deleteBoard;
  };
  return { handleDeleteBoard };
};

export const useInviteUserToBoard = () => {
  const [inviteUserToBoard] = useMutation(INVITE_USER_TO_BOARD);
  const handleInviteUser = async (
    boardId: number,
    userId: number,
    role: string
  ) => {
    const { data } = await inviteUserToBoard({
      variables: { boardId, userId, role },
    });
    return data?.inviteUserToBoard;
  };
  return { handleInviteUser };
};

export const useRespondToInvitation = () => {
  const [respondToInvitation] = useMutation(RESPOND_TO_INVITATION);
  const handleRespondToInvitation = async (
    boardId: number,
    userId: number | string,
    accept: boolean
  ) => {
    const { data } = await respondToInvitation({
      variables: { boardId, userId, accept },
    });
    return data?.respondToInvitation;
  };
  return { handleRespondToInvitation };
};

export const useUpdateBoardRole = () => {
  const [updateBoardRole] = useMutation(UPDATE_BOARD_ROLE);
  const handleUpdateBoardRole = async (
    boardId: number,
    userId: number,
    role: string
  ) => {
    const { data } = await updateBoardRole({
      variables: { boardId, userId, role },
    });
    return data?.updateBoardRole;
  };
  return { handleUpdateBoardRole };
};

export const useRemoveBoardAssignee = () => {
  const [removeBoardAssignee] = useMutation(REMOVE_BOARD_ASSIGNEE);
  const handleRemoveAssignee = async (boardId: number, userId: number) => {
    const { data } = await removeBoardAssignee({
      variables: { boardId, userId },
    });
    return data?.removeBoardAssignee;
  };
  return { handleRemoveAssignee };
};
