"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { LaneDTO as LaneType } from "@/types/datatypes";
import { useDeleteLane, useUpdateLane } from "@/hooks/useLane";
import { useDrag, useDrop } from "react-dnd";
import AlertDialog from "@/components/AlertDialog";

interface OneLaneProps {
  lane: LaneType;
  index: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, fromIndex: number, toIndex: number) => void;
  refetchLanes: () => void;
  boardId: number;
  lanes: LaneType[];
}

const OneLane: React.FC<OneLaneProps> = ({
  lane,
  index,
  onDueDateChange,
  moveLane,
  moveCard,
  refetchLanes,
  boardId,
  lanes
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [updatedLaneName, setUpdatedLaneName] = useState(lane.laneName);

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

  const closeMenu = () => setIsMenuOpen(false);

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

  useEffect(() => {
    setUpdatedLaneName(lane.laneName);
  }, [lane.laneName]);

  return (
    <div
      ref={ref}
      className={`w-72 bg-white p-2 rounded-xl flex flex-col gap-2 shadow-md ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex gap-3 justify-center items-center w-full bg-gray-200 p-2 rounded-xl border-[3px] border-dspLightGray ">
        <div className="flex items-center justify-center text-lg font-bold w-full">
          <input
            type="text"
            placeholder="Lane Name..."
            className="h-10 hover:border hover:border-dspLightGray text-center rounded-lg min-w-10 max-w-40 bg-transparent"
            value={updatedLaneName} 
            onChange={handleLaneNameChange} 
            onKeyDown={handleKeyDown} 
          />
          <p className="text-dspGray">(0)</p>
        </div>
        <button className="text-3xl" onClick={toggleMenu}>
          <IoMdMore />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="absolute top-16 right-0 bg-white border shadow-md rounded-md w-40 z-50"
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

      <button className="flex items-center gap-2 font-bold justify-center p-4 w-full border-dashed border-2 rounded-xl border-dspGray">
        New Card <FaPlus className="text-lg" />
      </button>

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
