import { useSession } from "next-auth/react";
import { boards } from "@/types/datatypes";
import { useUser } from "@/hooks/useUser";

const NotificationCount: React.FC<{ boards: boards[] }> = ({ boards }) => {
  const { data: session } = useSession();
  const { user } = useUser();

  const userId = user?.id || session?.user?.id;  

  const countPendingAssignees = (boards: boards[]): number => {
    if (!boards || boards.length === 0) {
      return 0;
    }
    return boards.reduce((count, board) => {
      if (!board.assignees) {
        return count;
      }
      const normalizedUserId = String(userId);
      const userPendingAssignees = board.assignees.filter(
        (assignee) => assignee.status === "PENDING" && String(assignee.userId) === normalizedUserId
      );
      return count + userPendingAssignees.length;
    }, 0); 
  };

  const pendingCount = countPendingAssignees(boards);

  if (!session || pendingCount <= 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 -left-2 text-xs bg-dspOrange px-1 rounded-xl text-white">
      {pendingCount}
    </span>
  );
};

export default NotificationCount;