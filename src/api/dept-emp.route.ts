/*
 * Arquivo: dept-emp.route.ts 
 *	Autor: Leonardo Barbanti
 */

import { axiosInstance } from "./utils/axiosInstance";
import { IDept_emp } from "../interfaces/interfaces";

// Chamando a rota de criação da Juncão entre departamento e colaborador
export const createNewDeptEmp = async (data: IDept_emp, token: string) => {
  try {
    const response = await axiosInstance.post("dept-emp", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("dept_emp", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de criação da Juncão entre departamento e colaborador:",
      error
    );
    throw error;
  }
};

// Chamando a rota de todas as Junções entre departamentos e colaboradores
export const getAllDeptEmp = async () => {
  try {
    const response = await axiosInstance.get("dept-emp");

    if (response) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa das Junções entre departamentos e colaboradores:",
      error
    );
    throw error;
  }
};

// Chamando a rota da Juncão entre departamento e colaborador por id
export const getDeptEmpById = async (guid_deptEmp: string, token: string) => {
  try {
    const response = await axiosInstance.get(`dept-emp/query/${guid_deptEmp}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("dept_emp", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa da Juncão entre departamento e colaborador por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de atualização da Juncão entre departamento e colaborador por id
export const updateDeptEmpById = async (
  guid_deptEmp: string,
  data: IDept_emp,
  token: string
) => {
  try {
    const response = await axiosInstance.patch(
      `dept-emp/update/${guid_deptEmp}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("dept_emp", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de atualização da Juncão entre departamento e colaborador por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de exclusão da Juncão entre departamento e colaborador por id
export const deleteDeptEmpById = async (
  guid_deptEmp: string,
  token: string
) => {

  try {
    const response = await axiosInstance.delete(
      `dept-emp/delete/${guid_deptEmp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("dept_emp", JSON.stringify(response.data));
    }
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de exclusão da Juncão entre departamento e colaborador por id:",
      error
    );
    throw error;
  }
};

const deptEmpRoute = {
  createNewDeptEmp,
  getAllDeptEmp,
  getDeptEmpById,
  updateDeptEmpById,
  deleteDeptEmpById,
};

export default deptEmpRoute;
