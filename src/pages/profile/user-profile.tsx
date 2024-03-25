/*
 * Arquivo: user-profile.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { userProfile } from "@/src/api/auth.route";
import { IUserProfile } from "@/src/interfaces/interfaces";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import Footer from "@/src/app/components/Footer";

const UserProfile = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IUserProfile | null>(null);

  // UseEffect para carregar os dados do usuário
  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para buscar os dados do usuário e mostrar na tela
  const fetchUserData = async () => {
    try {
      const userToken = localStorage.getItem("user") as string;
      const parseUserToken = JSON.parse(userToken);
      const newUserToken = parseUserToken;

      if (newUserToken !== undefined) {
        setIsLoading(true);
        const response = await userProfile(newUserToken);

        if (response.success === true) {
          const userData = response.data.user;

          if (userData) {
            userData.birthDate = moment(
              userData.birthDate,
              "YYYY-MM-DDT00:00:00.000-00:00"
            ).format("YYYY-MM-DD");

            setFormData(userData);
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
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {formData && (
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
                    Perfil
                  </Heading>
                  <Box mb={1}>
                    <FormControl>
                      <FormLabel fontSize={16}>Nome</FormLabel>
                      <Input
                        placeholder="Nome"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        isReadOnly
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
                        isReadOnly
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
                        isReadOnly
                      />
                    </FormControl>
                  </Box>

                  <Box mb={1}>
                    <FormControl>
                      <FormLabel fontSize={16}>E-mail</FormLabel>
                      <Input
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        value={formData.email}
                        isReadOnly
                      />
                    </FormControl>
                  </Box>
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

export default UserProfile;
