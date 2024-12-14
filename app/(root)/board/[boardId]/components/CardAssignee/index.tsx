import React, { useState } from "react";
import { useGetAssigneesByCard, useAddAssigneeToCard } from "@/hooks/useCardContent";
import { useBoardById } from "@/hooks/useBoard";
import { MdOutlinePeople } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BoardAssigneeTooltip } from "@/components/ui/board-assignee-tooltip";

interface CardAssigneeProps {
  cardId: number;
  boardId: number;
}

const CardAssignee: React.FC<CardAssigneeProps> = ({ cardId, boardId }) => {
  const { assignees, refetch, loading: cardLoading, error: cardError } = useGetAssigneesByCard(cardId);
  const { board, loading: boardLoading, error: boardError } = useBoardById(boardId);
  const { handleAddAssigneeToCard, loading: addingAssignee } = useAddAssigneeToCard();

  const [searchQuery, setSearchQuery] = useState("");

  if (cardLoading || boardLoading) return <div>Loading...</div>;
  if (cardError || boardError) return <div>Error loading assignees.</div>;

  const boardAssignees = board?.assignees || [];

  const filteredAssignees = boardAssignees.filter((assignee: any) => {
    const query = searchQuery.toLowerCase();
    return (
      assignee.userName.toLowerCase().includes(query) ||
      assignee.email.toLowerCase().includes(query) ||
      assignee.jobRole?.title?.toLowerCase().includes(query)
    );
  });

  const handleAddAssignee = async (userId: number) => {
    try {
      await handleAddAssigneeToCard({ cardId, userId });
      await refetch(); 
    } catch (err) {
      console.error("Failed to add assignee:", err);
    }
  };

  return (
    <div className="flex items-center justify-between w-full pt-3 px-2">
      <div className="flex flex-row items-center w-full">
        <BoardAssigneeTooltip
          items={assignees.map((assignee: any) => ({
            userId: assignee.userId,
            userName: assignee.username,
            jobRole: assignee.jobRole || "Jobrole",
          }))}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="bg-dspOrange hover:bg-orange-200 hover:text-dspOrange text-white p-1 rounded-full border-4 border-orange-400 hover:scale-105 text-lg transition-all duration-300"
            disabled={addingAssignee}
          >
            <MdOutlinePeople />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4">
          <input
            type="text"
            placeholder="Search by username, email, or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
          />
          <div className="flex flex-col gap-2">
            {filteredAssignees.map((assignee: any) => (
              <div
                key={assignee.userId}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAddAssignee(assignee.userId)}
              >
                <div className="text-sm">
                  {assignee.userName} 
                </div>
                <div className="text-xs text-gray-500">{assignee.jobRole?.title}</div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CardAssignee;
