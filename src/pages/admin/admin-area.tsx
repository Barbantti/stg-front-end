/*
 * Arquivo: admin-area.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Box,
  Heading,
  Flex,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import NavBar from "../../app/components/NavBar";
import Link from "next/link";

// Area do Admin, so tem acesso quem tem permissão de 'admin' ou 'developer'!
const AdminArea = () => {
  return (
    <>
      <NavBar />
      <Flex
        marginTop="50px"
        display="flex"
        alignItems="center"
        height="78vh"
        flexDirection="column"
      >
        <Box p={8}>
          <Heading
            as="h1"
            mb={5}
            textAlign="center"
          >
            Bem-vindo ao Admin
          </Heading>
          <UnorderedList
            listStyleType="none"
            padding={0}
          >
            <ListItem>
              <Link href="/admin/employees/all-employees">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width="100%"
                  mb={2}
                >
                  Todos Colaboradores
                </Button>
              </Link>
            </ListItem>
            <Link href="/admin/dept-emp/all-dept-emp">
              <Button
                colorScheme="blue"
                variant="solid"
                width="100%"
                mb={2}
              >
                Departamentos Vinculados
              </Button>
            </Link>
            <Link href="/admin/dept-emp/new-dept-emp/create-dept-emp">
              <Button
                colorScheme="blue"
                variant="solid"
                width="100%"
                mb={2}
              >
                Criar novo vinculo Dept/Emp
              </Button>
            </Link>
            <ListItem>
              <Link href="/admin/departments/all-departments">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width="100%"
                  mb={2}
                >
                  Todos Departamentos
                </Button>
              </Link>
              <Link href="/admin/departments/new-department/create-department">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width="100%"
                  mb={2}
                >
                  Criar Novo Departamento
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/admin/users/all-users">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width="100%"
                  mb={2}
                >
                  Todos Usuários
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/admin/projects/all-projects">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width="100%"
                >
                  Todos Projetos
                </Button>
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    </>
  );
};

export default AdminArea;
