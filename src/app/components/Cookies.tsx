/*
 * Arquivo: cookies.ts 
 *	Autor: Leonardo Barbanti
 */
"use client";

import { Stack, Text, Button, Link, Flex } from "@chakra-ui/react";
import { FcLock } from "react-icons/fc";

interface CookiePreferenceProps {
  onAccept: () => void;
}

const CookiePreference: React.FC<CookiePreferenceProps> = ({ onAccept }) => {

  // Função para aceitar os cookies
  const handleClick = () => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");

    if (cookiesAccepted !== "true") {
      onAccept();
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ base: "90%", md: "55%" }}
      bg="gray.800"
      p="6"
      borderRadius="xl"
      m="1"
      mx="auto"
      zIndex="999"
      position="fixed"
      bottom={{ base: "160px", md: "100px" }}
      left="0"
      right="0"
      mb="30px"
    >
      <Stack direction="row" alignItems="center">
        <Text color="white" fontWeight="semibold">
          Sua Privacidade
        </Text>
        <FcLock />
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text
          color="white"
          fontSize={{ base: "sm" }}
          textAlign={"justify"}
          maxW={"4x1"}
        >
          Este website armazena cookies no seu computador. Ao clicar em Aceitar,
          você concorda com isso, conforme descrito em nossa{" "}
          <Link href="/privacy/privacy-policy" textDecoration="underline">
            "Politica de Privacidade"
          </Link>{" "}
          e{" "}
          <Link href="/privacy/terms-of-service" textDecoration="underline">
            "Termos e Condições"
          </Link>
          . Para alterar preferências ou retirar consentimento, atualize suas
          Preferências de Cookies.
        </Text>
        <Stack mt="5" direction={{ base: "column", md: "row" }}>
          <Button colorScheme="blue" onClick={handleClick}>
            Aceitar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CookiePreference;
