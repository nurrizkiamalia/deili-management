import React from "react";
import { MdOutlineCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { checklistItem } from "@/types/datatypes";

interface ChecklistProps {
  checklist: checklistItem[];
}

const Checklist: React.FC<ChecklistProps> = ({ checklist }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {checklist.map((item) => (
        <div key={item.checklistId} className="flex gap-1 items-start">
          <button className="mt-1">
            {item.checklistCond ? <MdOutlineCheckCircle /> : <MdOutlineRadioButtonUnchecked />}
          </button>
          <div
            contentEditable
            suppressContentEditableWarning={true}
            className={`px-2 rounded-xl w-full hover:border-dspLightGray border-2 border-transparent ${item.checklistCond ? "line-through text-dspGray" : ""} focus:outline-none`}
          >
            {item.checklistText}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
