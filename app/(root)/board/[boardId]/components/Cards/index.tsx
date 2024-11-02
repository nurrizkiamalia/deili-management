import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Checklist from "../Checklist";
import DateTimePickerComponent from "../DateTimePicker";
import Label from "../Label";
import TaskAssignee from "../TaskAssignee";
import { cards } from "@/types/datatypes";

interface CardsProps {
  card: cards;
  laneIndex: number;
  cardIndex: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveCard: (fromLane: number, toLane: number, fromIndex: number, toIndex: number) => void;
}

const Cards: React.FC<CardsProps> = ({
  card,
  laneIndex,
  cardIndex,
  onDueDateChange,
  moveCard,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { laneIndex, cardIndex, cardId: card.cardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item: { laneIndex: number; cardIndex: number }) => {
      if (item.laneIndex !== laneIndex || item.cardIndex !== cardIndex) {
        moveCard(item.laneIndex, laneIndex, item.cardIndex, cardIndex); // Move the card to the new position
        item.laneIndex = laneIndex; // Update the lane index
        item.cardIndex = cardIndex; // Update the card index
      }
    },
  });

  // Combine drag and drop refs
  drag(drop(ref));

  return (
    <div
      ref={ref} // Apply the combined ref here
      className={`flex flex-col gap-2 p-2 rounded-xl border-[3px] border-dspLightGray bg-dspLightGreen ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <TaskAssignee assignee={card.assignee || []} />
      <h3 className="w-full">
        <input
          type="text"
          className="px-2 rounded-xl w-full font-bold text-lg"
          placeholder="Card Name..."
          defaultValue={card.cardName}
        />
      </h3>
      <p className="w-full">
        <textarea
          className="rounded-xl px-2 resize-none line-clamp-2"
          placeholder="Card Desc..."
          defaultValue={card.cardDesc}
        />
      </p>
      <Checklist checklist={card.checklist || []} />
      <Label labels={card.labels || []} />
      <DateTimePickerComponent
        dueDate={card.dueDate}
        onChange={(date) => onDueDateChange(card.cardId, date)}
      />
    </div>
  );
};

export default Cards;
