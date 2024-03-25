/*
 * Arquivo: interfaces.ts 
 *	Autor: Leonardo Barbanti
 */

export interface IUser {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IAllUser {
  guid_user: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  email?: string;
  password?: string;
}

export interface IUserProfile {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  email?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IEmployees {
  firstName: string;
  lastName: string;
  birthDate: string;
  hireDate: string;
  wage: number;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IAllEmployees {
  guid_emp: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  hireDate: string;
  wage: number;
  email: string;
}

export interface IEmployeesUpdate {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  hireDate?: string;
  wage?: number;
  password?: string;
}

export interface IEmployeesProfile {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  hireDate?: string;
  wage?: number;
  email?: string;
  roleLevel?: string;
  dept_emp: string;
  projects: string;
}

export interface IEmployeesLogin {
  email: string;
  password: string;
}

export interface IDepartments {
  deptName: string;
  Observation: string;
}

export interface IDepartmentsUpdate {
  deptName: string;
  Observation: string;
  isActive: string;
}

export interface IAllDepartments {
  guid_dept: string;
  deptName: string;
  Observation: string;
  createdAt: string;
  updatedAt: string;
  isActive: string;
}

export interface IProjects {
  projectName: string;
  projectDescription: string;
  guid_user: string;
}

export interface IAllProjects {
  guid_projects: string;
  projectName: string;
  projectDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dept_guid: string;
  user: string;
}

export interface IUserProjects {
  guid_projects: string;
  projectName: string;
  projectDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dept_guid: string;
}

export interface IDept_emp {
  dept_guid: string;
  emp_guid: string;
}

export interface IDept_empUpdate {
  dept_guid: string;
  emp_guid: string;
}

export interface IAllDept_emp {
  departments: any;
  employee: any;
  guid_deptEmp: string;
  dept_guid: string;
  emp_guid: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  deptName: string;
  isActive: string;
}

export interface IResetPass {
  password: string;
  confirmPassword?: string;
}

export interface IForgotPass {
  email: string;
}
