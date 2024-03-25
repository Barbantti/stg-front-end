/*
 * Arquivo: index.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import Loading from "../app/components/Loading";
import Footer from "../app/components/Footer";
import CookiePreference from "../app/components/Cookies";
import { useEffect, useState } from "react";
import NavBar from "../app/components/NavBar";

const Home = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showCookie, setShowCookie] = useState<Boolean>(false);

  // Effect para chamar a função para buscar os cookies
  useEffect(() => {
    fetchCookie();
  }, []);

  // Função para carregar os cookies
  const fetchCookie = async () => {
    const cookiesAccepted = await localStorage.getItem("cookiesAccepted");

    if (cookiesAccepted !== "true") {
      setShowCookie(true);
    }

    setIsLoading(false);
  };

  // Função para aceitar os cookies
  const handleClick = () => {
    localStorage.setItem("cookiesAccepted", "true");

    setShowCookie(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <Flex
            marginTop="50px"
            display="flex"
            alignItems="center"
            height="78vh"
            flexDirection="column"
          >
            <Box p={8}>
              <Heading
                as="h1"
                mb={4}
              >
                Bem-vindo a home page
              </Heading>
              <Text textAlign="center">Stage - Crack the Case</Text>
            </Box>
          </Flex>
          {showCookie && <CookiePreference onAccept={handleClick} />}
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
