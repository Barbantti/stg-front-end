/*
 * Arquivo: loading.ts 
 *	Autor: Leonardo Barbanti
 */

'use client';
import { Flex, Spinner } from "@chakra-ui/react";

// Criando Loading para utilizar em todas as paginas necessárias
export const Loading = () => {
  return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.80s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
  );
};

export default Loading;
