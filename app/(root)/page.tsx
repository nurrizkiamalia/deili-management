"use client";

import { FaPlus } from "react-icons/fa";
import Link from "next/link"; 
import BoardCard from "./components/BoardCard";
import Buttons from "@/components/Buttons";
import { project } from "@/data/data"; 
import ResendVerification from "./components/ResendVerification";
import { useUser } from "@/hooks/useUser";
import AddBoard from "./components/AddBoard";

export default function Home() {
  const { user, loading, error } = useUser();

  const handleDueDateChange = (cardId: number, newDate: Date | null) => {
    console.log(`Card ID: ${cardId}, New Due Date: ${newDate}`);
  };

  if (loading) {
    return <div className="bg-green-100 w-full p-5 mt-10 font-semibold text-center">Loading home page...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-600">Failed to load user data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-[90vh] h-full rounded-xl border-2">
      <div className="flex flex-col items-start justify-end gap-3 min-h-[150px] p-5 md:p-10 bg-white rounded-t-xl">
        <ResendVerification />
        <h1 className="font-bold text-4xl">Welcome Back {user?.firstName || "User"}.</h1>
        <div className="flex items-center gap-2">
          <p className="text-dspGray">
            Create your board or check your task list here.
          </p>
        </div>
      </div>
      <hr className="border-2" />
      <div className="w-full h-full flex flex-col gap-5 md:gap-10 bg-dspLightPink p-5 md:p-10 rounded-b-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Board..."
            className="p-2 border-2 border-dspLightGray rounded-xl w-full sm:w-60 text-dspDarkGray hover:shadow-md"
          />
          <AddBoard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {project.map((board) => (
            <Link key={board.boardId} href={`/board/${board.boardId}`}>
              <BoardCard board={board} onDueDateChange={handleDueDateChange} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
