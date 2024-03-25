/*
 * Arquivo: user-register.tsx
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
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { userRegister } from "@/src/api/auth.route";
import { IUser } from "@/src/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Loading from "@/src/app/components/Loading";
import Footer from "@/src/app/components/Footer";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";

const UserRegister = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [auth, setAuth] = useState<Boolean>(false);
  const [isNotTrueAuth, setIsNotTrueAuth] = useState<Boolean>(false);
  const [show, setShow] = React.useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IUser>({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Função para mostrar ou esconder a senha
  const handleClick = () => setShow(!show);

  // Effect para detectar se o usuário esta autenticado
  useEffect(() => {
    fetchAuth();
  }, [auth, isNotTrueAuth]);

  // Função para verificar se é um usuário ou um colaborador e se esta autenticado ou nao, se estiver autenticado redireciona para a tela inicial, pois ja fez login, se nao estiver autenticado autoriza o acesso a pagina de registro para que o mesmo seja realizado.
  const fetchAuth = async () => {
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    if (newUserToken || newEmployeeToken) {
      // Se estiver autenticado, redireciona para home page.
      router.push("/");
      setAuth(true);
      setIsNotTrueAuth(true);
      setIsLoading(false);
    } else {
      // Se não, libera o acesso.
      setAuth(false);
    }
    setIsLoading(false);
  };

  // Função para capturar os dados preenchidos pelo usuário
  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para realizar a validação dos dados e o registro do usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Removendo o campo de preenchimento de confirmação de senha (pois nao e necessário no back-end).
    const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

    // Se as senhas forem diferentes, exibe uma mensagem de erro, se nao seguem as validações!
    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      return toast({
        title: "Erro",
        description:
          "A senha e confirmação de senha devem ser iguais, tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    try {
      // Fazendo a validação dos campos preenchidos com o Yup
      const schema = Yup.object({
        firstName: Yup.string().required("Campo obrigatório"),
        lastName: Yup.string().required("Campo obrigatório"),
        birthDate: Yup.string().required("Campo obrigatório"),
        email: Yup.string()
          .required("Campo obrigatório")
          .email("Email inválido"),
        password: Yup.string()
          .required("Campo obrigatório")
          .min(6, "A senha deve ter pelo menos 6 dígitos"),
      });

      await schema.validate(formDataWithoutConfirmPassword, {
        abortEarly: false,
      });

      // Realizando o registro do usuário
      const response = await userRegister(formDataWithoutConfirmPassword);

      // Se o registro for efetuado com sucesso, exibe uma mensagem de sucesso e redireciona para a tela inicial, se o registro falhar, exibe uma mensagem de erro
      if (response.success === true) {
        router.push("/");
        setAuth(true);
        setIsNotTrueAuth(true);
        setIsLoading(false);
        toast({
          title: "Sucesso",
          description: "Cadastro realizado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      } else if (response.success === false) {
        setIsLoading(false);
        toast({
          title: "Erro",
          description:
            "Ocorreu um erro ao realizar o cadastro, por favor tente novamente.",
          status: "error",
          duration: 7000,
          isClosable: false,
        });
        return response.success;
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao realizar o cadastro, por favor tente novamente.",
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
          {auth || isNotTrueAuth ? (
            <Loading />
          ) : (
            <>
              <NavBar />
              <Box
                marginTop="45px"
                display="flex"
                height="79vh"
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
                    Nova conta
                  </Heading>
                  <form onSubmit={handleSubmit}>
                    <Box mb={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={16}>Nome</FormLabel>
                        <Input
                          placeholder="Nome"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </Box>
                    <Box mb={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={16}>Sobre nome</FormLabel>
                        <Input
                          placeholder="Sobre Nome"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </Box>
                    <Box mb={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={16}>Data de nascimento</FormLabel>
                        <Input
                          size="md"
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </Box>

                    <Box mb={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={16}>E-mail</FormLabel>
                        <Input
                          placeholder="E-mail"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </Box>
                    <Box mb={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={16}>Senha</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Digite Senha"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleClick}
                            >
                              {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box mb={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={16}>Confirme a Senha</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Confirme a Senha"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
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
                        Registrar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserRegister;
