/*
 * Arquivo: privacy-policy.tsx
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

const PrivacyPolicy = () => {
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
              Política Privacidade
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              A sua privacidade é importante para nós. É política do New Day
              technology Services respeitar a sua privacidade em relação a
              qualquer informação sua que possamos coletar no site{" "}
              <Link
                href="/"
                color="gray.600"
              >
                New Day technology Services.
              </Link>
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemos-no-los por
              meios justos e legais, com o seu conhecimento e consentimento.
              Também informamos por que estamos coletando e como será usado.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto conosco.
            </Text>
            <UnorderedList
              mt="15"
              color="gray.600"
            >
              <ListItem>
                O serviço Google AdSense que usamos para veicular publicidade
                usa um cookie DoubleClick para veicular anúncios mais relevantes
                em toda a Web e limitar o número de vezes que um determinado
                anúncio é exibido para você.
              </ListItem>
              <ListItem>
                Para mais informações sobre o Google AdSense, consulte as FAQs
                oficiais sobre privacidade do Google AdSense.
              </ListItem>
              <ListItem>
                Utilizamos anúncios para compensar os custos de funcionamento
                deste site e fornecer financiamento para futuros
                desenvolvimentos. Os cookies de publicidade comportamental
                usados ​​por este site foram projetados para garantir que você
                forneça os anúncios mais relevantes sempre que possível,
                rastreando anonimamente seus interesses e apresentando coisas
                semelhantes que possam ser do seu interesse.
              </ListItem>
              <ListItem>
                Vários parceiros anunciam em nosso nome e os cookies de
                rastreamento de afiliados simplesmente nos permitem ver se
                nossos clientes acessaram o site através de um dos sites de
                nossos parceiros, para que possamos creditá-los adequadamente e,
                quando aplicável, permitir que nossos parceiros afiliados
                ofereçam qualquer promoção que pode fornecê-lo para fazer uma
                compra.
              </ListItem>
            </UnorderedList>
            <Heading
              mt="15"
              color="gray.600"
              as="h3"
              size="md"
            >
              Compromisso do Usuário
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que o New Day technology Services oferece no site e com
              caráter enunciativo, mas não limitativo:
            </Text>
            <UnorderedList
              mt="15"
              color="gray.600"
            >
              <ListItem>
                A) Não se envolver em atividades que sejam ilegais ou contrárias
                à boa fé a à ordem pública;
              </ListItem>
              <ListItem>
                B) Não difundir propaganda ou conteúdo de natureza racista,
                xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia
                ilegal, de apologia ao terrorismo ou contra os direitos humanos;
              </ListItem>
              <ListItem>
                C) Não causar danos aos sistemas físicos (hardwares) e lógicos
                (softwares) do New Day technology Services, de seus fornecedores
                ou terceiros, para introduzir ou disseminar vírus informáticos
                ou quaisquer outros sistemas de hardware ou software que sejam
                capazes de causar danos anteriormente mencionados.
              </ListItem>
            </UnorderedList>
            <Heading
              mt="15"
              color="gray.600"
              as="h3"
              size="md"
            >
              Mais informações
            </Heading>
            <Text
              mt="15"
              color="gray.600"
            >
              Esperemos que esteja esclarecido e, como mencionado anteriormente,
              se houver algo que você não tem certeza se precisa ou não,
              geralmente é mais seguro deixar os cookies ativados, caso interaja
              com um dos recursos que você usa em nosso site.
            </Text>
            <Text
              mt="15"
              color="gray.600"
            >
              Esta política é efetiva a partir de 24, March, 2024 - 14:37
            </Text>
          </Flex>
          {showCookie && <CookiePreference onAccept={handleClick} />}
          <Footer />
        </>
      )}
    </>
  );
};

export default PrivacyPolicy;
