"use client";

import { useBoardByUser } from "@/hooks/useBoard";
import NotificationCard from "./components/NotificationCard";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const Notification: React.FC = () => {
  const { user } = useUser();

  const userId = user?.id;

  const { pendingInvitations, boardByUser: initialBoards, loading, error } = useBoardByUser(userId);

  useEffect(() => {
    console.log("Pending Invitations:", pendingInvitations);
  }, [pendingInvitations]);

  if (loading) return <div>Loading invitations...</div>;
  if (error) return <div>Error loading invitations.</div>;

  return (
    <div className="flex flex-col w-full min-h-[90vh] h-full rounded-xl border-2">
      <div className="flex flex-col items-start justify-end gap-3 p-5 md:p-10 bg-white rounded-t-xl">
        <h1 className="font-bold text-4xl">Notifications</h1>
      </div>
      <hr className="border-2" />
      <div className="w-full h-full flex flex-col gap-3 md:gap-5 bg-dspLightPink p-3 md:p-5 rounded-b-xl">
        {pendingInvitations.length === 0 ? (
          <p>No pending invitations.</p>
        ) : (
          pendingInvitations.map((invitation: any, index: number) => (
            <NotificationCard
              key={index}
              boardId={invitation.id}
              boardName={invitation.boardName}
              assigneeId={userId} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
