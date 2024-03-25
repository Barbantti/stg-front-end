/*
 * Arquivo: not-found.tsx 
 *	Autor: Leonardo Barbanti
 */

"use client";

import { Box, Heading, Text, Button } from "@chakra-ui/react";


// Pagina genérica de 404, caso nao encontre a pagina, esta aparece automaticamente.
const NotFound = () => {
  return (
    <Box
      textAlign="center"
      mt={40}
      py={10}
      px={6}
    >
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, blue.400, blue.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text
        fontSize="18px"
        mt={3}
        mb={2}
      >
        Pagina não encontrada
      </Text>
      <Text
        color={"gray.500"}
        mb={6}
      >
        Esta pagina que voce tentou acessar não existe
      </Text>

      <Button
        as={"a"}
        href={"/"}
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid"
      >
        Voltar para Home
      </Button>
    </Box>
  );
};
export default NotFound;
