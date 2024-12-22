import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Cards from "../Cards";
import { CardDto, LaneandCards } from "@/types/datatypes";

interface CardWrapperProps {
  boardId: number;
  card: CardDto;
  cardIndex: number;
  laneId: number;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
  lanes: LaneandCards[];
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  card,
  boardId,
  cardIndex,
  laneId,
  moveCard,
  lanes,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { laneId, cardIndex, cardId: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem: { laneId: number; cardIndex: number; cardId: number }) => {
      if (!ref.current) return;
  
      const sourceLaneId = draggedItem.laneId;
      const targetLaneId = laneId;
      if (sourceLaneId === targetLaneId && draggedItem.cardIndex === cardIndex) {
        return;
      }
  
      moveCard(sourceLaneId, targetLaneId, draggedItem.cardIndex, cardIndex);
      draggedItem.laneId = targetLaneId;
      draggedItem.cardIndex = cardIndex;
    },
  });  
  
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`card-wrapper ${isDragging ? "opacity-50" : ""}`}
      data-testid={`card-${card.id}`}
    >
      <Cards
        card={card}
        cardIndex={cardIndex}
        laneIndex={laneId}
        moveCard={moveCard}
        boardId={boardId}
        laneId={laneId}
      />
    </div>
  );
};

export default CardWrapper;
