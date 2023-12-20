import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js';
import {
  Modal,
  Button,
  Input,
  Box,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

// Importe o KeychainSDK
import { KeychainSDK } from "keychain-sdk";

interface SendHiveModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  hiveMemo: string;
  setHiveMemo: React.Dispatch<React.SetStateAction<string>>;
}


const BuyModal: React.FC<SendHiveModalProps> = ({
  showModal,
  setShowModal,
  hiveMemo,
  setHiveMemo,
}) => {
  const [nome, setNome] = useState("");
  const [amount, setAmount] = useState("");
  const [chavepix, setChavepix] = useState("");
  const keychain = new KeychainSDK(window);
  const secretKey = '';

  useEffect(() => {
    console.log("HiveMEMO:", hiveMemo);
  }, [hiveMemo]);

  const handleTransfer = async () => {
    try {
      const parsedAmount = parseFloat(amount).toFixed(3);

      function criarHiveMemo(nome: string, chavepix: string, amount: string): string {
        const hivememo: string = `Nome: ${nome}, Chave PIX: ${chavepix}, Valor ${parseFloat(amount).toFixed(3)}`;
        setHiveMemo(hivememo);
        console.log("HiveMEMO:", hiveMemo);

        return CryptoJS.AES.encrypt(hivememo, secretKey).toString();
      }

      if (!nome || !chavepix || !amount) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Definir parâmetros de transferência
      const transferParams = {
        data: { 
          to: "beaglexv",
          amount: parseFloat(amount).toFixed(3),
          memo: criarHiveMemo(nome, chavepix, amount),
          enforce: false,
          currency: "HIVE",
        },
      };
      console.log(transferParams)

      // Substituir 'selectedCard' pela lógica apropriada do seu aplicativo
      const transfer = await keychain.transfer(transferParams.data);
      // console.log({ transfer });
    } catch (error) {
      console.error("Transfer error:", error);
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
      <ModalOverlay opacity={0.2}/>
      <ModalContent bg="black" border="3px solid #5e317a">
        <ModalCloseButton />
        <ModalBody>
          <Box border="3px solid #5e317a" padding="10px">
            <Input
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              color={'white'}
            />
            <Input
              placeholder="Chave pix"
              value={chavepix}
              onChange={(e) => setChavepix(e.target.value)}
              color={"white"}
            />
            <Input
              placeholder="Alecrins"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              defaultValue={amount}
              color={'white'}
            />
          </Box>
        </ModalBody>
        <ModalFooter margin={"auto"}>
          <Button colorScheme="black" color={"#b4d701"} mr={3} onClick={handleTransfer}>
            Sacar
          </Button>
          <Button colorScheme="purple" color={"#b4d701"} onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;