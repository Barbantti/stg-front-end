/*
 * Arquivo: edit-department.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { getDeptById, updateDeptById } from "@/src/api/departments.route";
import { IDepartmentsUpdate } from "@/src/interfaces/interfaces";

const DepartmentUpdate = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<IDepartmentsUpdate>({
    deptName: "",
    Observation: "",
    isActive: "",
  });
  const router = useRouter();
  const toast = useToast();

  // Função para habilitar ou desabilitar a edição dos dados do formulário
  const handleButtonEdit = () => {
    setIsEditing(!isEditing);
    setIsDisable(!isDisable);
  };

  // Função para buscar os dados do departamento
  useEffect(() => {
    fetchDepartmentData();
  }, []);

  // Função para buscar os dados do departamento
  const fetchDepartmentData = async () => {
    try {
      // Pegando o token do colaborador no localStorage
      const employeeToken = localStorage.getItem("employee") as string;
      const parseEmployeeToken = JSON.parse(employeeToken);
      const newEmployeeToken = parseEmployeeToken;

      // Pegando o id do departamento no localStorage
      const guid_dept = localStorage.getItem("guid_dept");

      if (guid_dept !== null) {
        if (newEmployeeToken !== undefined) {
          const response = await getDeptById(guid_dept, newEmployeeToken);

          if (response) {
            setFormData({
              deptName: response.deptName,
              Observation: response.Observation,
              isActive: response.isActive,
            });
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      router.push("/");
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao carregar os dados, por favor tente novamente.",
        status: "error",
        duration: 8000,
        isClosable: false,
      });
    }
  };

  // Função para capturar os dados preenchidos pelo colaborador
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para realizar a validação dos dados e o update do departamento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pegando o token do colaborador no localStorage
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    // Pegando o id do departamento no localStorage
    const guid_dept = localStorage.getItem("guid_dept");

    try {
      // Validando os dados com o Yup
      const schema = Yup.object({
        deptName: Yup.string().notRequired(),
        Observation: Yup.string().notRequired(),
        isActive: Yup.string().notRequired(),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      if (guid_dept !== null) {
        // Atualizando o departamento chamando a API
        const response = await updateDeptById(
          guid_dept,
          formData,
          newEmployeeToken
        );

        if (response) {
          setIsLoading(true);
          toast({
            title: "Sucesso",
            description: "Departamento atualizado com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: false,
          });
          router.push("/admin/departments/all-departments");
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao atualizar o departamento, por favor tente novamente.",
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
          <NavBar />
          <Box
            marginTop="50px"
            display="flex"
            height="78vh"
            alignItems="center"
            flexDirection="column"
          >
            <Box
              border="1px solid"
              borderRadius="md"
              p={6}
              maxWidth="500px"
              width="100%"
            >
              <Heading
                textAlign="center"
                mb={2}
              >
                Atualização de departamento
              </Heading>
              <form onSubmit={handleSubmit}>
                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Nome do departamento</FormLabel>
                    <Input
                      placeholder="Nome do departamento"
                      type="text"
                      name="deptName"
                      value={formData.deptName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>

                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>
                      Observação do departamento
                    </FormLabel>
                    <Input
                      placeholder="Observação do departamento"
                      type="text"
                      name="Observation"
                      value={formData.Observation}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Esta ativo?</FormLabel>
                    <Input
                      placeholder="Esta ativo?"
                      type="text"
                      name="isActive"
                      value={formData.isActive}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>
                <Box mt={5}>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isDisabled={!isEditing}
                    marginRight="5"
                  >
                    Atualizar
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleButtonEdit}
                  >
                    {isEditing ? "Cancelar Edição" : "Editar"}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default DepartmentUpdate;
