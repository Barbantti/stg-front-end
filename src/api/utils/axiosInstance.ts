/*
 * Arquivo: axiosInstance.ts
 *	Autor: Leonardo Barbanti
 */

import axios from "axios";

// Cria uma instância do axios para reutilizar na aplicação
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_URL,
});
