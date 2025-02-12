import React, { useState } from "react";
import {
  useGetLabelsByCard,
  useAddLabelToCard,
  useRemoveLabel,
  useUpdateLabel,
} from "@/hooks/useCardContent";

interface LabelProps {
  cardId: number;
}

const Label: React.FC<LabelProps> = ({ cardId }) => {
  const { labels, loading, error, refetch } = useGetLabelsByCard(cardId);
  const { handleAddLabelToCard } = useAddLabelToCard();
  const { handleRemoveLabel } = useRemoveLabel();
  const { handleUpdateLabel } = useUpdateLabel();
  const [newLabel, setNewLabel] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddLabel = async () => {
    if (!newLabel.trim()) return;
    try {
      await handleAddLabelToCard({ cardId, labelName: newLabel });
      setNewLabel("");
      refetch();
    } catch (err) {
      console.error("Failed to add label:", err);
    }
  };

  const handleUpdateLabelContent = async (
    labelId: number,
    oldLabelName: string,
    newLabelName: string
  ) => {
    if (!newLabelName.trim() || oldLabelName === newLabelName) {
      console.log("No changes detected. Update skipped.");
      return;
    }

    try {
      await handleUpdateLabel({ labelId, labelName: newLabelName });
      refetch();
    } catch (err) {
      console.error("Failed to update label:", err);
    }
  };

  const handleDeleteLabel = async (labelId: number) => {
    try {
      await handleRemoveLabel(labelId);
      refetch();
    } catch (err) {
      console.error("Failed to remove label:", err);
    }
  };

  if (loading) return <p>Loading labels...</p>;
  if (error) return <p>Error loading labels.</p>;

  const totalLabelItems = labels.reduce(
    (acc: number, label: any) => acc + (label.labelItems?.length || 0),
    0
  );

  return (
    <div
      className="flex flex-wrap px-2 gap-2 items-center"
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      {/* Render existing labels */}
      {labels.map((label: any) => (
        <div key={label.id} className="flex items-center gap-2 pt-2">
          {label.labelItems.map((item: any) => (
            <div
              key={item.id}
              className="bg-orange-300 px-2 py-1 rounded-xl font-bold text-sm flex items-center gap-2"
            >
              <span
                className="text-sm text-dspBlack focus:outline-none whitespace-nowrap"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleUpdateLabelContent(
                    item.id,
                    item.labelName,
                    e.currentTarget.textContent || ""
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
              >
                {item.labelName}
              </span>
              <button
                onClick={() => handleDeleteLabel(item.id)}
                className="ml-2 text-red-500 text-xs font-bold"
              >
                x
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* Add Label Input */}
      <div
        className={`flex transition-all duration-500 ease-in-out ${
          isFocused || totalLabelItems === 0
            ? "opacity-100 max-h-44 py-1"
            : "opacity-0 max-h-0"
        }`}
      >
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Add label..."
          onBlur={handleAddLabel}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddLabel();
            }
          }}
          className="px-2 py-1 border rounded-full text-sm w-full max-w-[150px]"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Label;
