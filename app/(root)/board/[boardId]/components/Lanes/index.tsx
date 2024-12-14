"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import OneLane from "../OneLane";
import { useLanesByBoard } from "@/hooks/useLane";
import { useCreateLane } from "@/hooks/useLane";
import { LaneDTO as LaneType } from "@/types/datatypes";

interface LanesProps {
  boardId: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, cardId: number) => void;
  lanes: LaneType[];
}

const Lanes: React.FC<LanesProps> = ({
  boardId,
  onDueDateChange,
  moveLane,
  moveCard,
  lanes,
}) => {
  const { refetch } = useLanesByBoard(boardId);
  const { handleCreateLane, loading: creatingLane, error: createLaneError } = useCreateLane();
  const [newLaneName, setNewLaneName] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleNewLane = async () => {
    if (!newLaneName.trim()) {
      setIsInputVisible(false);
      return;
    }

    try {
      const newLane = {
        laneName: newLaneName.trim(),
        boardId: boardId,
        position: lanes.length, 
      };

      await handleCreateLane(newLane);
      setNewLaneName(""); 
      setIsInputVisible(false); 
      refetch(); 
    } catch (err) {
      console.error("Error creating lane:", err);
      alert("Failed to create lane. Please try again.");
    }
  };

  const handleBlur = () => {
    setIsInputVisible(false); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNewLane();
    }
  };

  return (
    <div className="flex gap-5 p-5 overflow-auto">
      {lanes?.map((lane: any, index: number) => (
        <OneLane
          key={lane.id}
          lane={lane}
          index={index}
          boardId={boardId}
          onDueDateChange={onDueDateChange}
          moveLane={moveLane}
          moveCard={moveCard}
          refetchLanes={refetch}
          lanes={lanes}
        />
      ))}

      {/* Add Lane Button */}
      <div className="flex flex-col gap-2 w-72 bg-white p-2 rounded-xl shadow-md">
        <button
          className="flex items-center gap-2 font-bold justify-center p-4 w-full border-dashed border-2 rounded-xl border-dspOrange text-dspOrange"
          onClick={() => setIsInputVisible(true)} 
          disabled={creatingLane}
        >
          {creatingLane ? "Creating..." : "New Lane"} <FaPlus className="text-lg" />
        </button>

        {/* Lane Input Field */}
        {isInputVisible && (
          <input
            type="text"
            className="p-2 border rounded-xl"
            placeholder="New Lane Name..."
            value={newLaneName}
            onChange={(e) => setNewLaneName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown} 
            autoFocus
          />
        )}
      </div>

      {createLaneError && (
        <p className="text-red-500 mt-2">Failed to create lane. Please try again.</p>
      )}
    </div>
  );
};

export default Lanes;
