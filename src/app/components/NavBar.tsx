/*
 * Arquivo: navbar.ts 
 *	Autor: Leonardo Barbanti
 */

"use client";
import { Box, Flex, Button, useDisclosure, Container } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { employeeProfile } from "@/src/api/auth.route";
import NavDrawer from "./NavDrawer";
import UserMenu from "./UserMenu";

export const NavBar = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [auth, setAuth] = useState<Boolean>(false);
  const [isUser, setIsUser] = useState<Boolean>(false);
  const [isEmployee, setIsEmployee] = useState<Boolean>(false);
  const [isDevRole, setIsDevRole] = useState<Boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchAuth();
  }, []);

  // Função para verificar se o usuário está autenticado e se é um usuário ou um colaborador e suas permissões de acesso!
  const fetchAuth = async () => {
    setIsLoading(true);
    try {

      // Pegando o token no localStorage do usuário
      const userToken = localStorage.getItem("user") as string;
      const parseUserToken = JSON.parse(userToken);
      const newUserToken = parseUserToken;

      // Pegando o token no localStorage do colaborador
      const employeeToken = localStorage.getItem("employee") as string;
      const parseEmployeeToken = JSON.parse(employeeToken);
      const newEmployeeToken = parseEmployeeToken;

      // Verificando se o token do usuário ou do colaborador existe para realizar a autenticação
      if (newUserToken || newEmployeeToken !== null) {
        setAuth(true);
        
        if (newUserToken) {
          setIsUser(true);
        } else if (newEmployeeToken) {
          const response = await employeeProfile(newEmployeeToken);
          setAuth(true);
          if (response.data.employee.roleLevel === "developer" || "admin") {
            setIsDevRole(true);
          }

          setIsEmployee(true);
        }
      } else {
        setAuth(false);
      }
      setIsLoading(false);
    } catch (e) {
      setAuth(false);
      setIsLoading(false);
    }
  };

  const NavDrawerButton = () => {
    return (
      <>
        {auth ? null : (
          <>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={onOpen}
            >
              <HamburgerIcon />
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            as="nav"
            p={4}
            boxShadow="md"
            py={6}
          >
            <Container maxW="110vh">
              <Flex w="100%">
                <Flex
                  align="center"
                  justify="flex-start"
                  flex="1"
                >
                  <Button
                    as={"a"}
                    p={2}
                    href={"/"}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={"gray.600"}
                    colorScheme="white"
                    _hover={{
                      textDecoration: "none",
                      color: "gray.800",
                    }}
                  >
                    HOME
                    </Button>
                    <Button
                        as={"a"}
                        p={2}
                        href={"/quem-somos"}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={"gray.600"}
                        colorScheme="white"
                        _hover={{
                          textDecoration: "none",
                          color: "gray.800",
                        }}
                      >
                        QUEM SOMOS
                      </Button>
                </Flex>

                {auth && (isUser || isEmployee) ? <UserMenu /> : null}

                {!auth && (
                  <>
                    <Flex
                      align="center"
                      justify="flex-end"
                      mr="15px"
                    >
                      <Button
                        as={"a"}
                        p={2}
                        href={"/login/user-login"}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={"gray.600"}
                        colorScheme="white"
                        _hover={{
                          textDecoration: "none",
                          color: "gray.800",
                        }}
                      >
                        LOGIN
                      </Button>
                    </Flex>
                    <Flex
                      align="center"
                      justify="flex-end"
                    >
                      <NavDrawerButton />
                      {
                        <NavDrawer
                          isOpen={isOpen}
                          onClose={onClose}
                        />
                      }
                    </Flex>
                  </>
                )}
              </Flex>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default NavBar;
