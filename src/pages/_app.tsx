/*
 * Arquivo: _app.tsx 
 *	Autor: Leonardo Barbanti
 */

"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";

// Definindo o tema de cores para o Chakra UI
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

// Realizei uma pequena alteração no toast do Chakra UI, aumentando o tamanho de 1.0 para 1.10. (Apenas por gosto mesmo, pode ser alterado de acordo!)
export const theme = extendTheme({
  colors,
  styles: {
    global: {
      ".chakra-alert": {
        transform: "scale(1.10)",
        mb: "65px",
      },
    },
  },
});

// Função principal da aplicação
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
