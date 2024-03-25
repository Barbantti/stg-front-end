/*
 * Arquivo: all-employees.tsx
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
import { deleteEmployeeById, getAllEmployees } from "@/src/api/employee.route";
import { IAllEmployees } from "@/src/interfaces/interfaces";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import moment from "moment";

const AllEmployees = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<IAllEmployees[] | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const toast = useToast();

  // Effect para trazer todos os colaboradores
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Função para buscar todos os colaboradores no banco de dados
  const fetchEmployees = async () => {
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;
    try {
      // Chama a API para buscar todos os colaboradores
      const response = await getAllEmployees(newEmployeeToken);
      const formattedDate = response.map((employees: any) => ({
        ...employees,
        birthDate: moment(employees.birthDate).format("DD-MM-YYYY"),
        hireDate: moment(employees.hireDate).format("DD-MM-YYYY"),
      }));
      setEmployees(formattedDate);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description: "Erro ao buscar o departamentos",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para deletar o colaborador do banco de dados
  const handleDeleteDepartment = async (guid_emp: string) => {
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    try {
      if (guid_emp) {
        // Chama a API para deletar o colaborador
        const deleteEmployee = await deleteEmployeeById(
          guid_emp,
          newEmployeeToken
        );
        setShowConfirmationModal(false);
        setEmployeeToDelete(null);
        fetchEmployees();
        toast({
          title: "Sucesso",
          description: "Colaborador deletado com sucesso!",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        return deleteEmployee;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar o colador",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para abrir a modal de confirmação de exclusão
  const openConfirmationModal = (guid_emp: string) => {
    setShowConfirmationModal(true);
    setEmployeeToDelete(guid_emp);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setEmployeeToDelete(null);
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
                {employees &&
                  employees.map((employees, index) => (
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
                          Colaborador:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {employees.firstName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Sobre nome:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {employees.lastName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Nasceu em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {employees.birthDate}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Contratado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {employees.hireDate}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Salario:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {employees.wage}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Email:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {employees.email}
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
                          onClick={() =>
                            openConfirmationModal(employees.guid_emp)
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
          <ModalBody>
            Tem certeza de que deseja excluir este colaborador?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                if (employeeToDelete) {
                  handleDeleteDepartment(employeeToDelete);
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

export default AllEmployees;
