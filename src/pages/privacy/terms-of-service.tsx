/*
 * Arquivo: terms-of-service.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import NavBar from "@/src/app/components/NavBar";
import {
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import CookiePreference from "../../app/components/Cookies";
import { useEffect, useState } from "react";
import Loading from "../../app/components/Loading";
import Footer from "../../app/components/Footer";

const TermsOfService = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showCookie, setShowCookie] = useState<Boolean>(false);

  // Effect para checar os cookies
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

  // Função para aceitar os cookies e se aceito armazena no localStorage
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
            flexDirection="column"
            mx="auto"
            maxW={{ base: "90%", md: "80%" }}
            p={4}
            mb={150}
            textAlign={"justify"}
          >
            <Heading
              color="gray.600"
              as="h2"
              size="lg"
            >
              1. Termos
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              Ao acessar ao site{" "}
              <Link
                href="/"
                color="gray.600"
                target="_blank"
              >
                New Day technology Services
              </Link>
              , concorda em cumprir estes termos de serviço, todas as leis e
              regulamentos aplicáveis ​​e concorda que é responsável pelo
              cumprimento de todas as leis locais aplicáveis. Se você não
              concordar com algum desses termos, está proibido de usar ou
              acessar este site. Os materiais contidos neste site são protegidos
              pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </Text>
            <Heading
              mt="15"
              color="gray.600"
              as="h2"
              size="lg"
            >
              2. Uso de Licença
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              É concedida permissão para baixar temporariamente uma cópia dos
              materiais (informações ou software) no site New Day technology
              Services , apenas para visualização transitória pessoal e não
              comercial. Esta é a concessão de uma licença, não uma
              transferência de título e, sob esta licença, você não pode:&nbsp;
            </Text>
            <UnorderedList
              mt="15"
              color="gray.600"
            >
              <ListItem>modificar ou copiar os materiais;</ListItem>
              <ListItem>
                usar os materiais para qualquer finalidade comercial ou para
                exibição pública (comercial ou não comercial);
              </ListItem>
              <ListItem>
                tentar descompilar ou fazer engenharia reversa de qualquer
                software contido no site New Day technology Services;
              </ListItem>
              <ListItem>
                remover quaisquer direitos autorais ou outras notações de
                propriedade dos materiais; ou
              </ListItem>
              <ListItem>
                transferir os materiais para outra pessoa ou 'espelhe' os
                materiais em qualquer outro servidor.
              </ListItem>
            </UnorderedList>
            <Text
              mt="15"
              color="gray.600"
            >
              Esta licença será automaticamente rescindida se você violar alguma
              dessas restrições e poderá ser rescindida por New Day technology
              Services a qualquer momento. Ao encerrar a visualização desses
              materiais ou após o término desta licença, você deve apagar todos
              os materiais baixados em sua posse, seja em formato eletrônico ou
              impresso.
            </Text>
            <Heading
              mt="15"
              color="gray.600"
              as="h2"
              size="lg"
            >
              3. Isenção de responsabilidade
            </Heading>
            <UnorderedList
              mt="15"
              color="gray.600"
            >
              <ListItem>
                Os materiais no site da New Day technology Services são
                fornecidos 'como estão'. New Day technology Services não oferece
                garantias, expressas ou implícitas, e, por este meio, isenta e
                nega todas as outras garantias, incluindo, sem limitação,
                garantias implícitas ou condições de comercialização, adequação
                a um fim específico ou não violação de propriedade intelectual
                ou outra violação de direitos.
              </ListItem>
              <ListItem>
                Além disso, o New Day technology Services não garante ou faz
                qualquer representação relativa à precisão, aos resultados
                prováveis ​​ou à confiabilidade do uso dos materiais em seu site
                ou de outra forma relacionado a esses materiais ou em sites
                vinculados a este site.
              </ListItem>
            </UnorderedList>
            <Heading
              mt="15"
              color="gray.600"
              as="h2"
              size="lg"
            >
              4. Limitações
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              Em nenhum caso o New Day technology Services ou seus fornecedores
              serão responsáveis ​​por quaisquer danos (incluindo, sem
              limitação, danos por perda de dados ou lucro ou devido a
              interrupção dos negócios) decorrentes do uso ou da incapacidade de
              usar os materiais em New Day technology Services, mesmo que New
              Day technology Services ou um representante autorizado da New Day
              technology Services tenha sido notificado oralmente ou por escrito
              da possibilidade de tais danos. Como algumas jurisdições não
              permitem limitações em garantias implícitas, ou limitações de
              responsabilidade por danos consequentes ou incidentais, essas
              limitações podem não se aplicar a você.
            </Text>
            <Heading
              mt="15"
              color="gray.600"
              as="h2"
              size="lg"
            >
              5. Precisão dos materiais
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              Os materiais exibidos no site da New Day technology Services podem
              incluir erros técnicos, tipográficos ou fotográficos. New Day
              technology Services não garante que qualquer material em seu site
              seja preciso, completo ou atual. New Day technology Services pode
              fazer alterações nos materiais contidos em seu site a qualquer
              momento, sem aviso prévio. No entanto, New Day technology Services
              não se compromete a atualizar os materiais.
            </Text>
            <Heading
              mt="15"
              color="gray.600"
              as="h2"
              size="lg"
            >
              6. Links
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              O New Day technology Services não analisou todos os sites
              vinculados ao seu site e não é responsável pelo conteúdo de nenhum
              site vinculado. A inclusão de qualquer link não implica endosso
              por New Day technology Services do site. O uso de qualquer site
              vinculado é por conta e risco do usuário.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              <br />
            </Text>
            <Heading
              mt="15"
              color="gray.600"
              as="h3"
              size="md"
            >
              Modificações
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              O New Day technology Services pode revisar estes termos de serviço
              do site a qualquer momento, sem aviso prévio. Ao usar este site,
              você concorda em ficar vinculado à versão atual desses termos de
              serviço.
            </Text>
            <Heading
              mt="15"
              color="gray.600"
              as="h3"
              size="md"
            >
              Lei aplicável
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              Estes termos e condições são regidos e interpretados de acordo com
              as leis do New Day technology Services e você se submete
              irrevogavelmente à jurisdição exclusiva dos tribunais naquele
              estado ou localidade.
            </Text>
          </Flex>
          {showCookie && <CookiePreference onAccept={handleClick} />}
          <Footer />
        </>
      )}
    </>
  );
};

export default TermsOfService;
