/*
 * Arquivo: all-departments.tsx
 *	Autor: Leonardo Barbanti
 */

import React, { useEffect, useState, useRef } from "react";
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
} from "@chakra-ui/react";
import { FaRegFileCode } from "react-icons/fa6";
import { getAllDepts, deleteDeptById } from "@/src/api/departments.route";
import { IAllDepartments } from "@/src/interfaces/interfaces";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import moment from "moment";

const AllDepartments = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState<IAllDepartments[] | null>(
    null
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(
    null
  );
  const toast = useToast();

  // Função para buscar os dados de todos os departamentos
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      // Trazendo os departamentos cadastrados na base
      const response = await getAllDepts();
      // Formatando a data para o padrão brasileiro
      const formattedDepartments = response.map((department: any) => ({
        ...department,
        createdAt: moment(department.createdAt).format("DD-MM-YYYY"),
        updatedAt: moment(department.updatedAt).format("DD-MM-YYYY"),
      }));
      setDepartments(formattedDepartments);
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

  // Função para deletar o departamento
  const handleDeleteDepartment = async (guid_dept: string) => {
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    try {
      if (guid_dept) {
        // Chamar a API para deletar o departamento
        await deleteDeptById(guid_dept, newEmployeeToken);
        setShowConfirmationModal(false);
        setDepartmentToDelete(null);
        fetchDepartments();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar o departamento",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para abrir a modal de confirmação de exclusão
  const openConfirmationModal = (guid_dept: string) => {
    setShowConfirmationModal(true);
    setDepartmentToDelete(guid_dept);
  };

  // Função para salvar o id do departamento no localStorage
  const fetchDepartmentId = (guid_dept: string) => {
    if (guid_dept) {
      localStorage.setItem("guid_dept", guid_dept);
    }
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setDepartmentToDelete(null);
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
                {departments &&
                  departments.map((department, index) => (
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
                          Departamento:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {department.deptName}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Observação:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {department.Observation}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Criado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {department.createdAt}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Atualizado em:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {department.updatedAt}
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          py={1}
                        >
                          Ativo:
                        </Text>
                        <FaRegFileCode color="blue.400" />
                        {department.isActive}
                      </Box>
                      <Link href="/admin/departments/update-departments/edit-department">
                        <Button
                          position="absolute"
                          bottom={6}
                          right={28}
                          colorScheme="blue"
                          size="sm"
                          onClick={() =>
                            fetchDepartmentId(department.guid_dept)
                          }
                        >
                          Editar
                        </Button>
                      </Link>
                      <Button
                        position="absolute"
                        bottom={6}
                        right={6}
                        colorScheme="red"
                        size="sm"
                        onClick={() =>
                          openConfirmationModal(department.guid_dept)
                        }
                      >
                        Excluir
                      </Button>
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
            Tem certeza de que deseja excluir este departamento?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                if (departmentToDelete) {
                  handleDeleteDepartment(departmentToDelete);
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

export default AllDepartments;
