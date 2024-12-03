"use client";

import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import OneLane from '../OneLane';
import { useLanesByBoard } from '@/hooks/useLane';  
import { useCreateLane } from '@/hooks/useLane';  
import { LaneDTO as LaneType } from "@/types/datatypes";

interface LanesProps {
  boardId: number;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, cardId: number) => void;
  lanes: LaneType[];
}

const Lanes: React.FC<LanesProps> = ({ boardId, onDueDateChange, moveLane, moveCard, lanes }) => {
  const { refetch } = useLanesByBoard(boardId);  
  const { handleCreateLane, loading: creatingLane, error: createLaneError } = useCreateLane(); 
  const [newLaneName, setNewLaneName] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);
  

  const handleNewLane = async () => {
    if (newLaneName.trim() === '') {
      alert("Lane name cannot be empty");
      return;
    }
    
    try {
      const newLane = {
        laneName: newLaneName,
        boardId: boardId,
        position: lanes.length,  
      };

      setCreateSuccess(false); 
      await handleCreateLane(newLane);
      setNewLaneName('');  

      setCreateSuccess(true);
      refetch();
    } catch (err) {
      console.error('Error creating lane:', err);
      alert('Failed to create lane. Please try again.');
    }
  };

  // Reset success or error message after 3 seconds
  useEffect(() => {
    if (createSuccess || createLaneError) {
      const timer = setTimeout(() => {
        setCreateSuccess(false);
        if (createLaneError) {
          console.error(createLaneError); // Optionally log error if needed
        }
      }, 3000); // 3 seconds delay
      refetch();
      return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }
  }, [createSuccess, createLaneError]);
  
  useEffect(() => {
    if (lanes) {
      console.log('Fetched lanes:', lanes); // Ensure lanes are properly fetched
    }
  }, [lanes]);
  

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
      
      {/* New Lane creation */}
      <div className="w-72 h-fit bg-white p-2 rounded-xl flex flex-col gap-2 shadow-md">
        <input
          type="text"
          className="p-2 border rounded-xl"
          placeholder="Lane name"
          value={newLaneName}
          onChange={(e) => setNewLaneName(e.target.value)}
        />
        <button
          className="flex items-center gap-2 font-bold justify-center p-4 w-full border-dashed border-2 rounded-xl border-dspOrange text-dspOrange"
          onClick={handleNewLane}
          disabled={creatingLane}  
        >
          {creatingLane ? 'Creating...' : 'New Lane'} <FaPlus className="text-lg" />
        </button>

        {createSuccess && !creatingLane && (
          <p className="text-green-500 mt-2">Lane created successfully!</p>
        )}
        {createLaneError && (
          <p className="text-red-500 mt-2">Failed to create lane. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Lanes;
