import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $jobRoleId: ID!
  ) {
    registerUser(
      request: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        phoneNumber: $phoneNumber
        jobRoleId: $jobRoleId
      }
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
      jobRole {
        id
        title
      }
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($input: UpdateProfileDto!) {
    updateUserProfile(input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
      jobRole {
        title
      }
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation requestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!, $token: String!, $newPassword: String!) {
    resetPassword(email: $email, token: $token, newPassword: $newPassword)
  }
`;

export const RESEND_VERIFICATION_EMAIL = gql`
  mutation resendVerificationEmail($userId: ID!) {
    resendVerificationEmail(userId: $userId)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyUserEmail($token: String!) {
    verifyUserEmail(token: $token)
  }
`;