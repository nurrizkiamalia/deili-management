import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Cards from "../Cards";
import { CardDto } from "@/types/datatypes";

interface CardWrapperProps {
  boardId: number;
  card: CardDto;
  cardIndex: number;
  laneId: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ card, boardId, cardIndex, laneId, onDueDateChange, moveCard }) => {
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
    hover: (draggedItem: { laneId: number; cardIndex: number }) => {
      if (draggedItem.laneId !== laneId || draggedItem.cardIndex !== cardIndex) {
        moveCard(draggedItem.laneId, laneId, draggedItem.cardIndex, cardIndex);
        draggedItem.cardIndex = cardIndex;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`mb-2 ${isDragging ? "opacity-50" : ""}`}>
      <Cards
        card={card}
        onDueDateChange={onDueDateChange}
        laneIndex={laneId}
        cardIndex={cardIndex}
        moveCard={moveCard}
        boardId={boardId}
      />
    </div>
  );
};

export default CardWrapper;
