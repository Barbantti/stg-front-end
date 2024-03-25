/*
 * Arquivo: user-update.tsx
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
import { updateUserById } from "@/src/api/user.route";
import { userProfile } from "@/src/api/auth.route";
import { IUserUpdate } from "@/src/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import moment from "moment";
import * as Yup from "yup";
import Loading from "@/src/app/components/Loading";
import Footer from "@/src/app/components/Footer";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";

const UserUpdate = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isDisable, setIsDisable] = useState<Boolean>(false);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IUserUpdate>({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
  });

  // Função para habilitar ou desabilitar a edição dos dados do formulário
  const handleButtonEdit = () => {
    setIsEditing(!isEditing);
    setIsDisable(!isDisable);
  };

  // Effect para chamar a função para buscar os dados do usuário
  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    try {
      const userToken = localStorage.getItem("user") as string;
      const parseUserToken = JSON.parse(userToken);
      const newUserToken = parseUserToken;

      if (newUserToken !== undefined) {
        setIsLoading(true);
        // Buscando os dados do usuário
        const response = await userProfile(newUserToken);

        if (response.success === true) {
          const userData = response.data.user;

          if (userData) {
            // Formatando a data de nascimento
            userData.birthDate = moment(
              userData.birthDate,
              "YYYY-MM-DDT00:00:00.000-00:00"
            ).format("YYYY-MM-DD");

            setFormData({
              firstName: userData.firstName,
              lastName: userData.lastName,
              birthDate: userData.birthDate,
              password: userData.password,
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

  // Função para capturar os dados preenchidos pelo usuário
  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para realizar a validação dos dados e o update do usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pegando o token do usuário no localStorage
    const userToken = localStorage.getItem("user") as string;
    const parseUserToken = JSON.parse(userToken);
    const newUserToken = parseUserToken;

    // Pegando os dados do usuário através do token no localStorage
    const userProfile = localStorage.getItem("userProfile") as string;
    const parseUserProfile = JSON.parse(userProfile);
    const guid_user = parseUserProfile.user.guid_user;

    try {
      // Validando os dados do usuário com o Yup
      const schema = Yup.object({
        firstName: Yup.string().notRequired(),
        lastName: Yup.string().notRequired(),
        birthDate: Yup.string().notRequired(),
        email: Yup.string().notRequired(),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const response = await updateUserById(guid_user, formData, newUserToken);

      // Se o update dos dados do usuário for realizado com sucesso, desabilita o botão de atualizar e habilita o botão de editar e envia uma mensagem de sucesso. Se nao, cai no catch e envia uma mensagem de erro.
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

export default UserUpdate;
