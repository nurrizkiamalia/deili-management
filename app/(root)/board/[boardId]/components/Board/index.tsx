"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useUpdateBoard } from "@/hooks/useBoard";
import { boards } from "@/types/datatypes";
import BoardInvitation from "../BoardInvitation";
import BoardAssignee from "../BoardAssignee";
import { useBoardById } from "@/hooks/useBoard";
import { useParams } from "next/navigation";
import { useLanesByBoard } from "@/hooks/useLane";
import { LaneDTO as LaneType } from "@/types/datatypes";
import Lanes from "../Lanes";

interface BoardProps {
  board: boards;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, cardId: number) => void;
  lanes: LaneType[];
}

const Board: React.FC<BoardProps> = ({ board, onDueDateChange, moveLane, moveCard, lanes }) => {
  const { boardId } = useParams();
  const { handleUpdateBoard } = useUpdateBoard();
  const { refetch } = useBoardById(board.id);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [boardName, setBoardName] = useState(board.boardName);
  const [boardDesc, setBoardDesc] = useState(board.boardDesc);
  const nameRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const handleSaveBoardUpdate = async () => {
    try {
      const updatedBoard = await handleUpdateBoard({
        id: board.id,
        boardName,
        boardDesc,
        isComplete: board.isComplete,
        userId: board.assignees[0]?.userId || '',
      });

     await refetch(); 

      alert("Board updated successfully");
    } catch (error) {
      console.error("Failed to update the board:", error);
      alert("Failed to update the board");
    }
  };

  const handleChangeName = () => {
    if (nameRef.current) {
      setBoardName(nameRef.current.innerText);
    }
  };

  const handleChangeDesc = () => {
    if (descRef.current) {
      setBoardDesc(descRef.current.innerText);
    }
  };

  useEffect(() => {
    if (nameRef.current) nameRef.current.innerText = boardName;
    if (descRef.current) descRef.current.innerText = boardDesc;
  }, [boardName, boardDesc]); 

  return (
    <div className="flex flex-col w-full min-h-[90vh] h-full rounded-xl border-2 overflow-x-hidden">
      <div className="flex flex-col w-full h-full bg-white rounded-t-xl overflow-x-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end h-full min-h-[150px] p-5 md:p-10">
          <div className="flex flex-col items-start justify-end gap-3">
            <div className="flex gap-5 items-center">
              {/* Board Name */}
              <div
                className="font-bold text-2xl focus:px-2 hover:outline-2 focus:outline rounded transition-all duration-300"
                ref={nameRef}
                contentEditable
                onFocus={() => setIsEditingName(true)}
                onBlur={handleChangeName} 
              />
              {isEditingName && (
                <button
                  className="text-xs p-2"
                  onClick={handleSaveBoardUpdate}
                >
                  <BsPencil /> 
                </button>
              )}
            </div>

            {/* Board Description */}
            <div className="flex gap-5 items-center">
              <div
                className="text-dspGray focus:px-2 hover:outline-2 focus:outline rounded transition-all duration-300"
                ref={descRef}
                contentEditable
                onFocus={() => setIsEditingDesc(true)}
                onBlur={handleChangeDesc}
              />
              {isEditingDesc && (
                <button
                  className="text-xs p-2"
                  onClick={handleSaveBoardUpdate}
                >
                  <BsPencil />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-5 items-end justify-end h-full">
            <BoardInvitation boardId={Number(boardId)} />
          </div>
        </div>

        <BoardAssignee assignees={board.assignees} />

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