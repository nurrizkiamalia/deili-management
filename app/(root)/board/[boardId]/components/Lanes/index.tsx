import OneLane from "../OneLane";
import { lanes } from "@/types/datatypes";

interface LanesProps {
  lanes: lanes[];
  onDueDateChange: (cardId: number, newDate: Date | null) => void;
  moveLane: (fromIndex: number, toIndex: number) => void;
  moveCard: (fromLaneId: number, toLaneId: number, cardId: number) => void;
}

const Lanes: React.FC<LanesProps> = ({ lanes, onDueDateChange, moveLane, moveCard }) => {
  return (
    <div className="flex gap-5 p-5">
      {lanes.map((lane, index) => (
        <OneLane
          key={lane.laneId}
          lane={lane}
          index={index}
          onDueDateChange={onDueDateChange}
          moveLane={moveLane}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default Lanes;
