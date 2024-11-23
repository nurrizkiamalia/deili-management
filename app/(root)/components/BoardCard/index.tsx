import { MdMoreVert } from "react-icons/md";
import { boards } from "@/types/datatypes";

interface BoardCardProps {
  board: boards;
  onDueDateChange: (cardId: number, newDate: Date | null) => void; // New prop
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onDueDateChange }) => {
  return (
    <div className="bg-white shadow-md border hover:shadow-xl transition-all duration-500 rounded-xl flex flex-col gap-2 p-3 text-xl cursor-alias">
      <button className="self-end">
        <MdMoreVert />
      </button>
      <h3 className="font-bold">{board.boardName}</h3>
      <p className="text-lg line-clamp-2">{board.boardDesc}</p>
    </div>
  );
};

export default BoardCard;