import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Flex,
  Image,
} from "@chakra-ui/react";

import useAuthUser from "./useAuthUser.js";

interface HiveLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const HiveLogin: React.FC<HiveLoginProps> = ({ isOpen, onClose}) => {
  const [username, setUsername] = useState("");
  const { loginWithHive, user } = useAuthUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginWithHive(username);
    setUsername("");
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSignUp = () => {
    window.open("https://discord.gg/skatehive", "_blank");
  };
  const logout = () => {
    setUsername("");
    sessionStorage.removeItem("user");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit} backgroundColor="#D5E2FD" border="1px solid #5E317A">
        <ModalHeader color="#5E317A"><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <p style={{ margin: '10px' }}>SoMa ou SuMa </p> </div></ModalHeader>
        <Image border="1px solid red" margin="20px" borderRadius="10px" src="assets/loading.gif" alt="SkateHive" />
        <ModalCloseButton color="black"/>
        <ModalBody>
          {user && user.name ? (
            <p>Welcome, {user.name}!</p>
          ) : (
            <>
              <Input
                type="text"
                name="username"
                color="black"
                placeholder="Username"
                backgroundColor="white"
                border="1px solid red"
                value={username}
                onChange={handleInputChange}
                required
              />
              <Flex paddingTop="20px" justifyContent={"center"}>

              <Button
  border="1px solid red"
  type="submit"
  backgroundColor="white"
  style={{ transition: "background-color 0.3s" }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#E0001B"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#65418C"}
>
  Entrar
</Button>


              </Flex>
              
            </>
          )}
        </ModalBody>
        <ModalFooter>
        {user && user.name ? (
          <>
            <Button border="1px solid red" onClick={logout}>LogOut</Button>
          </>
          ) : (
            <>
            </>
          )}
          </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HiveLogin;
