// app/page.tsx

"use client"
import { FaPlus } from "react-icons/fa";
import Link from "next/link"; // Import Link from Next.js
import BoardCard from "./components/BoardCard";
import Buttons from "@/components/Buttons";
import { project } from "@/data/data"; // Adjust your import path

export default function Home() {
  const handleDueDateChange = (cardId: number, newDate: Date | null) => {
    console.log(`Card ID: ${cardId}, New Due Date: ${newDate}`);
  };

  return (
    <div className="flex flex-col w-full min-h-[90vh] h-full rounded-xl border-2">
      <div className="flex flex-col items-start justify-end gap-3 min-h-[150px] p-5 md:p-10 bg-white rounded-t-xl">
        <h1 className="font-bold text-4xl">Welcome Back Amalia.</h1>
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
          <Buttons>New Board <FaPlus /></Buttons>
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
