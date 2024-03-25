/*
 * Arquivo: create-dept-emp.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  useToast,
} from "@chakra-ui/react";
import { getAllDepts } from "@/src/api/departments.route";
import { getAllEmployees } from "@/src/api/employee.route";
import { createNewDeptEmp } from "@/src/api/dept-emp.route";
import { IDept_emp } from "@/src/interfaces/interfaces";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const CreateDeptEmp = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [formData, setFormData] = useState<IDept_emp>({
    dept_guid: "",
    emp_guid: "",
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  const toast = useToast();

  // Effect para realizar a autenticação, trazer os departamentos e os colaboradores do banco de dados!
  useEffect(() => {
    fetchAuth();
    fetchDepartments();
    fetchEmployees();
  }, [departments, employees]);

  // Função para buscar os dados do colaborador para checar se está autenticado
  const fetchAuth = async () => {
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

  // Função para buscar os dados de todos os departamentos
  const fetchDepartments = async () => {
    try {
      const dept = await getAllDepts();

      setDepartments(dept);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar os departamentos",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  // Função para buscar os dados de todos os colaboradores
  const fetchEmployees = async () => {
    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;
    try {
      const emp = await getAllEmployees(newEmployeeToken);

      setEmployees(emp);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "Erro",
        description: "Erro ao buscar os colaboradores",
        status: "error",
        duration: 8000,
        isClosable: true,
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

  // Função para realizar a validação dos dados e o cadastro do novo colaborador com departamento (Junção)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const employeeToken = localStorage.getItem("employee") as string;
    const parseEmployeeToken = JSON.parse(employeeToken);
    const newEmployeeToken = parseEmployeeToken;

    try {
      const schema = Yup.object({
        dept_guid: Yup.string().required("Nome do departamento obrigatório"),
        emp_guid: Yup.string().required(
          "Descrição do departamento obrigatória"
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      // Realizando a nova junção entre departamento e colaborador!
      const response = await createNewDeptEmp(formData, newEmployeeToken);

      if (response) {
        setIsLoading(false);
        setFormData({
          dept_guid: "",
          emp_guid: "",
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
                Criar Novo Vínculo
              </Heading>
              <form onSubmit={handleSubmit}>
                <Box
                  mb={1}
                  mt={5}
                >
                  <FormControl isRequired>
                    <FormLabel fontSize={16}>Departamento</FormLabel>
                    <Select
                      placeholder="Selecione um departamento"
                      name="dept_guid"
                      value={formData.dept_guid}
                      onChange={handleInputChange}
                    >
                      {departments &&
                        departments.map((dept: any) => (
                          <option
                            key={dept.guid_dept}
                            value={dept.guid_dept}
                          >
                            {dept.deptName}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box mb={1}>
                  <FormControl isRequired>
                    <FormLabel fontSize={16}>Colaborador</FormLabel>
                    <Select
                      placeholder="Selecione um colaborador"
                      name="emp_guid"
                      value={formData.emp_guid}
                      onChange={handleInputChange}
                    >
                      {employees &&
                        employees.map((emp: any) => (
                          <option
                            key={emp.guid_emp}
                            value={emp.guid_emp}
                          >
                            {emp.firstName} {emp.lastName}
                          </option>
                        ))}
                    </Select>
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

export default CreateDeptEmp;
