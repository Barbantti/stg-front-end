/*
 * Arquivo: all-projects.tsx 
 *	Autor: Leonardo Barbanti
 */

"use client";
import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Container,
  List,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaRegFileCode } from "react-icons/fa6";
import { getAllProjects, deleteProjectById } from "@/src/api/projects.route";
import { IAllProjects } from "@/src/interfaces/interfaces";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import moment from "moment";

const AllProjects = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<IAllProjects[] | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const toast = useToast();

  // Effect para trazer todos os projetos do banco de dados
  useEffect(() => {
    fetchProjects();
  }, []);

  // Função para buscar todos os projetos no banco de dados
  const fetchProjects = async () => {
    try {
      // Trazendo os projetos cadastrados na base
      const response = await getAllProjects();
      const formattedDate = response.map((projects: any) => ({
        ...projects,
        createdAt: moment(projects.createdAt).format("DD-MM-YYYY"),
        updatedAt: moment(projects.updatedAt).format("DD-MM-YYYY"),
      }));

      setProjects(formattedDate);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description: "Erro ao buscar os projetos",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para deletar o projeto
  const handleDeleteDepartment = async (guid_projects: string) => {
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    try {
      if (guid_projects) {
        // Chamando a API para deletar o projeto
        const deleteProject = await deleteProjectById(
          guid_projects,
          newUserToken
        );
        setShowConfirmationModal(false);
        setProjectToDelete(null);
        fetchProjects();
        toast({
          title: "Sucesso",
          description: "Projeto deletado com sucesso!",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        return deleteProject;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar o projeto",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para abrir o modal de confirmação de exclusão
  const openConfirmationModal = (guid_projects: string) => {
    setShowConfirmationModal(true);
    setProjectToDelete(guid_projects);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setProjectToDelete(null);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <Container
            mt={{ base: "3vh", sm: "4vh" }}
            maxW="110vh"
            mb={{ base: "50%", sm: "15vh" }}
          >
            <List spacing={3}>
              <Box
                marginTop="50px"
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                mb={10}
                gap={5}
              >
                {projects &&
                  projects.map((projects, index) => (
                    <Box
                      key={index}
                      minW={{ base: "70%", sm: "280px" }}
                      maxW={{ base: "70%", sm: "280px" }}
                      boxShadow="2xl"
                      rounded={"xl"}
                      overflow={"hidden"}
                      mb={4}
                      pb={10}
                      borderWidth={1}
                      borderColor={"gray.600"}
                      position="relative"
                      style={{ position: "relative" }}
                    >
                      <Box
                        px={6}
                        py={5}
                        position="relative"
                      >
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Projeto:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {projects.projectName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Descrição do Projeto:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {projects.projectDescription}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Status do Projeto:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {projects.status}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Criado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {projects.createdAt}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Atualizado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {projects.updatedAt}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Usuário que solicitou:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {Array.isArray(projects.user)
                          ? projects.user
                              .map((user: any) => user.firstName)
                              .join(", ")
                          : projects.user}
                      </Box>
                      <Flex
                        justify="flex-end"
                        mb={2}
                        mr={4}
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                        }}
                      >
                        <Link>
                          <Button
                            position="absolute"                           
                            right={20}
                            colorScheme="blue"
                            size="sm"
                            mr={2}
                          >
                            Editar
                          </Button>
                        </Link>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() =>
                            openConfirmationModal(projects.guid_projects)
                          }
                        >
                          Excluir
                        </Button>
                      </Flex>
                    </Box>
                  ))}
              </Box>
            </List>
          </Container>
        </>
      )}
      <Modal
        isOpen={showConfirmationModal}
        onClose={closeConfirmationModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Confirmação de Exclusão
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Tem certeza de que deseja excluir este projeto?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                if (projectToDelete) {
                  handleDeleteDepartment(projectToDelete);
                }
              }}
            >
              Sim, Excluir
            </Button>
            <Button
              variant="ghost"
              onClick={closeConfirmationModal}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllProjects;
