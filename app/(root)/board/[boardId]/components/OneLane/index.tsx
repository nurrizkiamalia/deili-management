"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { LaneandCards, LaneDTO as LaneType } from "@/types/datatypes";
import { useDeleteLane, useUpdateLane } from "@/hooks/useLane";
import { useCreateCard, useCardsByLane } from "@/hooks/useCard";
import { useDrag, useDrop } from "react-dnd";
import AlertDialog from "@/components/AlertDialog";
import CardWrapper from "../CardWrapper";

interface OneLaneProps {
  lane: LaneType;
  index: number;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
  refetchLanes: () => void;
  boardId: number;
  lanes: LaneandCards[];
}

const OneLane: React.FC<OneLaneProps> = ({
  lane,
  index,
  moveLane,
  moveCard,
  refetchLanes,
  boardId,
  lanes,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [updatedLaneName, setUpdatedLaneName] = useState(lane.laneName);
  const [newCardName, setNewCardName] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false); 

  const { handleCreateCard, loading: creatingCard, error: createCardError } = useCreateCard();
  const { cards, loading: loadingCards, refetch: refetchCards } = useCardsByLane(lane.id);
  const { handleDeleteLane } = useDeleteLane();
  const { handleUpdateLane } = useUpdateLane();

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
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const confirmDelete = () => setIsAlertOpen(true);

  const deleteLane = async () => {
    try {
      await handleDeleteLane(lane.id);
      alert("Lane deleted successfully!");
      setIsAlertOpen(false);
      refetchLanes();
    } catch (error) {
      console.error("Failed to delete lane:", error);
      alert("Failed to delete lane. Please try again.");
    }
  };

  const handleLaneNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedLaneName(event.target.value);
  };

  const handleLaneNameUpdate = async () => {
    try {
      await handleUpdateLane({
        laneId: lane.id,
        laneName: updatedLaneName,
        boardId: lane.boardId,
        position: lane.position,
      });
      refetchLanes();
    } catch (error) {
      console.error("Error updating lane:", error);
      alert("Failed to update lane. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLaneNameUpdate();
    }
  };

  const handleNewCard = async () => {
    if (newCardName.trim() === "") {
      alert("Card name cannot be empty.");
      return;
    }

    try {
      await handleCreateCard({
        cardName: newCardName,
        cardDesc: "",
        laneId: lane.id,
      });
      setNewCardName("");
      setIsInputVisible(false); 
      refetchCards();
    } catch (err) {
      console.error("Failed to create card:", err);
      alert("Failed to create card. Please try again.");
    }
  };

  const handleBlur = () => {
      setIsInputVisible(false); 
  };

  useEffect(() => {
    setUpdatedLaneName(lane.laneName);
  }, [lane.laneName]);

  return (
    <div
      ref={ref}
      className={`w-72 relative bg-white p-2 rounded-xl flex flex-col gap-2 shadow-md ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex gap-3 justify-center items-center w-full bg-gray-200 p-2 rounded-xl border-[3px] border-dspLightGray">
        <div className="flex items-center justify-center text-lg font-bold w-full">
          <input
            type="text"
            placeholder="Lane Name..."
            className="h-10 hover:border hover:border-dspLightGray text-center rounded-lg min-w-10 max-w-40 bg-transparent"
            value={updatedLaneName}
            onChange={handleLaneNameChange}
            onKeyDown={handleKeyDown}
          />
          <p className="text-dspGray">({cards.length})</p>
        </div>
        <button className="text-3xl" onClick={toggleMenu}>
          <IoMdMore />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="absolute top-14 right-0 bg-white border shadow-md rounded-md w-40 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            onClick={confirmDelete}
          >
            Delete Lane
          </button>
        </div>
      )}

      {/* Add Card Button */}
      <div className="flex flex-col gap-2">
        <button
          className="flex items-center gap-2 font-bold justify-center p-4 w-full border-dashed border-2 rounded-xl border-dspGray"
          onClick={() => setIsInputVisible(true)}  
          disabled={creatingCard}
        >
          {creatingCard ? "Creating..." : "Add Card"} <FaPlus className="text-lg" />
        </button>

        {/* Card Input Field */}
        {isInputVisible && (
          <input
            type="text"
            className="p-2 border rounded-xl"
            placeholder="New Card Name..."
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            onBlur={handleBlur}  
            onKeyDown={(e) => e.key === "Enter" && handleNewCard()} 
            autoFocus
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {loadingCards ? (
          <p>Loading cards...</p>
        ) : (
          cards.map((card: any, cardindex: number) => (
            <CardWrapper
              key={card.id}
              card={card}
              cardIndex={cardindex}
              laneId={lane.id}
              moveCard={moveCard}
              boardId={boardId}
              lanes={lanes}
            />
          ))
        )}
      </div>

      {createCardError && <p className="text-red-500 mt-2">Failed to create card. Please try again.</p>}

      <AlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Delete Lane"
        description="Are you sure you want to delete this lane? This action cannot be undone."
        actionLabel="Delete"
        onAction={deleteLane}
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default OneLane;