/*
 * Arquivo: employee-update.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { updateEmployeeById } from "@/src/api/employee.route";
import { employeeProfile } from "@/src/api/auth.route";
import { IEmployeesUpdate } from "@/src/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import moment from "moment";
import * as Yup from "yup";
import Loading from "@/src/app/components/Loading";
import Footer from "@/src/app/components/Footer";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";

const EmployeeUpdate = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isDisable, setIsDisable] = useState<Boolean>(false);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IEmployeesUpdate>({
    firstName: "",
    lastName: "",
    birthDate: "",
    hireDate: "",
    wage: 0,
    password: "",
  });

  // Função para habilitar ou desabilitar a edição dos dados do formulário
  const handleButtonEdit = () => {
    setIsEditing(!isEditing);
    setIsDisable(!isDisable);
  };

  // Effect para chamar a função para buscar os dados do colaborador
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Função para buscar os dados do colaborador
  const fetchEmployeeData = async () => {
    try {
      const employeeToken = localStorage.getItem("employee") as string;
      const parseEmployeeToken = JSON.parse(employeeToken);
      const newEmployeeToken = parseEmployeeToken;

      if (newEmployeeToken !== undefined) {
        setIsLoading(true);
        // Buscando os dados do colaborador
        const response = await employeeProfile(newEmployeeToken);

        if (response.success === true) {
          const employeeData = response.data.employee;

          if (employeeData) {
            // Formatando a data de nascimento
            employeeData.birthDate = moment(
              employeeData.birthDate,
              "YYYY-MM-DDT00:00:00.000-00:00"
            ).format("YYYY-MM-DD");

            // Formatando a data de contratação
            employeeData.hireDate = moment(
              employeeData.hireDate,
              "YYYY-MM-DDT00:00:00.000-00:00"
            ).format("YYYY-MM-DD");

            setFormData({
              firstName: employeeData.firstName,
              lastName: employeeData.lastName,
              birthDate: employeeData.birthDate,
              hireDate: employeeData.hireDate,
              wage: employeeData.wage,
              password: employeeData.password,
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
          "Ocorreu um erro carregar os dados, por favor tente novamente.",
        status: "error",
        duration: 8000,
        isClosable: false,
      });
    }
  };

  // Função para capturar os dados preenchidos pelo colaborador
  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para realizar a validação dos dados e o update do colaborador
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pegando o token do colaborador no localStorage
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    // Pegando os dados do colaborador através do token no localStorage
    const employeeProfile = localStorage.getItem("employeeProfile") as string;
    const parseEmployeeProfile = JSON.parse(employeeProfile);
    const guid_emp = parseEmployeeProfile.employee.guid_emp;

    // Validando os dados do colaborador com o Yup
    try {
      const schema = Yup.object({
        firstName: Yup.string().notRequired(),
        lastName: Yup.string().notRequired(),
        birthDate: Yup.string().notRequired(),
        hireDate: Yup.string().notRequired(),
        wage: Yup.number().notRequired(),
        email: Yup.string().notRequired(),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });
      // Realizando o update dos dados do colaborador chamando a API
      const response = await updateEmployeeById(
        guid_emp,
        formData,
        newEmployeeToken
      );

      // Se o update dos dados do colaborador for realizado com sucesso, desabilita o botão de atualizar e habilita o botão de editar e envia uma mensagem de sucesso. Se nao, cai no catch e envia uma mensagem de erro.
      if (response) {
        setIsEditing(!isEditing);
        setIsDisable(!isDisable);
        setIsLoading(false);
        toast({
          title: "Sucesso",
          description: "Registro atualizado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao atualizar o registro, por favor tente novamente.",
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
                Atualização
              </Heading>
              <form onSubmit={handleSubmit}>
                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Nome</FormLabel>
                    <Input
                      placeholder="Nome"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>

                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Sobre nome</FormLabel>
                    <Input
                      placeholder="Sobre Nome"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>

                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Data de nascimento</FormLabel>
                    <Input
                      size="md"
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Data de contração</FormLabel>
                    <Input
                      size="md"
                      type="date"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <FormControl>
                    <FormLabel fontSize={16}>Salário</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        fontSize="1em"
                        children="R$"
                      />
                      <Input
                        size="md"
                        type="number"
                        name="wage"
                        value={formData.wage}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </InputGroup>
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
          <Footer />
        </>
      )}
    </>
  );
};

export default EmployeeUpdate;
