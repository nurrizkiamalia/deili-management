"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Buttons from "@/components/Buttons";
import { usePasswordReset } from "@/hooks/useUser";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface ResetPasswordProps {
  email: string;
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({
  email,
  token,
}) => {
  const { resetPassword } = usePasswordReset();
  const [loading, setLoading] = useState(false);
  const labelStyle = "text-dspDarkGray font-semibold";
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (values: { password: string }) => {
    setLoading(true);
    try {
      await resetPassword(email, token, values.password);
      alert("Password reset successful!");
      router.push('/login')
    } catch (error: any) {
      alert(`Failed to reset password: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full md:w-[80%] lg:w-[30%]">
          <div className="flex flex-col gap-4 w-full">
            {/* Password */}
            <div className="flex flex-col gap-1 relative w-full">
              <label htmlFor="password" className={`${labelStyle}`}>
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input py-2 px-3 rounded-xl border-2 w-full"
                />
                <button
                  type="button"
                  className="absolute top-2/4 right-3 transform -translate-y-2/4"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <TbEye size={20} /> : <TbEyeClosed size={20} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <Buttons type="submit" className="self-center">
              {loading ? "Resetting..." : "Reset Password"}
            </Buttons>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
