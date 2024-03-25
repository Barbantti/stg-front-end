/*
 * Arquivo: all-users.tsx
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
import { deleteUserById, getAllUsers } from "@/src/api/user.route";
import { IAllUser } from "@/src/interfaces/interfaces";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import moment from "moment";

const AllUsers = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<IAllUser[] | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const toast = useToast();

  // Effect para trazer todos os usuários do banco de dados
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para buscar todos os usuários no banco de dados
  const fetchUsers = async () => {
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;
    try {
      // Trazendo os usuários cadastrados na base
      const response = await getAllUsers(newUserToken);
      const formattedDate = response.map((users: any) => ({
        ...users,
        birthDate: moment(users.birthDate).format("DD-MM-YYYY"),
      }));
      setUsers(formattedDate);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description: "Erro ao buscar os usuários",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para deletar o usuário
  const handleDeleteDepartment = async (guid_user: string) => {
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    try {
      if (guid_user) {
        // Chamando a API para deletar o usuário
        const deleteUser = await deleteUserById(guid_user, newUserToken);
        setShowConfirmationModal(false);
        setUserToDelete(null);
        fetchUsers();
        toast({
          title: "Sucesso",
          description: "Usuário deletado com sucesso!",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        return deleteUser;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar o usuário",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para abrir o modal de confirmação de exclusão
  const openConfirmationModal = (guid_user: string) => {
    setShowConfirmationModal(true);
    setUserToDelete(guid_user);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setUserToDelete(null);
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
                {users &&
                  users.map((users, index) => (
                    <Box
                      key={index}
                      minW={{ base: "70%", sm: "280px" }}
                      maxW={{ base: "70%", sm: "280px" }}
                      boxShadow="2xl"
                      rounded={"xl"}
                      overflow={"hidden"}
                      mb={4}
                      borderWidth={1}
                      borderColor={"gray.600"}
                      position="relative"
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
                          Usuário:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {users.firstName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Sobre nome:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {users.lastName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Nasceu em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {users.birthDate}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Email:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {users.email}
                      </Box>
                      <Flex
                        justify="flex-end"
                        mb={2}
                        mr={4}
                      >
                        <Link>
                          <Button
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
                          onClick={() => openConfirmationModal(users.guid_user)}
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
          <ModalBody>Tem certeza de que deseja excluir este usuário?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                if (userToDelete) {
                  handleDeleteDepartment(userToDelete);
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

export default AllUsers;
