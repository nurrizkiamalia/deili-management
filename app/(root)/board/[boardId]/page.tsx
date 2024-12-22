"use client";

import { useParams } from "next/navigation";
import Board from "./components/Board";
import { useBoardById } from "@/hooks/useBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLanesandCardByBoard, useReorderLanes } from "@/hooks/useLane";
import { useEffect, useState } from "react";
import { LaneandCards } from "@/types/datatypes";
import { useMoveCardToLane, useReorderCardsInLane } from "@/hooks/useCard";

const BoardPage = () => {
  const { boardId } = useParams();
  const id = Number(boardId);

  const { board, loading: boardLoading, error: boardError } = useBoardById(id);
  const {
    lanesCard,
    refetch: refetchLanesCard,
    loading: lanesCardLoading,
    error: lanesCardError,
  } = useLanesandCardByBoard(id);

  const { handleReorderLanes } = useReorderLanes();
  const { handleMoveCardToLane } = useMoveCardToLane();
  const { handleReorderCardsInLane } = useReorderCardsInLane();

  const [sortedLanes, setSortedLanes] = useState<LaneandCards[]>([]);

  useEffect(() => {
    if (lanesCard?.length > 0) {
      console.log("Updated lanesCard:", lanesCard);
      const sorted = [...lanesCard].sort((a, b) => {
        const posA = typeof a.position === 'string' ? parseInt(a.position) : a.position;
        const posB = typeof b.position === 'string' ? parseInt(b.position) : b.position;
        return posA - posB;
      });
      const lanesWithCards = sorted.map(lane => ({
        ...lane,
        cards: Array.isArray(lane.cards) ? lane.cards : []
      }));
      
      setSortedLanes(lanesWithCards);
    }
  }, [lanesCard]);

  const moveCard = async (
    fromLaneId: number,
    toLaneId: number,
    fromIndex: number,
    toIndex: number
  ) => {
    try {
      const fromLane = sortedLanes.find((lane) => lane.id === fromLaneId);
      const toLane = sortedLanes.find((lane) => lane.id === toLaneId);
  
      if (!fromLane || !toLane) {
        console.error("Invalid lane IDs");
        return;
      }

      const sourceLaneCards = [...fromLane.cards];
      const targetLaneCards = toLaneId === fromLaneId ? sourceLaneCards : [...toLane.cards];
  
      const [cardToMove] = sourceLaneCards.splice(fromIndex, 1);
  
      if (!cardToMove) {
        console.error("Card not found at source index");
        return;
      }
  
      targetLaneCards.splice(toIndex, 0, { ...cardToMove, laneId: toLaneId });
  
      const updatedTargetLaneCards = targetLaneCards.map((card, index) => ({
        ...card,
        position: index, 
      }));
  
      const updatedLanes = sortedLanes.map((lane) => {
        if (lane.id === fromLaneId) {
          return { ...lane, cards: sourceLaneCards };
        }
        if (lane.id === toLaneId) {
          return { ...lane, cards: updatedTargetLaneCards };
        }
        return lane;
      });
  
      setSortedLanes(updatedLanes);
  
      if (fromLaneId === toLaneId) {
        await handleReorderCardsInLane(
          toLaneId,
          updatedTargetLaneCards.map((c) => c.id)
        );
      } else {
        await handleMoveCardToLane({
          cardId: cardToMove.id,
          targetLaneId: toLaneId,
        });
      }
  
      await refetchLanesCard();
      refetchLanesCard();
    } catch (error) {
      console.error("Error moving card:", error);
      await refetchLanesCard();
      refetchLanesCard();
    }
  };
  
  const moveLane = async (fromIndex: number, toIndex: number) => {
    const updatedLanes = [...sortedLanes];
    const [movedLane] = updatedLanes.splice(fromIndex, 1);
    updatedLanes.splice(toIndex, 0, movedLane);

    const laneIds = updatedLanes.map((lane) => lane.id);

    try {
      const result = await handleReorderLanes(id, laneIds);

      if (result) {
        setSortedLanes(updatedLanes);
        await refetchLanesCard();
      } else {
        console.error("Failed to reorder lanes");
      }
    } catch (error) {
      console.error("Error reordering lanes:", error);
    }
  };

  if (lanesCardLoading || boardLoading) {
    return <p>Loading board...</p>;
  }

  if (lanesCardError || boardError) {
    return <p>Error loading board or lanes: {lanesCardError?.message || boardError?.message}</p>;
  }

  if (!board) {
    return <p>Board not found</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full overflow-x-hidden">
        <Board
          board={board}
          moveLane={moveLane}
          moveCard={moveCard}
          lanes={sortedLanes}
        />
      </div>
    </DndProvider>
  );
};

export default BoardPage;
