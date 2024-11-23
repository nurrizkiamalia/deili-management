"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDepartments } from "@/hooks/useDepartment";
import { useRoles } from "@/hooks/useRole";
import Buttons from "@/components/Buttons";
import { useRegisterUser } from "@/hooks/useUser";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  department: Yup.string().required("Department is required"),
  jobRole: Yup.number().required("Job role is required"),
});

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { allDepartments, allDepartmentsLoading } = useDepartments();
  const {
    fetchRolesByDepartment,
    rolesByDepartment,
    rolesByDepartmentLoading,
  } = useRoles();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const { handleRegister, loading, error } = useRegisterUser();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleDepartmentChange = async (departmentId: number) => {
    setSelectedDepartment(departmentId);
    await fetchRolesByDepartment(departmentId);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const labelStyle = "text-dspDarkGray font-semibold";

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        department: "",
        jobRole: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        setAlertMessage(null);
        try {
          console.log("Payload sent to registerUser:", {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
            jobRoleId: values.jobRole, 
          });       

          const response = await handleRegister({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
            jobRoleId: values.jobRole, 
          });
            
          setAlertMessage("Registration successful!");
          resetForm();
          router.push('/login')
        } catch (err) {
          setAlertMessage(
            "Registration failed! Please check your input and try again."
          );
        }
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="w-full md:w-[80%] lg:w-[50%]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              {/* First Name */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="firstName" className={`${labelStyle}`}>
                  First Name
                </label>
                <Field
                  name="firstName"
                  placeholder="Enter your first name"
                  className="input py-2 px-3 rounded-xl border-2"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="lastName" className={`${labelStyle}`}>
                  Last Name
                </label>
                <Field
                  name="lastName"
                  placeholder="Enter your last name"
                  className="input py-2 px-3 rounded-xl border-2"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

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

            {/* Phone Number */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="phoneNumber" className={`${labelStyle}`}>
                Phone Number
              </label>
              <Field
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="input py-2 px-3 rounded-xl border-2 w-full"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
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
                  >
                    {showPassword ? (
                      <TbEye size={20} />
                    ) : (
                      <TbEyeClosed size={20} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1 relative w-full">
                <label htmlFor="confirmPassword" className={`${labelStyle}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="input py-2 px-3 rounded-xl border-2 w-full"
                  />
                  <button
                    type="button"
                    className="absolute top-2/4 right-3 transform -translate-y-2/4"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <TbEye size={20} />
                    ) : (
                      <TbEyeClosed size={20} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="department" className={`${labelStyle}`}>
                Work Department
              </label>
              <Select
                onValueChange={(value) => {
                  const departmentId = Number(value);
                  setFieldValue("department", departmentId);
                  handleDepartmentChange(departmentId);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="w-full"
                    placeholder="Select a department"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    {allDepartmentsLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : allDepartments?.length ? (
                      allDepartments.map((department: any) => (
                        <SelectItem
                          key={department.id}
                          value={department.id.toString()}
                        >
                          {department.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-departments" disabled>
                        No departments available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Job Role */}
            <div className="flex flex-col gap-1">
              <label htmlFor="jobRole" className={`${labelStyle}`}>
                Job Role
              </label>
              <Select
                onValueChange={(value) =>
                  setFieldValue("jobRole", Number(value))
                }
                disabled={!selectedDepartment}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Job Roles</SelectLabel>
                    {rolesByDepartmentLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : rolesByDepartment?.length ? (
                      rolesByDepartment.map((role: any) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-roles" disabled>
                        No roles available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Buttons type="submit" className="self-center" disabled={loading}>
              {loading ? "Registering..." : "Register Now"}
            </Buttons>

            {/* Alert Dialog */}
            {alertMessage && (
              <div
                className={`mt-4 p-4 text-center rounded-md ${
                  alertMessage.includes("successful")
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {alertMessage}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
