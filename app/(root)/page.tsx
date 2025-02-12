"use client";

import { useState, useEffect } from "react";
import BoardCard from "./components/BoardCard";
import ResendVerification from "./components/ResendVerification";
import AddBoard from "./components/AddBoard";
import { useUser } from "@/hooks/useUser";
import { useBoardByUser } from "@/hooks/useBoard";
import { boards } from "@/types/datatypes";

export default function Home() {
  const { user, loading: userLoading, error: userError } = useUser();

  const userId = user?.id;
  const { boardByUser: initialBoards, loading: boardsLoading, error: boardsError } = useBoardByUser(userId);

  const [boards, setBoards] = useState(initialBoards || []);

  useEffect(() => {
    if (initialBoards) {
      setBoards(initialBoards);
    }
  }, [initialBoards]);

  const handleBoardAdded = (newBoard: any) => {
    setBoards((prevBoards: any) => [newBoard, ...prevBoards]);
  };

  if (userLoading || boardsLoading) {
    return <div className="bg-green-100 w-full p-5 mt-10 font-semibold text-center">Loading home page...</div>;
  }

  // if (userError) {
  //   return <div className="p-5 text-red-600">Failed to load user data: {userError.message}</div>;
  // }

  // if (boardsError) {
  //   return <div className="p-5 text-red-600">Failed to load boards: {boardsError.message}</div>;
  // }

  const filteredBoards = boards.filter((board: boards) =>
    board.assignees?.some((assignee: any) => assignee.status === "ACCEPTED") 
  );

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
          <AddBoard onBoardAdded={handleBoardAdded} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredBoards.length > 0 ? (
            filteredBoards.map((board: any, index: number) => (
              <BoardCard board={board} key={index} />
            ))
          ) : (
            <div className="text-center w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <p className="text-gray-500 text-lg">The board is empty.</p>
            </div>
          )}
        </div>
        {/* <hr className="border-2" />
        <div>
          <h2 className="text-3xl font-bold">Completed Project</h2>
        </div> */}
      </div>
    </div>
  );
}
