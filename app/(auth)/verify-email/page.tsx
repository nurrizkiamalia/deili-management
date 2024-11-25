'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useVerifyEmail } from '@/hooks/useUser';

const VerifyEmailContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { data: session } = useSession();
  const { verifyEmail } = useVerifyEmail();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAndVerify = async () => {
      if (session?.user?.isVerified) {
        setStatus('success');
        setAlertMessage('Your email is already verified.');
        return;
      }
      if (token) {
        try {
          await verifyEmail(token);
          setStatus('success');
          setAlertMessage('Your email was successfully verified!');
          setTimeout(() => {
            router.push('/');
          }, 3000);
        } catch (error: any) {
          setStatus('error');
          setAlertMessage('Verification failed. Please try again.');
          router.push('/');
        }
      } else {
        setStatus('error');
        setAlertMessage('Invalid verification token. Token is expired.');
      }
    };

    checkAndVerify();
  }, [token, session, verifyEmail, router]);

  return (
    <div className="max-w-md mx-auto mt-10">
      {/* Alert Dialog */}
      {alertMessage && (
        <div
          className={`mt-4 p-4 text-center rounded-md ${
            alertMessage.includes('successfully')
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {alertMessage}
        </div>
      )}

      {/* Loading Message */}
      {status === 'loading' && <div className="text-center mt-4">Verifying your email...</div>}
    </div>
  );
};

const VerifyEmail: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-center mt-4">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
