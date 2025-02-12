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

export const GET_FIND_BY_EMAIL = gql `
  query GetFindByEmail($email: String!){
    getFindEmail(email: $email){
      id
      firstName
      lastName
      email
      phoneNumber
      jobRole
      {
        id
        title
        department{
          id
          name
        }
      }
    }
  }
`

export const GET_SEARCH_USER_BY_EMAIL = gql`
  query GetSearchUserByEmail($email: String!) {
    getSearchUserByEmail(email: $email) {
      id
      firstName
      lastName
      email
      phoneNumber
      jobRole
      {
        id
        title
        department{
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_USER = gql`
  query GetAllUser{
    getAllUser{
      id
      firstName
      lastName
      email
      phoneNumber
      jobRole
      {
        id
        title
        department{
          id
          name
        }
      }
    }
  }
`;