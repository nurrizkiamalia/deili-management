"use client";

import { useParams } from "next/navigation";
import Board from "./components/Board";
import { useBoardById } from "@/hooks/useBoard";  
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLanesByBoard, useReorderLanes } from '@/hooks/useLane';
import { useEffect, useState } from "react";
import { LaneDTO } from "@/types/datatypes";

const BoardPage = () => {
  const { boardId } = useParams();
  const id = Number(boardId);
  const { board, loading, error } = useBoardById(id);  
  const { handleReorderLanes } = useReorderLanes();
  const { lanes, refetch, loading: lanesLoading, error: lanesError } = useLanesByBoard(id);
  
  const [sortedLanes, setSortedLanes] = useState<LaneDTO[]>([]);

  useEffect(() => {
    if (lanes?.length > 0) {
      const sorted = [...lanes].sort((a: LaneDTO, b: LaneDTO) => a.position - b.position);
      setSortedLanes(sorted);
    }
  }, [lanes]);

  if (lanesLoading || loading) {
    return <p>Loading board...</p>;
  }

  if (lanesError || error) {
    return <p>Error loading board or lanes: {lanesError?.message || error?.message}</p>;
  }

  const handleDueDateChange = (cardId: number, newDate: Date | null) => {
    console.log(`Updated card ${cardId} with new due date: ${newDate}`);
  };

  const moveCard = (fromLaneId: number, toLaneId: number, cardId: number) => {
    console.log(`Moving card ${cardId} from lane ${fromLaneId} to lane ${toLaneId}`);
  };

  const moveLane = async (fromIndex: number, toIndex: number) => {
    const updatedLanes = [...sortedLanes];
    const [movedLane] = updatedLanes.splice(fromIndex, 1);
    updatedLanes.splice(toIndex, 0, movedLane);

    const laneIds = updatedLanes.map(lane => lane.id);

    try {
      const result = await handleReorderLanes(id, laneIds);

      if (result) {
        setSortedLanes(updatedLanes);  
        await refetch(); 
      } else {
        console.error('Failed to reorder lanes');
      }
    } catch (error) {
      console.error('Error reordering lanes:', error);
    }
  };

  if (!board) {
    return <p>Board not found</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full overflow-x-hidden">
        <Board
          board={board}
          onDueDateChange={handleDueDateChange}
          moveLane={moveLane}
          moveCard={moveCard}
          lanes={sortedLanes}
        />
      </div>
    </DndProvider>
  );
};

export default BoardPage;
