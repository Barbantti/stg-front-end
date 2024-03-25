/*
 * Arquivo: auth.route.ts 
 *	Autor: Leonardo Barbanti
 */

import {
  IEmployees,
  IEmployeesLogin,
  IForgotPass,
  IUser,
  IUserLogin,
} from "../interfaces/interfaces";
import { axiosInstance } from "./utils/axiosInstance";

// Chamando a rota de login do usuário
export const userLogin = async (data: IUserLogin) => {
  try {
    const response = await axiosInstance.post("auth/user/login", data);

    const responseData = response.data;

    localStorage.setItem("user", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota de login do colaborador
export const employeeLogin = async (data: IEmployeesLogin) => {
  try {
    const response = await axiosInstance.post("auth/employee/login", data);

    const responseData = response.data;

    localStorage.setItem("employee", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota de cadastro do usuário
export const userRegister = async (data: IUser) => {
  try {
    const response = await axiosInstance.post("auth/user/register", data);

    const responseData = response.data;

    localStorage.setItem("user", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota de cadastro do colaborador
export const employeeRegister = async (data: IEmployees) => {
  try {
    const response = await axiosInstance.post("auth/employee/register", data);

    const responseData = response.data;

    localStorage.setItem("employee", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Realizando o logout do usuário ou colaborador
export const logout = () => {
  try {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }

    if (localStorage.getItem("employee")) {
      localStorage.removeItem("employee");
    }

    if (localStorage.getItem("userProfile")) {
      localStorage.removeItem("userProfile");
    }

    if (localStorage.getItem("employeeProfile")) {
      localStorage.removeItem("employeeProfile");
    }

    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return false;
  }
};

// Chamando a rota para confirmar o email e receber o token para autenticar a troca de senha do usuário
export const forgotUserPassword = async (email: IForgotPass) => {
  try {
    const response = await axiosInstance.post(
      "auth/user/forgot-password",
      email
    );

    const responseData = response.data;

    localStorage.setItem("user", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota para confirmar o email e receber o token para autenticar a troca de senha do colaborador
export const forgotEmployeePassword = async (email: IForgotPass) => {
  try {
    const response = await axiosInstance.post(
      "auth/employee/forgot-password",
      email
    );

    const responseData = response.data;

    localStorage.setItem("employee", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota de reset de senha do usuário ja com o token e a nova senha
export const userResetPassword = async (
  token: string,
  password: string
) => {

  try {
    const response = await axiosInstance.post("auth/user/reset-password", {
      token,
      password,
    });

    const responseData = response.data;

    localStorage.setItem("user", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota de reset de senha do colaborador ja com o token e a nova senha
export const employeeResetPassword = async (
  token: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("auth/employee/reset-password", {
      token,
      password,
    });

    const responseData = response.data;

    localStorage.setItem("employee", JSON.stringify(responseData));

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota para solicitar os dados do usuário
export const userProfile = async (token: string) => {
  try {
    const response = await axiosInstance.post(
      "auth/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Se retornar o perfil do usuário adiciona ele no localStorage
    if (response) {
      localStorage.setItem("userProfile", JSON.stringify(response.data));
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Chamando a rota para solicitar os dados do colaborador
export const employeeProfile = async (token: string) => {

  try {
    const response = await axiosInstance.post(
      "auth/employee/profile",
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Se retornar o perfil do colaborador adiciona ele no localStorage
    if (response) {
      localStorage.setItem("employeeProfile", JSON.stringify(response.data));
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
      error: error,
    };
  }
};

const authRoute = {
  userLogin,
  employeeLogin,
  userRegister,
  employeeRegister,
  logout,
  forgotUserPassword,
  forgotEmployeePassword,
  userResetPassword,
  employeeResetPassword,
  userProfile,
  employeeProfile,
};

export default authRoute;
