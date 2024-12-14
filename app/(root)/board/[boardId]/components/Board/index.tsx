"use client";

import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useUpdateBoard } from "@/hooks/useBoard";
import { boards } from "@/types/datatypes";
import BoardInvitation from "../BoardInvitation";
import BoardAssignee from "../BoardAssignee";
import { useBoardById } from "@/hooks/useBoard";
import { useParams } from "next/navigation";
import { LaneDTO as LaneType } from "@/types/datatypes";
import Lanes from "../Lanes";

interface BoardProps {
  board: boards;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, cardId: number) => void;
  lanes: LaneType[];
}

const Board: React.FC<BoardProps> = ({
  board,
  onDueDateChange,
  moveLane,
  moveCard,
  lanes,
}) => {
  const { boardId } = useParams();
  const { handleUpdateBoard } = useUpdateBoard();
  const { refetch } = useBoardById(board.id);

  const [boardName, setBoardName] = useState(board.boardName);
  const [boardDesc, setBoardDesc] = useState(board.boardDesc);

  const initialBoardName = board.boardName;
  const initialBoardDesc = board.boardDesc;

  const handleBoardUpdate = async () => {
    if (boardName !== initialBoardName || boardDesc !== initialBoardDesc) {
      try {
        await handleUpdateBoard({
          id: board.id,
          boardName,
          boardDesc,
          isComplete: board.isComplete,
          userId: board.assignees[0]?.userId || "",
        });
        await refetch();
        console.log("Board updated successfully");
      } catch (error) {
        console.error("Failed to update the board:", error);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[90vh] h-full rounded-xl border-2 overflow-x-hidden">
      <div className="flex flex-col w-full h-full bg-white rounded-t-xl overflow-x-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end h-full min-h-[150px] p-5 md:p-10">
          <div className="flex flex-col items-start justify-end gap-3 w-full">
            {/* Editable Board Name */}
            <div className="flex gap-5 items-center w-full">
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                onBlur={handleBoardUpdate}
                onKeyDown={handleKeyDown}
                className="font-bold w-full lg:w-[80%] text-2xl px-2 rounded-xl focus:outline-none focus:ring hover:outline transition-all duration-300"
              />
              <BsPencil className="text-gray-500" />
            </div>

            {/* Editable Board Description */}
            <div className="flex gap-5 items-center w-full">
              <textarea
                rows={3}
                minLength={100}
                maxLength={800}
                value={boardDesc}
                onChange={(e) => setBoardDesc(e.target.value)}
                onBlur={handleBoardUpdate}
                onKeyDown={handleKeyDown}
                className="text-dspGray w-full lg:w-[80%] px-2 py-1 rounded-xl focus:outline-none focus:ring border transition-all duration-300"
                placeholder="Add a board description..."
              />
              <BsPencil className="text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 px-5 md:px-10 mb-10">
          <BoardInvitation boardId={Number(boardId)} />
          <BoardAssignee assignees={board.assignees} />
        </div>

        <div className="px-5 md:px-10 pb-5">
          <p className="font-bold text-dspGray">Boards</p>
          <hr className="w-20 border-2 border-black" />
        </div>
      </div>

      <hr className="border-2" />
      <div className="h-full">
        <Lanes
          boardId={Number(boardId)}
          onDueDateChange={onDueDateChange}
          moveLane={moveLane}
          moveCard={moveCard}
          lanes={lanes}
        />
      </div>
    </div>
  );
};

export default Board;
