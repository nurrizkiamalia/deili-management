'use client';

import { useState } from 'react';
import { useResendVerificationEmail, useUser } from '@/hooks/useUser';

const ResendVerification: React.FC = () => {
  const { user, loading: userLoading, error } = useUser(); 
  const { resendVerificationEmail } = useResendVerificationEmail();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleResendEmail = async () => {
    if (user?.id) {
      setLoading(true); 
      try {
        const response = await resendVerificationEmail(user.id);
        setAlertMessage(response || 'Verification email has been resent.');
      } catch (error: any) {
        setAlertMessage(error.message || 'Failed to resend verification email.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (userLoading || !user || error || user?.isVerified) {
    return null;
  }

  return (
    <div className={`w-full ${!user || user?.isVerified === true ? 'hidden' : 'block'}`}>
      <p className="mb-4 p-4 text-center rounded-xl bg-red-100">
        Your email is not verified yet, click to{' '}
        <button
          onClick={handleResendEmail}
          className="text-dspOrange underline font-bold hover:text-red-600"
          disabled={loading} 
        >
          {loading ? 'Sending...' : 'resend email verification'}
        </button>.
      </p>

      {/* Alert Dialog */}
      {alertMessage && (
        <div
          className={`mt-4 p-4 text-center rounded-md ${
            alertMessage.includes('resent')
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default ResendVerification;
