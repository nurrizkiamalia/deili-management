import { GET_ALL_DEPARTMENTS, GET_DEPARTMENT_BY_ID } from "@/graphql/query/departmentRoleQuery";
import { useQuery } from "@apollo/client";

export const useDepartments = () => {
  const {
    data: allDepartmentsData,
    loading: allDepartmentsLoading,
    error: allDepartmentsError,
  } = useQuery(GET_ALL_DEPARTMENTS);

  const {
    data: departmentByIdData,
    loading: departmentByIdLoading,
    error: departmentByIdError,
    refetch: refetchDepartmentById,
  } = useQuery(GET_DEPARTMENT_BY_ID, {
    skip: true, 
  });

  const fetchDepartmentById = async (id: number) => {
    const { data } = await refetchDepartmentById({ id });
    return data?.getDepartmentById;
  };

  return {
    allDepartments: allDepartmentsData?.getAllDepartments || [],
    allDepartmentsLoading,
    allDepartmentsError,
    departmentById: departmentByIdData?.getDepartmentById || null,
    departmentByIdLoading,
    departmentByIdError,
    fetchDepartmentById,
  };
};
