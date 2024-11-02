import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Cards from "../Cards";
import { cards } from "@/types/datatypes";

interface CardWrapperProps {
  card: cards;
  cardIndex: number;
  laneId: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ card, cardIndex, laneId, onDueDateChange, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { laneId, cardIndex, cardId: card.cardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem: { laneId: number; cardIndex: number }) => {
      if (draggedItem.laneId !== laneId || draggedItem.cardIndex !== cardIndex) {
        moveCard(draggedItem.laneId, laneId, draggedItem.cardIndex, cardIndex);
        draggedItem.cardIndex = cardIndex; // Update dragged item index
      }
    },
  });

  drag(drop(ref)); // Combine drag and drop refs

  return (
    <div ref={ref} className={`mb-2 ${isDragging ? "opacity-50" : ""}`}>
      <Cards
        card={card}
        onDueDateChange={onDueDateChange}
        laneIndex={laneId} // Ensure laneIndex is passed
        cardIndex={cardIndex} // Ensure cardIndex is passed
        moveCard={moveCard} // Pass the moveCard function
      />
    </div>
  );
};

export default CardWrapper;
