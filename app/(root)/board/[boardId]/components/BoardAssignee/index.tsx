import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface Assignee {
  userId: string | number;
  userName: string;
  role: string;
  status?: string;
}

interface BoardAssigneeProps {
  assignees: Assignee[];
}

const BoardAssignee: React.FC<BoardAssigneeProps> = ({ assignees }) => {
  return (
    <div className="m-5 !mt-0 md:mb-10 md:mx-10">
      <div className="flex flex-row items-center  w-full">
        <AnimatedTooltip items={assignees} />
      </div>
    </div>
  );
};

export default BoardAssignee;