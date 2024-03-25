/*
 * Arquivo: quem-somos.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import NavBar from "../app/components/NavBar";
import CookiePreference from "../app/components/Cookies";
import { useEffect, useState } from "react";
import Loading from "../app/components/Loading";
import Footer from "../app/components/Footer";

const AboutUs = () => {
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
            direction="column"
            align="center"
            mt="30"
            mx="auto"
            height="80vh"
            maxW={{ base: "90%", md: "80%" }}
            p={4}
            textAlign={"justify"}
          >
            <Heading
              color="gray.600"
              as="h2"
              size="xl"
            >
              Quem Somos
            </Heading>
            <Text
              mt="75"
              color="gray.600"
            >
              A New Day technology Services é uma empresa dedicada a fornecer
              soluções inovadoras e de alta qualidade no campo da tecnologia.
              Com uma equipe de especialistas altamente qualificados e
              apaixonados, estamos comprometidos em impulsionar o sucesso de
              nossos clientes.
            </Text>
            <Text color="gray.600">
              Nossa missão é criar e implementar soluções tecnológicas que não
              apenas atendam, mas superem as expectativas de nossos clientes.
              Estamos constantemente buscando novas maneiras de inovar e
              oferecer serviços de ponta que impulsionem o crescimento e a
              eficiência dos negócios.
            </Text>
            <Text color="gray.600">
              Com anos de experiência no setor, construímos uma reputação sólida
              como parceiros confiáveis ​​na jornada tecnológica de nossos
              clientes. Estamos comprometidos em manter os mais altos padrões de
              integridade, excelência e responsabilidade em todos os projetos
              que empreendemos.
            </Text>
            <Text color="gray.600">
              Na New Day technology Services, acreditamos que a tecnologia tem o
              poder de transformar negócios e impulsionar a inovação. Estamos
              entusiasmados em fazer parte dessa jornada com nossos clientes e
              ajudá-los a alcançar novos patamares de sucesso.
            </Text>
          </Flex>
          {showCookie && <CookiePreference onAccept={handleClick} />}
          <Footer />
        </>
      )}
    </>
  );
};

export default AboutUs;
