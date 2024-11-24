import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  INVITE_USER_TO_BOARD,
  UPDATE_BOARD_ROLE,
  REMOVE_BOARD_ASSIGNEE,
} from "@/graphql/mutation/boardMutation";
import { GET_ALL_BOARDS, GET_BOARD_BY_ID } from "@/graphql/query/boardQuery";

export const useBoards = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOARDS);

  return {
    boards: data?.getAllBoards || [],
    loading,
    error,
  };
};

export const useBoardById = (id: number) => {
  const { data, loading, error } = useQuery(GET_BOARD_BY_ID, {
    variables: { id },
    skip: !id,
  });

  return {
    board: data?.getBoardById,
    loading,
    error,
  };
};

export const useCreateBoard = () => {
  const [createBoard, { data, loading, error }] = useMutation(CREATE_BOARD);

  const handleCreateBoard = async (variables: {
    boardRequestDTO: {
      boardName: string;
      boardDesc: string;
      isComplete: boolean;
      userId: number;
    };
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
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const handleUpdateBoard = async (id: number, boardRequestDTO: any) => {
    const { data } = await updateBoard({
      variables: { id, boardRequestDTO },
    });
    return data?.updateBoard;
  };

  return { handleUpdateBoard };
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

  const handleInviteUser = async (boardId: number, userId: number, role: string) => {
    const { data } = await inviteUserToBoard({
      variables: { boardId, userId, role },
    });
    return data?.inviteUserToBoard;
  };

  return { handleInviteUser };
};

export const useUpdateBoardRole = () => {
  const [updateBoardRole] = useMutation(UPDATE_BOARD_ROLE);

  const handleUpdateBoardRole = async (boardId: number, userId: number, role: string) => {
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
