/*
 * Arquivo: Footer.tsx 
 *	Autor: Leonardo Barbanti
 */

'use client';
import { Link } from "@chakra-ui/next-js";
import { Box, Container, Stack, Text } from "@chakra-ui/react";


// Criando Footer para utilizar em todas as paginas necessárias
const Footer = () => {
  return (
    <Box as="footer" bg="gray.300" py={8} boxShadow="md" position="fixed" bottom={0} width="100%">
      <Container
        as={Stack}
        maxW={"110vh"}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"/"}>
            Home
          </Box>
          <Box as="a" href={"/quem-somos"}>
            Quem Somos
          </Box>
          <Box as="a" href={"/privacy/privacy-policy"}>
            Politica de Privacidade
          </Box>
          <Box as="a" href={"/privacy/terms-of-service"}>
            Termos e Condições
          </Box>
        </Stack>
        <Text>
          © 2024
          <Link
            color="teal.500"
            href="https://github.com/Barbantti"
            target="_blank"
          >
            {" "}
            Leonardo Barbanti
          </Link>
          . Todos os direitos reservados
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
