/*
 * Arquivo: user-forgot.tsx
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
import { forgotUserPassword, userResetPassword } from "@/src/api/auth.route";
import { IForgotPass, IResetPass } from "@/src/interfaces/interfaces";
import { useState } from "react";
import React from "react";
import Loading from "@/src/app/components/Loading";
import Footer from "@/src/app/components/Footer";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const UserReset = () => {
  //Setando os estados
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [token, setIsToken] = useState("");
  const [show, setShow] = React.useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [forgotData, setIsForgotData] = useState<IForgotPass>({
    email: "",
  });

  const [resetPassData, setIsResetPassData] = useState<IResetPass>({
    password: "",
    confirmPassword: "",
  });

  // Função para mostrar ou esconder a senha
  const handleClick = () => setShow(!show);

  // Função para capturar o email preenchido pelo usuário
  const handleForgotInputChange = (e: {
    target: { name: string; value: any };
  }) => {
    const { name, value } = e.target;
    setIsForgotData({ ...forgotData, [name]: value });
  };

  // Função para enviar o email para redefinir a senha
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validando o email com o Yup
      const schema = Yup.object({
        email: Yup.string()
          .required("Campo obrigatório")
          .email("Email invalido"),
      });

      await schema.validate(forgotData, {
        abortEarly: false,
      });

      // Enviando o email para redefinir a senha
      const response = await forgotUserPassword(forgotData);

      if (response.success === true) {
        setIsToken(response.data);
      } else {
        toast({
          title: "Erro",
          description: "Email inválido, por favor tente novamente",
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
          "Ocorreu um erro ao realizar a redefinição de senha, por favor tente novamente.",
        status: "error",
        duration: 7000,
        isClosable: false,
      });
    }
  };

  // Caso o email seja valido, então retorna da API um token valido por apenas 15 min para redefinir a senha que segue a partir desta parte abaixo.

  // Função para capturar a nova senha preenchida pelo usuário
  const handleResetInputChange = (e: {
    target: { name: string; value: any };
  }) => {
    const { name, value } = e.target;
    setIsResetPassData({ ...resetPassData, [name]: value });
  };

  // Função para redefinir a senha
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Se as senhas forem diferentes, exibe uma mensagem de erro, se nao seguem as validações
    if (resetPassData.password !== resetPassData.confirmPassword) {
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

    // Removendo o campo de preenchimento de confirmação de senha (pois nao e necessário no back-end).
    const { confirmPassword, ...resetPassDataWithoutConfirmPassword } =
      resetPassData;

    try {
      // Validando a nova senha com o Yup
      const schema = Yup.object({
        password: Yup.string()
          .required("Campo obrigatório")
          .min(6, "A senha deve ter pelo menos 6 dígitos"),
      });

      await schema.validate(resetPassDataWithoutConfirmPassword, {
        abortEarly: false,
      });

      // Enviando a nova senha para o back-end
      const response = await userResetPassword(
        token,
        resetPassDataWithoutConfirmPassword.password
      );

      if (response.success === true) {
        toast({
          title: "Sucesso",
          description: "Senha redefinida com sucesso",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
        router.push("/profile/user-profile");
      } else {
        toast({
          title: "Erro",
          description: "Senha inválida, por favor tente novamente",
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
          "Ocorreu um erro ao realizar a redefinição de senha, por favor tente novamente.",
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
          <>
            {token !== "" ? (
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
                    Insira a Nova Senha
                  </Heading>
                  <form onSubmit={handleResetSubmit}>
                    <FormControl
                      isRequired
                      mb={3}
                    >
                      <FormLabel fontSize={16}>Senha</FormLabel>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Digite Senha"
                          name="password"
                          id="password"
                          value={resetPassData.password}
                          onChange={handleResetInputChange}
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
                      <FormLabel fontSize={16}>Confirme a Senha</FormLabel>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Confirme a Senha"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={resetPassData.confirmPassword}
                          onChange={handleResetInputChange}
                        />
                      </InputGroup>
                    </FormControl>

                    <Button
                      mt={4}
                      type="submit"
                      colorScheme="blue"
                      isLoading={isLoading}
                      size="sm"
                      width="full"
                    >
                      Enviar
                    </Button>
                  </form>
                  <Flex
                    mt="2"
                    justifyContent="center"
                    my="4"
                  ></Flex>
                </Box>
              </Box>
            ) : (
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
                    Recuperar Senha
                  </Heading>
                  <form onSubmit={handleForgotSubmit}>
                    <FormControl
                      isRequired
                      mb={3}
                    >
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        value={forgotData.email}
                        onChange={handleForgotInputChange}
                      />
                    </FormControl>
                    <Button
                      mt={4}
                      type="submit"
                      colorScheme="blue"
                      isLoading={isLoading}
                      size="sm"
                      width="full"
                    >
                      Recuperar
                    </Button>
                  </form>
                  <Flex
                    mt="2"
                    justifyContent="center"
                    my="4"
                  ></Flex>
                </Box>
              </Box>
            )}
          </>
          <Footer />
        </>
      )}
    </>
  );
};

export default UserReset;
