import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CardWrapper from "../CardWrapper";
import { lanes } from "@/types/datatypes";
import { IoMdMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

interface OneLaneProps {
  lane: lanes;
  index: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
}

const OneLane: React.FC<OneLaneProps> = ({ lane, index, onDueDateChange, moveLane, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "LANE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "LANE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveLane(draggedItem.index, index);
        draggedItem.index = index; // Update dragged item index after move
      }
    },
  });

  // Combine both drag and drop refs
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`w-72 bg-white p-2 rounded-xl flex flex-col gap-2 shadow-md ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex gap-3 justify-center items-center w-full bg-gray-200 p-2 rounded-xl border-[3px] border-dspLightGray">
        <div className="flex items-center justify-center text-lg font-bold w-full">
          <input
            type="text"
            placeholder="Lane Name..."
            className="h-10 hover:border hover:border-dspLightGray text-center rounded-lg min-w-10 max-w-40 bg-transparent"
            defaultValue={lane.laneName}
          />
          <p className="text-dspGray">({lane.cards?.length})</p>
        </div>
        <button className="text-3xl"><IoMdMore /></button>
      </div>
      <button className="flex items-center gap-2 font-bold justify-center p-4 w-full border-dashed border-2 rounded-xl border-dspGray">
        New Card <FaPlus className="text-lg" />
      </button>
      {lane.cards?.map((card, cardIndex) => (
        <CardWrapper
          key={card.cardId}
          card={card}
          cardIndex={cardIndex}
          laneId={lane.laneId}
          onDueDateChange={onDueDateChange}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default OneLane;
