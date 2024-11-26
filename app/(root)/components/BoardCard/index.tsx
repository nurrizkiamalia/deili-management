"use client";

import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { BoardCardProps } from "@/types/graphql";
import { useDeleteBoard, useUpdateBoard } from "@/hooks/useBoard";
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/AlertDialog";

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { handleDeleteBoard } = useDeleteBoard();
  const { handleToggleCompletion } = useUpdateBoard();
  const router = useRouter();

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const confirmDelete = () => setIsAlertOpen(true);

  const deleteBoard = async () => {
    try {
      await handleDeleteBoard(board.id);
      alert("Board deleted successfully!");
      setIsAlertOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete board:", error);
      alert("Failed to delete board. Please try again.");
    }
  };

  const toggleCompletion = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await handleToggleCompletion(board.id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to toggle board completion:", error);
      alert("Failed to toggle board completion. Please try again.");
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/board/${board.id}`);
  };

  return (
    <div
      className="relative bg-white shadow-md border hover:shadow-xl transition-all duration-500 rounded-xl flex flex-col gap-2 p-3 text-xl"
      onMouseLeave={closeMenu}
    >
      <div className="flex justify-between items-center w-full">
        {board.isComplete && (
          <p className="bg-green-200 py-1 px-3 rounded-full text-sm font-semibold">
            Completed
          </p>
        )}
        <div className="w-full flex justify-end">
          <button
            className="relative p-1 rounded-full bg-dspOrange text-white z-10 hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <MdMoreVert />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="absolute top-8 right-0 bg-white border shadow-md rounded-md w-40 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={toggleCompletion}
          >
            {board.isComplete ? "Reopen Project" : "Mark as Completed"}
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            onClick={confirmDelete}
          >
            Delete Board
          </button>
        </div>
      )}

      <h3
        onClick={handleTitleClick}
        className="font-bold line-clamp-1 hover:text-dspOrange cursor-alias"
      >
        {board.boardName}
      </h3>
      <p className="text-lg line-clamp-2">{board.boardDesc}</p>

      <AlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Delete Board"
        description="Are you sure you want to delete this board? This action cannot be undone."
        actionLabel="Delete"
        onAction={deleteBoard}
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default BoardCard;
