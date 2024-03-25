/*
 * Arquivo: all-dept-emp.tsx
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
import { getAllDeptEmp, deleteDeptEmpById } from "@/src/api/dept-emp.route";
import { IAllDept_emp } from "@/src/interfaces/interfaces";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import moment from "moment";

const AllDeptEmp = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState(true);
  const [deptEmp, setDeptEmp] = useState<IAllDept_emp[] | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deptEmpToDelete, setDeptEmpToDelete] = useState<string | null>(null);
  const toast = useToast();

  // Effect para trazer todas as junções entre departamentos e colaboradores!
  useEffect(() => {
    fetchDeptEmp();
  }, []);

  // Função para buscar todas as junções entre departamentos e colaboradores!
  const fetchDeptEmp = async () => {
    try {
      const response = await getAllDeptEmp();
      const formattedDate = response.map((deptEmp: any) => ({
        ...deptEmp,
        createdAt: moment(deptEmp.createdAt).format("DD-MM-YYYY"),
        updatedAt: moment(deptEmp.updatedAt).format("DD-MM-YYYY"),
      }));

      setDeptEmp(formattedDate);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description: "Erro ao buscar os dados!",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para deletar o vinculo entre departamentos e colaboradores
  const handleDeleteDepartment = async (guid_deptEmp: string) => {
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    try {
      if (guid_deptEmp) {
        // Chamar a API para deletar o vinculo
        const deleteDeptEmp = await deleteDeptEmpById(
          guid_deptEmp,
          newEmployeeToken
        );
        setShowConfirmationModal(false);
        setDeptEmpToDelete(null);
        fetchDeptEmp();
        toast({
          title: "Sucesso",
          description: "Vinculo deletado com sucesso!",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        return deleteDeptEmp;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar o vinculo",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para abrir a modal de confirmação de exclusão
  const openConfirmationModal = (guid_deptEmp: string) => {
    setShowConfirmationModal(true);
    setDeptEmpToDelete(guid_deptEmp);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setDeptEmpToDelete(null);
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
                {deptEmp &&
                  deptEmp.map((deptEmp, index) => (
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
                          Departamento Vinculado:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {deptEmp.departments.deptName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Colaborador Vinculado:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {deptEmp.employee.firstName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Criado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {deptEmp.createdAt}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Atualizado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {deptEmp.updatedAt}
                      </Box>
                      <Flex
                        justify="space-between"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                        }}
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
                            openConfirmationModal(deptEmp.guid_deptEmp)
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
          <ModalBody>Tem certeza de que deseja excluir este vinculo?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                if (deptEmpToDelete) {
                  handleDeleteDepartment(deptEmpToDelete);
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

export default AllDeptEmp;
