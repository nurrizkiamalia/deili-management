import React from "react";
import { assignee } from "@/types/datatypes";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface TaskAssigneeProps {
  assignee: assignee[];
}

const TaskAssignee: React.FC<TaskAssigneeProps> = ({ assignee }) => {
  const formattedAssignees = assignee.map((item) => ({
    id: item.assigneeId,
    name: item.assigneeName,
    designation: item.assigneeRole,
    image: item.assigneeImage || "",
  }));

  return (
    <div className="flex flex-row items-center justify-start w-full">
      <AnimatedTooltip items={formattedAssignees} />
    </div>
  );
};

export default TaskAssignee;
