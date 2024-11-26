"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import { FaPlus } from "react-icons/fa";
import { useCreateBoard } from "@/hooks/useBoard";
import { useSession } from "next-auth/react";
import { useState } from 'react';

interface AddBoardProps {
  onBoardAdded: (newBoard: any) => void;
}

const AddBoard: React.FC<AddBoardProps> = ({ onBoardAdded }) => {
  const { data: session } = useSession();
  const { handleCreateBoard, loading, error } = useCreateBoard();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validationSchema = Yup.object({
    boardName: Yup.string()
      .min(3, "Board name must be at least 3 characters")
      .required("Board name is required"),
    boardDesc: Yup.string()
      .min(10, "Board description must be at least 10 characters")
      .required("Board description is required"),
  });

  const formik = useFormik({
    initialValues: {
      boardName: '',
      boardDesc: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!session?.user?.id) {
        alert("User not logged in");
        return;
      }

      try {
        const boardRequestDto = {
          boardName: values.boardName,
          boardDesc: values.boardDesc,
          isComplete: false,
          userId: session.user.id,
        };
        
        const response = await handleCreateBoard(boardRequestDto);
        onBoardAdded(response.createBoard);
        alert("Board created successfully!");
        resetForm();
        setIsDialogOpen(false);
      } catch (err) {
        console.error("Error creating board:", err);
        alert("Failed to create board. Please try again.");
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Buttons>New Board <FaPlus /></Buttons>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Board Project</DialogTitle>
            <DialogDescription>
              Provide a title and description for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-5">
            <div>
              <label htmlFor="boardName" className="block text-sm font-medium text-gray-700">
                Board Name
              </label>
              <input
                type="text"
                id="boardName"
                name="boardName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.boardName}
                className={`mt-1 p-2 block w-full border ${
                  formik.touched.boardName && formik.errors.boardName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
              />
              {formik.touched.boardName && formik.errors.boardName && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.boardName}</p>
              )}
            </div>

            <div>
              <label htmlFor="boardDesc" className="block text-sm font-medium text-gray-700">
                Board Description
              </label>
              <textarea
                id="boardDesc"
                name="boardDesc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.boardDesc}
                className={`mt-1 p-2 block w-full border ${
                  formik.touched.boardDesc && formik.errors.boardDesc
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
              />
              {formik.touched.boardDesc && formik.errors.boardDesc && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.boardDesc}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Buttons type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Buttons>
          </DialogFooter>
        </form>
        {error && (
          <p className="mt-2 text-red-500 text-sm">Error: {error.message}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddBoard;