

import Buttons from "@/components/Buttons";
import { RiUserAddLine, RiShareForwardLine } from "react-icons/ri";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Lanes from "../Lanes";
import { boards } from "@/types/datatypes";

interface BoardProps {
  board: boards;
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, cardId: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onDueDateChange, moveLane, moveCard }) => {
  return (
    <div className="flex flex-col w-full min-h-[90vh] h-full rounded-xl border-2">
      <div className="flex flex-col w-full h-full bg-white rounded-t-xl">
        <div className="flex justify-between items-end h-full min-h-[150px] p-5 md:p-10 ">
          <div className="flex flex-col items-start justify-end gap-3">
            <h1 className="font-bold text-2xl">{board.boardName || "Project"}</h1>
            <p className="text-dspGray">
              {board.boardDesc || "Internal Project Efficiency"}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-end justify-end h-full">
            <div className="flex flex-row items-center justify-center w-full">
              <AnimatedTooltip items={[]} />
            </div>
            <div className="flex items-center gap-3 font-bold self-end">
              <Buttons>
                Invite <RiUserAddLine />
              </Buttons>
              <Buttons>
                <RiShareForwardLine className="text-2xl" />
              </Buttons>
            </div>
          </div>
        </div>
        <div className="px-5 md:px-10 pb-5">
          <p className="font-bold text-dspGray">Boards</p>
          <hr className="w-20 border-2 border-black" />
        </div>
      </div>
      <hr className="border-2" />
      <div className="w-full h-full">
        {board.lanes ? (
          <Lanes lanes={board.lanes} onDueDateChange={onDueDateChange} moveLane={moveLane} moveCard={moveCard} />
        ) : (
          <p>No lanes available</p>
        )}
      </div>
    </div>
  );
};

export default Board;
