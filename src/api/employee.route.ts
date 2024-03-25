/*
 * Arquivo: employee.route.ts 
 *	Autor: Leonardo Barbanti
 */

import { axiosInstance } from "./utils/axiosInstance";
import {  IEmployeesUpdate } from "../interfaces/interfaces";

// Chamando a rota dos usuários cadastrados
export const getAllEmployees = async (token: string) => {
  try {
    const response = await axiosInstance.get("employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
    return response.data;
    }

  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa dos colaboradores:",
      error
    );
    throw error;
  }
};

// Chamando a rota de usuários cadastrados por id
export const getEmployeeById = async (guid_emp: string, token: string) => {
  try {
    const response = await axiosInstance.get(`employee/query/${guid_emp}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("employee", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa do colaborador por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de atualização do cadastro de usuários
export const updateEmployeeById = async (
  guid_emp: string,
  data: IEmployeesUpdate,
  token: string
) => {
  try {
    const response = await axiosInstance.patch(
      `employee/update/${guid_emp}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de atualização do colaborador por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de exclusão do cadastro de usuários
export const deleteEmployeeById = async (guid_emp: string, token: string) => {

  try {
    const response = await axiosInstance.delete(`employee/delete/${guid_emp}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("employee", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de exclusão do colaborador por id:",
      error
    );
    throw error;
  }
};

const employeeRoute = {
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};

export default employeeRoute;