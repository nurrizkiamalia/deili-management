"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Board from "./components/Board";
import { project as initialProject } from "@/data/data";
import { boards } from "@/types/datatypes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BoardPage = () => {
  const { boardId } = useParams();

  if (typeof boardId !== 'string') {
    return <p>Invalid board ID</p>;
  }

  const [project, setProject] = useState<boards[]>(initialProject);
  const board = project.find((b) => b.boardId === Number(boardId));

  // Handle Due Date Change
  const handleDueDateChange = (cardId: number, newDate: Date | null) => {
    const updatedProject = project.map((b) => {
      if (b.boardId === Number(boardId)) {
        return {
          ...b,
          lanes: b.lanes?.map((lane) => ({
            ...lane,
            cards: lane.cards?.map((card) => {
              if (card.cardId === cardId) {
                return {
                  ...card,
                  dueDate: newDate ? newDate.toISOString() : undefined, // Set to undefined instead of null
                };
              }
              return card;
            }),
          })),
        };
      }
      return b;
    });

    setProject(updatedProject as boards[]); // Cast updatedProject as boards[]
  };

  // Move Card between Lanes
  const moveCard = (fromLaneId: number, toLaneId: number, cardId: number) => {
    const updatedBoard = { ...board } as boards;

    const sourceLane = updatedBoard.lanes?.find((lane) => lane.laneId === fromLaneId);
    const targetLane = updatedBoard.lanes?.find((lane) => lane.laneId === toLaneId);
    const cardToMove = sourceLane?.cards?.find((card) => card.cardId === cardId);

    if (sourceLane && targetLane && cardToMove) {
      sourceLane.cards = sourceLane.cards?.filter((card) => card.cardId !== cardId);
      targetLane.cards = [...(targetLane.cards || []), cardToMove];

      const updatedProject = project.map((b) => (b.boardId === updatedBoard.boardId ? updatedBoard : b));
      setProject(updatedProject as boards[]); 
    }
  };

  const moveLane = (fromIndex: number, toIndex: number) => {
    const updatedLanes = [...(board?.lanes || [])];
    const [movedLane] = updatedLanes.splice(fromIndex, 1);
    updatedLanes.splice(toIndex, 0, movedLane);

    const updatedProject = project.map((b) => {
      if (b.boardId === board?.boardId) {
        return { ...b, lanes: updatedLanes };
      }
      return b;
    });

    setProject(updatedProject as boards[]); 
  };

  if (!board) {
    return <p>Board not found</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full">
        <Board board={board} onDueDateChange={handleDueDateChange} moveLane={moveLane} moveCard={moveCard} />
      </div>
    </DndProvider>
  );
};

export default BoardPage;
