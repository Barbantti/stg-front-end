/*
 * Arquivo: employee-profile.tsx
 *	Autor: Leonardo Barbanti
 */

"use client";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { employeeProfile } from "@/src/api/auth.route";
import { IEmployeesProfile } from "@/src/interfaces/interfaces";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "@/src/app/components/Loading";
import NavBar from "@/src/app/components/NavBar";
import { useRouter } from "next/navigation";
import Footer from "@/src/app/components/Footer";
import { getAllDepts } from "@/src/api/departments.route";
import { getAllDeptEmp } from "@/src/api/dept-emp.route";

const EmployeeProfile = () => {
  // Setando os states
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<IEmployeesProfile | null>(null);

  // UseEffect para carregar os dados do colaborador
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Função para carregar os dados do colaborador
  const fetchEmployeeData = async () => {
    try {
      // Verificando se o colaborador esta autenticado
      const employeeToken = localStorage.getItem("employee") as string;
      const parseEmployeeToken = JSON.parse(employeeToken);
      const newEmployeeToken = parseEmployeeToken;

      if (newEmployeeToken !== undefined) {
        // Se tiver autenticado, carrega os dados do colaborador
        const response = await employeeProfile(newEmployeeToken);

        if (response.success === true) {
          const employeeData = response.data.employee;

          if (employeeData) {
            employeeData.birthDate = moment(
              employeeData.birthDate,
              "YYYY-MM-DDT00:00:00.000-00:00"
            ).format("YYYY-MM-DD");

            employeeData.hireDate = moment(
              employeeData.hireDate,
              "YYYY-MM-DDT00:00:00.000-00:00"
            ).format("YYYY-MM-DD");

            // Chamando a rota de todos os departamentos
            const allDepartmentsData = await getAllDepts();

            // Chamando a rota de todos os departamentos vinculados
            const deptEmpData = await getAllDeptEmp();

            // ID do colaborador
            const guid_emp = employeeData.guid_emp;

            let deptEmp: string | any[] = [];

            let department: string | any[] = [];

            let guid_deptEmp;

            let deptName;
            // Verificando se o colaborador faz parte de algum departamento!
            for (let i = 0; i < deptEmpData.length; i++) {
              deptEmp.push(deptEmpData[i]);
              for (let j = 0; j < deptEmp.length; j++) {
                if (deptEmp[j].emp_guid === guid_emp) {
                  guid_deptEmp = deptEmp[j].dept_guid;
                }

                for (let i = 0; i < allDepartmentsData.length; i++) {
                  department.push(allDepartmentsData[i]);

                  for (let j = 0; j < department.length; j++) {
                    if (guid_deptEmp === department[j].guid_dept) {
                      deptName = department[j].deptName;
                    }
                  }
                }
              }
            }

            // Adicionando os dados dos departamentos e dos projetos ao colaborador
            setFormData({
              ...employeeData,
              dept_emp: deptName,
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
          "Ocorreu um erro ao carregar os dados, por favor tente novamente.",
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
                marginTop="45px"
                display="flex"
                alignItems="center"
                height="101vh"
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
                      <FormLabel fontSize={16}>Data de contratação</FormLabel>
                      <Input
                        size="md"
                        type="date"
                        name="hireDate"
                        value={formData.hireDate}
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
                  <Box mb={1}>
                    <FormControl>
                      <FormLabel fontSize={16}>Salário</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          fontSize="1em"
                          children="R$"
                        />
                        <Input
                          size="md"
                          type="number"
                          name="wage"
                          value={formData.wage}
                          isReadOnly
                        />
                      </InputGroup>
                    </FormControl>
                  </Box>

                  <Box mb={1}>
                    <FormControl>
                      <FormLabel fontSize={16}>Departamento</FormLabel>
                      <Input
                        placeholder="Departamento"
                        type="text"
                        name="deptName"
                        value={formData.dept_emp}
                        isReadOnly
                      />
                    </FormControl>
                  </Box>

                  <Box mb={1}>
                    <FormControl>
                      <FormLabel fontSize={16}>Nível de permissão</FormLabel>
                      <Input
                        placeholder="Nível de permissão"
                        type="text"
                        name="roleLevel"
                        value={formData.roleLevel}
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

export default EmployeeProfile;
