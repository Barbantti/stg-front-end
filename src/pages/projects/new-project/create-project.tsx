/*
 * Arquivo: create-project.tsx
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
import { userProfile } from "@/src/api/auth.route";
import { createNewProject } from "@/src/api/projects.route";
import { IProjects } from "@/src/interfaces/interfaces";
import { useEffect, useState } from "react";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import Footer from "@/src/app/components/Footer";
import * as Yup from "yup";
const CreateProject = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [auth, setAuth] = useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IProjects>({
    projectName: "",
    projectDescription: "",
    guid_user: "",
  });

  // Effect para verificar se o usuário está autenticado
  useEffect(() => {
    fetchAuth();
  }, []);

  // Função para buscar os dados do usuário para checar se o usuário está autenticado
  const fetchAuth = async () => {
    // Pegando o token do usuário no localStorage
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    // Verificando se o token do usuário existe e se existir, retornar os dados do usuário
    const getUserData = await userProfile(newUserToken);

    setFormData({
      ...formData,
      guid_user: getUserData.data.user.guid_user,
    });

    if (newUserToken) {
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

  // Função para capturar os dados preenchidos pelo usuário
  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para criar um novo projeto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pegando o token do usuário no localStorage
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    try {
      // Validando os dados do projeto com o Yup!
      const schema = Yup.object({
        projectName: Yup.string().required("Nome do projeto obrigatório"),
        projectDescription: Yup.string().required(
          "Descrição do projeto obrigatório"
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      if (formData.guid_user !== "") {
        // Cadastrando o novo projeto chamando a API
        const response = await createNewProject(formData, newUserToken);

        if (response) {
          setIsLoading(false);
          toast({
            title: "Sucesso",
            description: "Projeto criado com sucesso.",
            status: "success",
            duration: 8000,
            isClosable: false,
          });
        } else {
          setIsLoading(false);
          toast({
            title: "Erro",
            description: "Ocorreu um erro ao criar o projeto.",
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
                Solicitar Novo Projeto
              </Heading>
              <form onSubmit={handleSubmit}>
                <Box
                  mb={1}
                  mt={5}
                >
                  <FormControl isRequired>
                    <FormLabel fontSize={16}>Nome do Projeto</FormLabel>
                    <Input
                      placeholder="Novo Projeto"
                      type="textarea"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>

                <Box mb={1}>
                  <FormControl isRequired>
                    <FormLabel fontSize={16}>Descrição do Projeto</FormLabel>
                    <Input
                      placeholder="Descrição do Projeto"
                      type="textarea"
                      name="projectDescription"
                      value={formData.projectDescription}
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
                    Solicitar
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

export default CreateProject;
