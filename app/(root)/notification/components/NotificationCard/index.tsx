"use client";

import { useState } from "react";
import { useRespondToInvitation } from "@/hooks/useBoard"; 
import Buttons from "@/components/Buttons";
import { useRouter } from "next/navigation";

const NotificationCard: React.FC<{ boardId: number, boardName: string, assigneeId: number }> = ({ boardId, boardName, assigneeId }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { handleRespondToInvitation } = useRespondToInvitation();

  const handleResponse = async (accept: boolean) => {
    setLoading(true);
    try {
      await handleRespondToInvitation(boardId, assigneeId, accept);
      setAlertMessage(accept ? "You have accepted the invitation!" : "You have rejected the invitation.");
      router.push(`/board/${boardId}`)
    } catch (error) {
      setAlertMessage("Failed to update invitation status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-3 md:p-5 flex flex-col gap-5 border-2 shadow-md rounded-xl bg-dspLightGreen">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl md:text-2xl">Project Board Invitation</h2>
        <p>You are invited to join project board <strong>{boardName}</strong>. Do you accept to join?</p>
      </div>

      <div className="flex items-center gap-5">
        <Buttons
          className=""
          onClick={() => handleResponse(true)}
          disabled={loading}
        >
          {loading ? 'Accepting...' : 'Accept'}
        </Buttons>
        <button
          className="text-dspOrange font-semibold hover:scale-105 transition-all duration-300"
          onClick={() => handleResponse(false)}
          disabled={loading}
        >
          {loading ? 'Rejecting...' : 'Decline'}
        </button>
      </div>

      {alertMessage && (
        <div
          className={`mt-4 p-4 text-center rounded-md ${
            alertMessage.includes("accepted")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
