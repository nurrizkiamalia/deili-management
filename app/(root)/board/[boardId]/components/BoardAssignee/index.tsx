import { BoardAssigneeTooltip } from "@/components/ui/board-assignee-tooltip";
import { JobRole } from "@/types/datatypes";

interface Assignee {
  userId: string | number;
  userName: string;
  role?: string;
  status?: string;
  jobRole?: JobRole;
}

interface BoardAssigneeProps {
  assignees: Assignee[];
}

const BoardAssignee: React.FC<BoardAssigneeProps> = ({ assignees }) => {
  return (
    <div className="">
      <div className="flex flex-row items-center  w-full">
        <BoardAssigneeTooltip items={assignees} />
      </div>
    </div>
  );
};

export default BoardAssignee;