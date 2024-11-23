import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { REGISTER_USER, REQUEST_PASSWORD_RESET, RESET_PASSWORD, UPDATE_PROFILE_MUTATION, VERIFY_EMAIL } from "@/graphql/mutations";
import { GET_USER_PROFILE } from "@/graphql/queries";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    if (result?.ok) {
      router.push("/"); 
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return {
    session,
    isAuthenticated: !!session,
    status,
    login,
    logout,
  };
};

export const useRegisterUser = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleRegister = async (variables: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    jobRoleId: number | null;
  }) => {
    try {
      const response = await registerUser({ variables });
      return response.data;
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  };

  return {
    handleRegister,
    data,
    loading,
    error,
  };
};

export const useUser = () => {
  const { session } = useAuth();

  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId: session?.user?.id },
    skip: !session?.user?.id,
  });

  return {
    user: data?.getUserProfile,
    loading,
    error,
  };
};

export const useUpdateProfile = () => {
  const [updateProfileMutation] = useMutation(UPDATE_PROFILE_MUTATION);

  const updateProfile = async (input: {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    currentPassword: string;
    newPassword?: string;
    jobRoleId?: number;
  }) => {
    const { data } = await updateProfileMutation({ variables: { input } });
    return data?.updateUserProfile;
  };

  return { updateProfile };
};

export const usePasswordReset = () => {
  const [requestPasswordResetMutation] = useMutation(REQUEST_PASSWORD_RESET);
  const [resetPasswordMutation] = useMutation(RESET_PASSWORD);

  const requestPasswordReset = async (email: string) => {
    const { data } = await requestPasswordResetMutation({ variables: { email } });
    return data?.requestPasswordReset;
  };

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    const { data } = await resetPasswordMutation({
      variables: { email, token, newPassword },
    });
    return data?.resetPassword;
  };

  return {
    requestPasswordReset,
    resetPassword,
  };
};

export const useVerifyEmail = () => {
  const [verifyEmailMutation] = useMutation(VERIFY_EMAIL);

  const verifyEmail = async (token: string) => {
    const { data } = await verifyEmailMutation({ variables: { token } });
    return data?.verifyUserEmail;
  };

  return { verifyEmail };
};