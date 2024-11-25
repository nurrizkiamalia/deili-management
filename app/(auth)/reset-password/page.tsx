"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "./components/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = decodeToken(token); 
        setEmail(decodedToken.email);
      } catch (error) {
        console.error("Invalid or expired token");
        alert("Invalid or expired token. Please request a new password reset.");
      }
    }
  }, [token]);

  const decodeToken = (token: string): { email: string; expiry: string } => {
    const decoded = atob(token); 
    const [_, email, expiry] = decoded.split("|");
    if (new Date(expiry).getTime() < Date.now()) {
      throw new Error("Token expired");
    }
    return { email, expiry };
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center justify-end gap-5 py-10 bg-white rounded-t-xl border-2">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-5xl">
          Reset Your Password
        </h1>
        <p>{email ? `Resetting password for ${email}.` : "Loading..."}</p>
      </div>
      <div className="border-2 p-5 md:p-10 rounded-b-xl w-full flex items-center justify-center">
        {email && <ResetPasswordForm email={email} token={token || ""} />}
      </div>
    </div>
  );
};

export default ResetPassword;
