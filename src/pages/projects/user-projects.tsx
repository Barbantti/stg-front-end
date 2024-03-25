/*
 * Arquivo: user-projects.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Text,
  Box,
  Container,
  List,
  ListIcon,
  ListItem,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaRegFileCode } from "react-icons/fa6";
import { userProfile } from "@/src/api/auth.route";
import { getAllProjects, getProjectById } from "@/src/api/projects.route";
import { IUserProjects } from "@/src/interfaces/interfaces";
import { useEffect, useState } from "react";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import Footer from "@/src/app/components/Footer";
import moment from "moment";

const UserProjects = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IUserProjects[] | null>(null);

  // UseEffect para carregar os dados do usuário
  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para formatar as datas usando o moment
  const formatDate = (data: string) => {
    return moment(data).format("DD/MM/YYYY");
  };

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    // Pegando o token do usuário no localStorage
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    // Verificando se o token do usuário existe e se existir, retornar os dados do usuário
    const getUserData = await userProfile(newUserToken);

    try {
      if (getUserData) {
        if (getUserData && getUserData.success) {
          const projectsArray = getUserData.data.user.projects;
          // Listando cada ID do array de projetos do usuário
          const userProjectIds = projectsArray.map(
            (project: { guid_projects: any }) => project.guid_projects
          );

          // Obtendo todos os projetos do usuário
          const response = await getAllProjects();

          // Listando cada ID do array de projetos
          const projectIds = response.map(
            (project: { guid_projects: any }) => project.guid_projects
          );

          // Verificando se os projetos do usuário estão presentes nos projetos retornados
          const matchingProjectIds = userProjectIds.filter(
            (guid_projects: any) => projectIds.includes(guid_projects)
          );

          // Obter os dados de cada projeto filtrado
          const filteredProjects = await Promise.all(
            matchingProjectIds.map(async (id: string) => {
              const projectData = await getProjectById(id, newUserToken);
              // Formatando as datas dentro dos projetos filtrados
              projectData.createdAt = formatDate(projectData.createdAt);
              projectData.updatedAt = formatDate(projectData.updatedAt);
              return projectData;
            })
          );

          // Atualizar o estado formData com os projetos filtrados
          setFormData(filteredProjects);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast({
            title: "Erro",
            description: "Ocorreu um erro ao obter os projetos do usuário.",
            status: "error",
            duration: 8000,
            isClosable: false,
          });
        }
      }
    } catch (error) {
      router.push("/");
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao cadastrar o novo projeto, por favor tente novamente.",
        status: "error",
        duration: 7000,
        isClosable: false,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Renderização dos projetos */}
          {formData && (
            <>
              <NavBar />
              <Container
                maxW="110vh"
                mb={{ base: "50%", sm: "15vh" }}
              >
                <Box
                  marginTop="50px"
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  mb={10}
                  gap={5}
                >
                  {formData.map((item, index) => (
                    <Box
                      key={item.guid_projects}
                      minW={{ base: "70%", sm: "280px" }}
                      maxW={{ base: "70%", sm: "280px" }}
                      boxShadow="2xl"
                      rounded={"xl"}
                      overflow={"hidden"}
                      mb={4}
                      borderWidth={1}
                      borderColor={"gray.600"}
                    >
                      <Stack
                        textAlign={"center"}
                        align={"center"}
                        boxShadow="0px 4px 2px -2px rgba(0,0,0,0.1)"
                        mx={4}
                      >
                        <Text
                          fontSize={"lg"}
                          fontWeight={600}
                          p={6}
                          px={3}
                        >
                          Projeto n: {index + 1}
                        </Text>
                      </Stack>
                      <Box
                        px={6}
                        py={5}
                      >
                        <List spacing={3}>
                          <ListItem>
                            <Text
                              fontWeight="bold"
                              fontStyle={"italic"}
                              py={1}
                            >
                              Projeto:
                            </Text>
                            <ListIcon
                              as={FaRegFileCode}
                              color="blue.400"
                            />
                            {item.projectName}
                          </ListItem>
                          <ListItem>
                            <Text
                              fontWeight="bold"
                              fontStyle={"italic"}
                              py={1}
                            >
                              Descrição:
                            </Text>
                            <ListIcon
                              as={FaRegFileCode}
                              color="blue.400"
                            />
                            {item.projectDescription}
                          </ListItem>
                          <ListItem>
                            <Text
                              fontWeight="bold"
                              fontStyle={"italic"}
                              py={1}
                            >
                              Status:
                            </Text>
                            <ListIcon
                              as={FaRegFileCode}
                              color="blue.400"
                            />
                            {item.status}
                          </ListItem>
                          <ListItem>
                            <Text
                              fontWeight="bold"
                              fontStyle={"italic"}
                              py={1}
                            >
                              Data da Solicitação:
                            </Text>
                            <ListIcon
                              as={CalendarIcon}
                              color="blue.400"
                            />
                            {item.createdAt}
                          </ListItem>
                          <ListItem>
                            <Text
                              fontWeight="bold"
                              fontStyle={"italic"}
                              py={1}
                            >
                              Última Atualização do Status:
                            </Text>
                            <ListIcon
                              as={CalendarIcon}
                              color="blue.400"
                            />
                            {item.updatedAt}
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Container>
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default UserProjects;
