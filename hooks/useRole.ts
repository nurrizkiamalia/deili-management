import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_ROLES, GET_ROLE_BY_ID, GET_ROLES_BY_DEPARTMENT } from "@/graphql/queries";

export const useRoles = () => {
  const {
    data: allRolesData,
    loading: allRolesLoading,
    error: allRolesError,
  } = useQuery(GET_ALL_ROLES);

  const {
    data: roleByIdData,
    loading: roleByIdLoading,
    error: roleByIdError,
    refetch: refetchRoleById,
  } = useQuery(GET_ROLE_BY_ID, {
    skip: true,
  });

  const {
    refetch: refetchRolesByDepartment,
    loading: rolesByDepartmentLoading,
    error: rolesByDepartmentError,
  } = useQuery(GET_ROLES_BY_DEPARTMENT, {
    skip: true, 
  });

  const [rolesByDepartment, setRolesByDepartment] = useState<any[]>([]);

  const fetchRoleById = async (id: number) => {
    const { data } = await refetchRoleById({ id });
    return data?.getRoleById;
  };

  const fetchRolesByDepartment = async (departmentId: number) => {
    try {
      const { data } = await refetchRolesByDepartment({ departmentId });
      setRolesByDepartment(data?.getRolesByDepartment || []);
    } catch (error) {
      console.error("Error fetching roles by department:", error);
      setRolesByDepartment([]); 
    }
  };

  return {
    allRoles: allRolesData?.getAllRoles || [],
    allRolesLoading,
    allRolesError,
    roleById: roleByIdData?.getRoleById || null,
    roleByIdLoading,
    roleByIdError,
    fetchRoleById,
    rolesByDepartment,
    rolesByDepartmentLoading,
    rolesByDepartmentError,
    fetchRolesByDepartment,
  };
};