/*
 * Arquivo: create-department.tsx
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
  useToast,
} from "@chakra-ui/react";
import { IDepartments } from "@/src/interfaces/interfaces";
import { useEffect, useState } from "react";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { createNewDept } from "@/src/api/departments.route";
const CreateDepartment = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [auth, setAuth] = useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IDepartments>({
    deptName: "",
    Observation: "",
  });

  // Função para checar se o colaborador está autenticado
  useEffect(() => {
    fetchAuth();
  }, []);

  // Função para buscar os dados do colaborador para checar se está autenticado
  const fetchAuth = async () => {
    // Pegando o token do colaborador no localStorage
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    if (newEmployeeToken) {
      setAuth(true);
      setIsLoading(false);
    } else {
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
  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para realizar a validação dos dados e o cadastro do novo departamento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pegando o token do colaborador no localStorage
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    try {
      // Validando os dados com o Yup
      const schema = Yup.object({
        deptName: Yup.string().required("Nome do departamento obrigatório"),
        Observation: Yup.string().required(
          "Descrição do departamento obrigatório"
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      // Cadastrando o novo departamento chamando a API
      const response = await createNewDept(formData, newEmployeeToken);

      if (response) {
        setIsLoading(false);
        setFormData({
          deptName: "",
          Observation: "",
        });
        toast({
          title: "Sucesso",
          description: "Departamento criado com sucesso.",
          status: "success",
          duration: 8000,
          isClosable: false,
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao criar o departamento.",
          status: "error",
          duration: 8000,
          isClosable: false,
        });
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao cadastrar o novo departamento, por favor tente novamente.",
        status: "error",
        duration: 7000,
        isClosable: false,
      });
    }
  };

  return (
    <>
      {isLoading && auth ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <Box
            marginTop="45px"
            display="flex"
            height="120vh"
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
                fontSize={24}
              >
                Criar Novo Departamento
              </Heading>
              <form onSubmit={handleSubmit}>
                <Box
                  mb={1}
                  mt={5}
                >
                  <FormControl isRequired>
                    <FormLabel fontSize={16}>Nome do Departamento</FormLabel>
                    <Input
                      placeholder="Novo Departamento"
                      type="textarea"
                      name="deptName"
                      value={formData.deptName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>

                <Box mb={1}>
                  <FormControl isRequired>
                    <FormLabel fontSize={16}>
                      Descrição do Departamento
                    </FormLabel>
                    <Input
                      placeholder="Descrição do Departamento"
                      type="textarea"
                      name="Observation"
                      value={formData.Observation}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box
                  mt={4}
                  textAlign="center"
                >
                  <Button
                    colorScheme="blue"
                    type="submit"
                  >
                    Criar
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

export default CreateDepartment;
