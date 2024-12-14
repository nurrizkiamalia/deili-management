import React, { useRef, useState } from "react";
import {
  MdOutlineCheckCircle,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import {
  useGetChecklistsByCard,
  useAddChecklistItem,
  useUpdateChecklistItem,
  useToggleChecklistItem,
} from "@/hooks/useCardContent";

interface ChecklistProps {
  cardId: number;
}

const Checklist: React.FC<ChecklistProps> = ({ cardId }) => {
  const { checklists, loading, error } = useGetChecklistsByCard(cardId); 
  const { handleAddChecklistItem } = useAddChecklistItem();
  const { handleUpdateChecklistItem } = useUpdateChecklistItem();
  const { handleToggleChecklistItem } = useToggleChecklistItem();
  const [localChecklists, setLocalChecklists] = useState(checklists || []);
  const [newItemContent, setNewItemContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setLocalChecklists(checklists);
  }, [checklists]);

  if (loading) return <p>Loading checklist...</p>;
  if (error) return <p>Error loading checklist.</p>;

  const handleAddItem = async () => {
    if (!newItemContent.trim()) return;
    try {
      const addedItem = await handleAddChecklistItem({ cardId, content: newItemContent });
      setNewItemContent("");

      setLocalChecklists((prev: any) =>
        prev.map((checklist: any) => {
          if (checklist.id === addedItem.checklistId) {
            return {
              ...checklist,
              checklistItems: [...checklist.checklistItems, addedItem],
            };
          }
          return checklist;
        })
      );

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (err) {
      console.error("Failed to add checklist item:", err);
    }
  };

  const handleToggleItem = async (itemId: number) => {
    try {
      const toggledItem = await handleToggleChecklistItem(itemId);
      setLocalChecklists((prev: any) =>
        prev.map((checklist: any) => ({
          ...checklist,
          checklistItems: checklist.checklistItems.map((item: any) =>
            item.id === itemId ? { ...item, status: toggledItem.status } : item
          ),
        }))
      );
    } catch (err) {
      console.error("Failed to toggle checklist item:", err);
    }
  };

  const handleUpdateItem = async (itemId: number, oldContent: string, newContent: string) => {
    if (!newContent.trim() || oldContent === newContent) return;
    try {
      const updatedItem = await handleUpdateChecklistItem({
        checklistItemId: itemId,
        content: newContent,
        status: false,
      });
      setLocalChecklists((prev: any) =>
        prev.map((checklist: any) => ({
          ...checklist,
          checklistItems: checklist.checklistItems.map((item: any) =>
            item.id === itemId ? { ...item, content: updatedItem.content } : item
          ),
        }))
      );
    } catch (err) {
      console.error("Failed to update checklist item:", err);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {localChecklists.map((checklist: any) => (
        <div
          key={checklist.id}
          className={` ${
            checklist.checklistItems.length === 0 ? "hidden" : "p-2"
          }`}
        >
          {checklist.checklistItems?.map((item: any) => (
            <div key={item.id} className="flex gap-1 items-start">
              <button className="mt-1" onClick={() => handleToggleItem(item.id)}>
                {item.status ? (
                  <MdOutlineCheckCircle className="text-green-500" />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
              </button>
              <div
                contentEditable
                suppressContentEditableWarning={true}
                className={`px-2 rounded-xl w-full hover:border-dspLightGray border-2 border-transparent ${
                  item.status ? "line-through text-dspGray" : "font-semibold text-dspDarkGray"
                } focus:outline-none`}
                onBlur={(e) =>
                  handleUpdateItem(item.id, item.content, e.currentTarget.textContent || "")
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
              >
                {item.content}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="flex items-start px-2 pb-2 gap-1">
        <button className="mt-1">
          <MdOutlineRadioButtonUnchecked />
        </button>
        <input
          type="text"
          ref={inputRef}
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          placeholder="Add checklist item..."
          onBlur={handleAddItem}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
          className="px-2 py-1 border rounded-full text-sm w-full max-w-[200px]"
        />
      </div>
    </div>
  );
};

export default Checklist;