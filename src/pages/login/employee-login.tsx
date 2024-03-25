/*
 * Arquivo: employee-login.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { employeeLogin } from "@/src/api/auth.route";
import { IEmployeesLogin } from "@/src/interfaces/interfaces";
import { useEffect, useState } from "react";
import React from "react";
import Loading from "@/src/app/components/Loading";
import Footer from "@/src/app/components/Footer";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const EmployeeLogin = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [auth, setAuth] = useState<Boolean>(false);
  const [isNotTrueAuth, setIsNotTrueAuth] = useState<Boolean>(false);
  const [show, setShow] = useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [loginData, setLoginData] = useState<IEmployeesLogin>({
    email: "",
    password: "",
  });
  // Função para mostrar ou esconder a senha
  const handleClick = () => setShow(!show);

  // Effect para verificar autenticação
  useEffect(() => {
    fetchAuth();
  });

  // Função para verificar autenticação do colaborador
  const fetchAuth = async () => {
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    if (newEmployeeToken) {
      router.push("/");
      setAuth(true);
      setIsNotTrueAuth(true);
      setIsLoading(false);
    } else {
      setAuth(false);
      setIsLoading(false);
    }
  };

  // Função para capturar os dados preenchidos pelo colaborador
  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Função para realizar o login do colaborador
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validando o email e a senha com o Yup
      const schema = Yup.object({
        email: Yup.string()
          .required("Campo obrigatório")
          .email("Email invalido"),
        password: Yup.string()
          .required("Campo obrigatório")
          .min(6, "A senha deve ter pelo menos 6 dígitos"),
      });

      await schema.validate(loginData, {
        abortEarly: false,
      });

      // Enviando os dados para realizar o login
      const response = await employeeLogin(loginData);

      if (response.success === true) {
        router.push("/");
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      } else {
        toast({
          title: "Erro",
          description: "Email ou senha inválidos, por favor tente novamente",
          status: "error",
          duration: 7000,
          isClosable: false,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao realizar o login, por favor tente novamente.",
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
                marginTop="50px"
                display="flex"
                height="79vh"
                alignItems="center"
                flexDirection="column"
              >
                <Box
                  border="1px solid"
                  borderColor="gray.400"
                  borderRadius="md"
                  p={6}
                >
                  <Heading
                    textAlign="center"
                    mb={4}
                  >
                    Login do Colaborador
                  </Heading>
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isRequired
                      mb={3}
                    >
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl
                      isRequired
                      mb={3}
                    >
                      <FormLabel>Senha</FormLabel>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Digite Senha"
                          name="password"
                          value={loginData.password}
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

                    <Button
                      type="submit"
                      colorScheme="blue"
                      isLoading={isLoading}
                      size="sm"
                      width="full"
                    >
                      Login
                    </Button>
                  </form>
                  <Flex
                    mt="2"
                    justifyContent="center"
                    my="4"
                  >
                    <Button
                      as={"a"}
                      p={2}
                      href={"/forgot-password/employee-forgot"}
                      fontSize={"sm"}
                      fontWeight={500}
                      color={"gray.600"}
                      colorScheme="white"
                      _hover={{
                        textDecoration: "none",
                        color: "blue.500",
                      }}
                    >
                      Esqueceu a senha?
                    </Button>

                    <Button
                      as={"a"}
                      p={2}
                      href={"/register/employee-register"}
                      fontSize={"sm"}
                      fontWeight={500}
                      color={"gray.600"}
                      colorScheme="white"
                      _hover={{
                        textDecoration: "none",
                        color: "blue.500",
                      }}
                    >
                      Criar nova conta?
                    </Button>
                  </Flex>
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

export default EmployeeLogin;
