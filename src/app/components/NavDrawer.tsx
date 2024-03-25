/*
 * Arquivo: NavDrawer.tsx 
 *	Autor: Leonardo Barbanti
 */

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Drawer de navegação para o colaborador realizar o login.

const NavDrawer: React.FC<NavDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay bg="blackAlpha.400" backdropFilter="blur(4px)">
        <DrawerContent bg="whiteAlpha.900" color="gray.850">
          <DrawerCloseButton />
          <DrawerHeader>Área do Colaborador</DrawerHeader>
          <DrawerBody>
            <Button
              as={"a"}
              p={2}
              href={"/login/employee-login"}
              fontSize={"sm"}
              fontWeight={500}
              colorScheme="blue"
              color={"white"}
            >
              LOGIN
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default NavDrawer;
