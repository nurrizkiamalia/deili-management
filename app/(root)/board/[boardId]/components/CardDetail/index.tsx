import Buttons from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cards } from "@/types/datatypes";
import { TbEdit } from "react-icons/tb";

interface CardDetailProps {
    card: cards;
}

const CardDetail: React.FC<CardDetailProps> = ({card}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <TbEdit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Card Detail</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h4 className="font-bold">Card Name</h4>
            <p>{card.cardName}</p>
          </div>
          <div>
            <h4 className="font-bold">Description</h4>
            <p>{card.cardDesc}</p>
          </div>
          <div>
            <h4 className="font-bold">Due Date</h4>
            <p>{card.dueDate?.toString() || "No due date"}</p>
          </div>
          <div>
            <h4 className="font-bold">Checklist</h4>
            <ul>
              {card.checklist?.map((item, index) => (
                <li key={index}>{item.checklistText}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Labels</h4>
            <ul>
              {card.labels?.map((label, index) => (
                <li key={index}>{label.labelName}</li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export default CardDetail;