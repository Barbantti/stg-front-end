/*
 * Arquivo: user.route.ts 
 *	Autor: Leonardo Barbanti
 */

import { axiosInstance } from "./utils/axiosInstance";
import { IUserUpdate } from "../interfaces/interfaces";

// Chamando a rota dos usuários cadastrados
export const getAllUsers = async (token: string) => {
  try {
    const response = await axiosInstance.get("user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      
    return response.data;
    }

  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa dos usuários:",
      error
    );
    throw error;
  }
};

// Chamando a rota de usuários cadastrados por id
export const getUserById = async (guid_user: string, token: string) => {
  try {
    const response = await axiosInstance.get(`user/query/${guid_user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de pesquisa do usuário por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de atualização do cadastro de usuários
export const updateUserById = async (
  guid_user: string,
  data: IUserUpdate,
  token: string
) => {
  try {
    const response = await axiosInstance.patch(
      `user/update/${guid_user}`,
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
      "Erro ao realizar a requisição de atualização do usuário por id:",
      error
    );
    throw error;
  }
};

// Chamando a rota de exclusão do cadastro de usuários
export const deleteUserById = async (guid_user: string, token: string) => {
  try {
    const response = await axiosInstance.delete(`user/delete/${guid_user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de exclusão do usuário por id:",
      error
    );
    throw error;
  }
};

const userRoute = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

export default userRoute;