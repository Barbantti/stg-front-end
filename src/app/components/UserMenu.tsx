/*
 * Arquivo: UserMenu.tsx 
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Flex,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { employeeProfile, logout } from "@/src/api/auth.route";
import Loading from "./Loading";

const UserMenu = () => {
  // Setando os states e suas tipagens
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [auth, setAuth] = useState<Boolean>(false);
  const [isUser, setIsUser] = useState<Boolean>(false);
  const [isEmployee, setIsEmployee] = useState<Boolean>(false);
  const [isDevRole, setIsDevRole] = useState<Boolean>(false);
  const router = useRouter();
  const toast = useToast();

  // Effect para detectar se o usuário ou colaborador esta autenticado
  useEffect(() => {
    fetchAuth();
  }, [isUser, isEmployee]);

  // Função para verificar se é um usuário ou um colaborador
  const fetchAuth = async () => {
    setIsLoading(true);
    try {
      // Acessando o token do usuário no localStorage
      const userToken = localStorage.getItem("user") as string;
      const parseUserToken = JSON.parse(userToken);
      const newUserToken = parseUserToken;

      // Acessando o token do colaborador no localStorage
      const employeeToken = localStorage.getItem("employee") as string;
      const parseEmployeeToken = JSON.parse(employeeToken);
      const newEmployeeToken = parseEmployeeToken;

      // Verificando se o token do usuário ou do colaborador existe para realizar a autenticação
      if (newUserToken || newEmployeeToken !== null) {
        if (newUserToken) {
          setIsUser(true);
        } else if (newEmployeeToken) {
          const response = await employeeProfile(newEmployeeToken);

          if (response.data.employee.roleLevel === "employee") {
            setIsEmployee(true);
          } else if (
            response.data.employee.roleLevel === "developer" ||
            "admin"
          ) {
            setIsDevRole(true);
          }
        }
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  // Função para realizar logout do usuário ou colaborador removendo o token de autenticação do localStorage
  const handleLogout = () => {
    setIsLoading(true);

    try {
      const logoutSuccess = logout();

      if (logoutSuccess) {
        setAuth(false);
        router.push("/");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast({
          title: "Erro",
          description:
            "Ocorreu um erro ao realizar o logout, por favor tente novamente.",
          status: "error",
          duration: 7000,
          isClosable: false,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao realizar o logout, por favor tente novamente.",
        status: "error",
        duration: 7000,
        isClosable: false,
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        py={2}
        transition="all 0.3s"
        _focus={{ boxShadow: "none" }}
      >
        <Flex align="center">
          <Stack direction="row">
            <Avatar
              bg="blue.500"
              size="sm"
            />
          </Stack>
          <Box display={{ base: "none", md: "flex" }}>
            <FiChevronDown />
          </Box>
        </Flex>
      </MenuButton>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MenuList
            bg="white"
            borderColor="gray.200"
          >
            {isUser ? (
              <>
                <MenuItem
                  as="a"
                  href="/profile/user-profile"
                >
                  Perfil
                </MenuItem>

                <MenuItem
                  as="a"
                  href="/update/user-update"
                >
                  Atualizar
                </MenuItem>

                <MenuItem
                  as="a"
                  href="/projects/user-projects"
                >
                  Meus Projetos
                </MenuItem>

                <MenuItem
                  as="a"
                  href="/projects/new-project/create-project"
                >
                  Novo Projeto
                </MenuItem>
              </>
            ) : isEmployee ? (
              <>
                <MenuItem
                  as="a"
                  href="/profile/employee-profile"
                >
                  Perfil
                </MenuItem>

                <MenuItem
                  as="a"
                  href="/update/employee-update"
                >
                  Atualizar
                </MenuItem>
              </>
            ) : isDevRole ? (
              <>
                <MenuItem
                  as="a"
                  href="/profile/employee-profile"
                >
                  Perfil
                </MenuItem>

                <MenuItem
                  as="a"
                  href="/update/employee-update"
                >
                  Atualizar
                </MenuItem>
                <MenuItem
                  as="a"
                  href="/admin/admin-area"
                >
                  Admin
                </MenuItem>
              </>
            ) : null}
            <MenuDivider />

            <MenuItem
              as="a"
              href="/"
              onClick={handleLogout}
            >
              Sair
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default UserMenu;
