import React from "react";
import ResetPasswordReqForm from "./components/ResetPasswordReqForm";

const ResetPasswordRequest: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center justify-end gap-5 py-10 bg-white rounded-t-xl border-2">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-5xl">
          Request Password Reset
        </h1>
        <p>Enter your email to receive a password reset link.</p>
      </div>
      <div className="border-2 p-5 md:p-10 rounded-b-xl w-full flex items-center justify-center">
        <ResetPasswordReqForm />
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
