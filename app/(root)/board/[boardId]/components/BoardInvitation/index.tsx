"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { INVITE_USER_TO_BOARD } from "@/graphql/mutation/boardMutation";
import Buttons from "@/components/Buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiUserAddLine } from "react-icons/ri";
import FindByEmail from "../FindByEmail";

interface BoardInvitationProps {
  boardId: number;
}

const BoardInvitation: React.FC<BoardInvitationProps> = ({ boardId }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

  const [open, setOpen] = useState(false);

  const [inviteUserToBoard, { loading, error }] = useMutation(INVITE_USER_TO_BOARD);

  const handleEmailSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleInvite = async () => {
    if (!selectedUserId || !selectedRole) {
      alert("Please select an email and role.");
      return;
    }

    try {
      const response = await inviteUserToBoard({
        variables: {
          boardId,
          userId: selectedUserId,  
          role: selectedRole,
        },
      });

      if (response.data?.inviteUserToBoard) {
        alert("Invitation sent!");
        setOpen(false); 
      } else {
        alert("Failed to send invitation.");
      }
    } catch (err) {
      console.error("Failed to send invitation:", err);
      alert("Failed to send invitation.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Buttons>
          Invite <RiUserAddLine />
        </Buttons>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite member to this board</DialogTitle>
          <DialogDescription>
            Find your member and invite them. Determine their role here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Find by Email</h3>
            <FindByEmail onSelect={handleEmailSelect} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Board Assignee Role</h3>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select member role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Assignee Role</SelectLabel>
                  <SelectItem value="OWNER">OWNER</SelectItem>
                  <SelectItem value="EDITOR">EDITOR</SelectItem>
                  <SelectItem value="READ-ONLY">READ-ONLY</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Buttons type="button" onClick={handleInvite} disabled={loading}>
            {loading ? "Sending..." : "Send Invitation"}
          </Buttons>
          {error && <div className="text-red-500">Error: {error.message}</div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoardInvitation;
