"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Buttons from "@/components/Buttons";
import { usePasswordReset } from "@/hooks/useUser"; 

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ResetPasswordReqForm: React.FC = () => {
  const { requestPasswordReset } = usePasswordReset();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      await requestPasswordReset(values.email);
      alert("Password reset request sent successfully!");
    } catch (error: any) {
      alert(`Failed to send request: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full md:w-[80%] lg:w-[30%]">
          <div className="flex flex-col gap-4 w-full">
            {/* Email */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="text-dspDarkGray font-semibold">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input py-2 px-3 rounded-xl border-2 w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <Buttons type="submit" className="self-center">
              {loading ? "Requesting..." : "Request Password Reset"}
            </Buttons>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordReqForm;
