import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    getUserProfile(userId: $userId) {
      id
      firstName
      lastName
      email
      phoneNumber
      jobRole
      isVerified
    }
  }
`;