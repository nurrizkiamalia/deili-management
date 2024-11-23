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
    }
  }
`;

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    getAllDepartments {
      id
      name
    }
  }
`;

export const GET_DEPARTMENT_BY_ID = gql`
  query GetDepartmentById($id: ID!) {
    getDepartmentById(id: $id) {
      id
      name
    }
  }
`;

export const GET_ALL_ROLES = gql`
  query GetAllRoles {
    getAllRoles {
      id
      title
      department {
        id
        name
      }
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  query GetRoleById($id: ID!) {
    getRoleById(id: $id) {
      id
      title
      department {
        id
        name
      }
    }
  }
`;

export const GET_ROLES_BY_DEPARTMENT = gql`
  query GetRolesByDepartment($departmentId: ID!) {
    getRolesByDepartment(departmentId: $departmentId) {
      id
      title
      department {
        id
        name
      }
    }
  }
`;