/*
 * Arquivo: departments.route.ts 
 *	Autor: Leonardo Barbanti
 */

import { axiosInstance } from "./utils/axiosInstance";
import { IDepartments, IDepartmentsUpdate } from "../interfaces/interfaces";

// Chamando a rota de criação dos departamentos
export const createNewDept = async (data: IDepartments, token: string) => {
  try {
    const response = await axiosInstance.post("departments", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("departments", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de criação dos departamentos:",
      error
    );
    throw error;
  }
};

// Chamando a rota de todos os departamentos
export const getAllDepts = async () => {
  try {
    const response = await axiosInstance.get("departments");

    if (response) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa dos departamentos:",
      error
    );
    throw error;
  }
};

// Chamando a rota de departamento por id
export const getDeptById = async (guid_dept: string, token: string) => {
  try {
    const response = await axiosInstance.get(`departments/query/${guid_dept}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("departments", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa do departamento por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de atualização do departamentos por id
export const updateDeptById = async (
  guid_dept: string,
  data: IDepartmentsUpdate,
  token: string
) => {
  try {
    const response = await axiosInstance.patch(
      `departments/update/${guid_dept}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("departments", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de atualização do departamento por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de exclusão de departamento por id
export const deleteDeptById = async (guid_dept: string, token: string) => {
  try {
    const response = await axiosInstance.delete(
      `departments/delete/${guid_dept}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("departments", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de exclusão do departamento por id:",
      error
    );
    throw error;
  }
};

const departmentsRoute = {
  createNewDept,
  getAllDepts,
  getDeptById,
  updateDeptById,
  deleteDeptById,
}

export default departmentsRoute;
