"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Buttons from "@/components/Buttons";
import Link from "next/link";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useAuth } from "@/hooks/useUser";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const labelStyle = "text-dspDarkGray font-semibold";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      alert("Login successful!");
    } catch (error: any) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="w-full md:w-[80%] lg:w-[30%]">
          <div className="flex flex-col gap-4 w-full">
            {/* Email */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className={`${labelStyle}`}>
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

            <Link
              href="/reset-password-req"
              className="text-dspOrange font-semibold hover:scale-105 transition-all duration-300"
            >
              Reset Password
            </Link>

            {/* Submit Button */}
            <Buttons type="submit" className="self-center">
              {loading ? "Logging in..." : "Login"}
            </Buttons>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;