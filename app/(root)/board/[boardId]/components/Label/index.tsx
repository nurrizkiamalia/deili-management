import React from "react";
import { labels } from "@/types/datatypes";

interface LabelProps {
  labels: labels[];
}

const Label: React.FC<LabelProps> = ({ labels }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <div
          key={label.labelId}
          className="bg-orange-300 px-2 py-1 rounded-xl inline-block font-bold text-sm"
          contentEditable
          suppressContentEditableWarning={true}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {label.labelName}
        </div>
      ))}
    </div>
  );
};

export default Label;
