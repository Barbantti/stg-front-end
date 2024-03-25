/*
 * Arquivo: projects.route.ts 
 *	Autor: Leonardo Barbanti
 */

import { axiosInstance } from "./utils/axiosInstance";
import { IProjects } from "../interfaces/interfaces";

// Chamando a rota de criação de um novo projeto
export const createNewProject = async (data: IProjects, token: string) => {
  try {
    const response = await axiosInstance.post("projects", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("projects", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de criação de um novo projeto:",
      error
    );
    throw error;
  }
};

// Chamando a rota de todos os projetos
export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get("projects");

    if (response) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa de todos os projetos:",
      error
    );
    throw error;
  }
};

// Chamando a rota de projeto por id
export const getProjectById = async (guid_projects: string, token: string) => {

  try {
    const response = await axiosInstance.get(
      `projects/query/${guid_projects}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("projects", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa do projeto por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de atualização de um projeto por id
export const updateProjectById = async (
  guid_projects: string,
  data: IProjects,
  token: string
) => {
  try {
    const response = await axiosInstance.patch(
      `projects/update/${guid_projects}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("projects", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de atualização de um projeto por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de exclusão de um projeto por id
export const deleteProjectById = async (
  guid_projects: string,
  token: string
) => {
  try {
    const response = await axiosInstance.delete(
      `projects/delete/${guid_projects}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      localStorage.setItem("projects", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de exclusão de um projeto por id:",
      error
    );
    throw error;
  }
};

const projectsRoute = {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};

export default projectsRoute;
