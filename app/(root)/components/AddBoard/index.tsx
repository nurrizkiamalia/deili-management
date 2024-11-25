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

const AddBoard: React.FC = () => {
  const validationSchema = Yup.object({
    boardName: Yup.string()
      .min(3, "Board name must be at least 3 characters"),
    boardDesc: Yup.string()
      .min(10, "Board description must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      boardName: '',
      boardDesc: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Buttons>New Board <FaPlus /></Buttons>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Board Project</DialogTitle>
            <DialogDescription>
              Give title and description to your project.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-5">
            {/* Board Name Field */}
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

            {/* Board Description Field */}
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
            <Buttons type="submit">Save changes</Buttons>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBoard;