"use client";

import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CardDto } from "@/types/datatypes";
import { useCardsByLane, useUpdateCard } from "@/hooks/useCard";
import { useGetLabelsByCard, useGetChecklistsByCard } from "@/hooks/useCardContent";
import CardAssignee from "../CardAssignee";
import Label from "../Label";
import Checklist from "../Checklist";
import DateTimePickerComponent from "../DateTimePicker";
import { useLanesandCardByBoard } from "@/hooks/useLane";

interface CardsProps {
  card: CardDto;
  laneId: number;
  boardId: number;
  laneIndex: number;
  cardIndex: number;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
}

const Cards: React.FC<CardsProps> = ({ card, boardId, laneIndex, cardIndex, moveCard, laneId }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { refetch: refetchLanesCard } = useLanesandCardByBoard(boardId);
  const [cardName, setCardName] = useState(card.cardName);
  const [cardDesc, setCardDesc] = useState(card.cardDesc);
  const [isHovered, setIsHovered] = useState(false);
  const { handleUpdateCard, loading: updatingCard, error: updateError } = useUpdateCard();
  const {  refetch: refetchCards } = useCardsByLane(laneId);

  const { labels, loading: labelsLoading, error: labelsError } = useGetLabelsByCard(card.id);
  const { checklists, loading: checklistsLoading, error: checklistsError } = useGetChecklistsByCard(card.id);

  const initialCardName = card.cardName;
  const initialCardDesc = card.cardDesc;

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { laneIndex, cardIndex, cardId: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item: { laneIndex: number; cardIndex: number }) => {
      if (item.laneIndex !== laneIndex || item.cardIndex !== cardIndex) {
        moveCard(item.laneIndex, laneIndex, item.cardIndex, cardIndex);
        item.laneIndex = laneIndex;
        item.cardIndex = cardIndex;
        refetchCards();
        refetchLanesCard();
      }
    },
  });

  drag(drop(ref));

  const handleCardNameUpdate = async () => {
    if (cardName !== initialCardName || cardDesc !== initialCardDesc) {
      try {
        await handleUpdateCard({
          cardId: card.id,
          cardName,
          cardDesc,
          laneId: card.laneId,
        });
      } catch (err) {
        console.error("Failed to update card name:", err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCardNameUpdate();
    }
  };

  const handleBlur = () => {
    handleCardNameUpdate();
  };

  const shouldShowDesc = isHovered || cardDesc?.trim().length > 0;
  const shouldShowLabel = isHovered || labels.reduce(
    (acc: number, label: any) => acc + (label.labelItems?.length || 0),
    0
  );
  const shouldShowChecklist = isHovered || (checklists && checklists.length > 0);

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-1 p-2 rounded-xl border-[3px] border-dspLightGray bg-dspLightGreen hover:shadow-lg focus:shadow-md transition-all duration-300 ${
        isDragging ? "opacity-50" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="">
        <CardAssignee cardId={card.id} boardId={boardId} />
      </div>

      <h3 className="w-full">
        <input
          type="text"
          className="px-2 rounded-xl w-full font-extrabold text-lg"
          placeholder="Card Name..."
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={updatingCard}
        />
      </h3>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          shouldShowDesc ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        }`}
      >
        <p className="w-full px-1 pt-1 max-h-[250px]">
          <textarea
            minLength={50}
            maxLength={150}
            rows={2}
            aria-rowspan={3}
            className="rounded-xl px-1 h-full max-h-[250px] resize-none scrollbar-none w-full"
            placeholder="Card Desc..."
            value={cardDesc}
            onChange={(e) => setCardDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={updatingCard}
          />
        </p>
      </div>

      {!checklistsLoading && !checklistsError && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            shouldShowChecklist ? "opacity-100 max-h-44 pt-1" : "opacity-0 max-h-0"
          }`}
        >
          <Checklist cardId={card.id} />
        </div>
      )}

      {!labelsLoading && !labelsError && (
        <div
          className={`overflow-hidden pt-1 transition-all duration-500 ease-in-out ${
            shouldShowLabel ? "opacity-100 max-h-44" : "opacity-0 max-h-0"
          }`}
        >
          <Label cardId={card.id} />
        </div>
      )}

      <div className="px-2">
        <DateTimePickerComponent cardId={card.id} />
      </div>

      {updateError && <p className="text-red-500">Failed to update card. Please try again.</p>}
    </div>
  );
};

export default Cards;
