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
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image
} from "@chakra-ui/react";

// Import the KeychainSDK
import { KeychainSDK } from "keychain-sdk";
import { Card } from "@chakra-ui/react";

interface Card {
  imageUrl: string;
  subtitle: string;
  url?: string;
  hoverImageUrl?: string;
  price?: string;
  preco?: string;
}

interface BuyModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  toAddress: string;
  setToAddress: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  hiveMemo: string;
  setHiveMemo: React.Dispatch<React.SetStateAction<string>>;
  buyingIndex: number | null;
  cardData: Card[];
  endereco: string;
  setEndereco: React.Dispatch<React.SetStateAction<string>>;
  preco: string;
}

const BuyModal: React.FC<BuyModalProps> = ({
  showModal,
  setShowModal,
  nome,
  setNome,
  email,
  setEmail,
  amount,
  setAmount,
  hiveMemo,
  setHiveMemo,
  buyingIndex,
  cardData, 
  endereco,
  setEndereco,
  preco,
}) => {
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [selectedCardPreco, setSelectedCardPreco] = useState<string | undefined>('');
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>('');
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
  });
  
  const [confirmedAddress, setConfirmedAddress] = useState<{
    street: string;
    city: string;
    state: string;
  } | null>(null);

  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);

  useEffect(() => {
    if (buyingIndex !== null) {
      setSelectedCardPreco(cardData[buyingIndex]?.preco || '');
    }
  }, [buyingIndex, cardData]);

  const confirmAddress = () => {
    setConfirmedAddress(address);
    setIsAddressConfirmed(true);
  };

  const resetAddressConfirmation = () => {
    setConfirmedAddress(null);
    setIsAddressConfirmed(false);
  };

  const secretKey = 'tormento666';
  const initialAmount = "";

  useEffect(() => {
    console.log("HiveMEMO:", hiveMemo);
  }, [hiveMemo]);

  useEffect(() => {
    if (cep.length === 8) {
      AddressByCep();
    }
  }, [cep]);

  const handleTransfer = async () => {
    try {
      const parsedAmount = parseFloat(amount).toFixed(3);
      const selectedCard = buyingIndex !== null ? cardData[buyingIndex] : null;

      const selectedCardPreco= selectedCard?.preco || '';
      function criarHiveMemo(email: string, endereco: string, card: Card, address: any): string {
        const hivememo: string = `E-mail: ${email} | Nome: ${nome} | Nome do produto: ${card.subtitle}| Logradouro: ${address.street} | Cidade: ${address.city} | Estado: ${address.state}| Complemento: ${complemento}`;
        setHiveMemo(hivememo);
        console.log("HiveMEMO:", hiveMemo);
        return CryptoJS.AES.encrypt(hivememo, secretKey).toString();
      }

      if (selectedCard) {
        const keychain = new KeychainSDK(window);
        const tempHiveMemo = criarHiveMemo(email, nome, selectedCard, address,);
        setHiveMemo((prevHiveMemo) => {
          const tempHiveMemo = criarHiveMemo(email, nome, selectedCard, address);
          if (prevHiveMemo !== tempHiveMemo) {
            console.log("Encrypted HiveMEMO:", tempHiveMemo);
            return tempHiveMemo;
          }
          return prevHiveMemo;
        });

        if (!cep || !complemento || !nome || !email) {
          alert("Por favor, preencha todos os campos obrigatórios.");
          return;
        }

        const transferParams = {
          data: {
            username: "pepe",
            to: "Soma",
            amount: selectedCardPreco,
            memo: tempHiveMemo,
            enforce: false,
            currency: "HBD",
          },
        };

        const transfer = await keychain.transfer(transferParams.data);
        console.log({ transfer });
      }
    } catch (error) {
      console.error("Transfer error:", error);
    }
  };

  const AddressByCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, localidade, uf } = response.data;

      setAddress({
        street: logradouro,
        city: localidade,
        state: uf,
      });
    } catch (error) {
      console.error("Error ing address:", error);
    }
  };

  const displayAmount = parseFloat(selectedCardPreco || '0').toFixed(2);

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
      <ModalOverlay opacity={0.2}/>
      <ModalContent bg="white" border="3px solid black">
        <ModalHeader color="blue" margin={"auto"}>{buyingIndex !== null ? cardData[buyingIndex].subtitle : ""}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box border="3px solid black" padding="10px">
            {buyingIndex !== null && (
              <Image
                src={cardData[buyingIndex].imageUrl}
                alt={`Image ${buyingIndex + 1}`}
                style={{ width: "50%", marginTop: "10px", maxWidth: "100%", display: "block", margin: "auto" }}
              />
            )}

            <Input
              placeholder={` ${displayAmount || ''} Alecrins`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              readOnly
              defaultValue={initialAmount}
              color={'black'}
            />

            <Input
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              color={"black"}
              maxLength={8}
            />

            {/* Campo para exibir o endereço confirmado */}
            {confirmedAddress && (
              <Input
                placeholder="Endereço Confirmado"
                value={`${confirmedAddress.street}, ${confirmedAddress.city}, ${confirmedAddress.state}`}
                isReadOnly
                color={"black"}
                marginBottom="1rem"
              />
            )}

            {/* Botão para confirmar o endereço */}
            {!confirmedAddress && (
              <Button colorScheme="gray" color={"blue"} onClick={confirmAddress}>
                Confirmar Endereço
              </Button>
            )}

            {/* Botão para redefinir a confirmação do endereço */}
            {isAddressConfirmed && (
              <Button colorScheme="gray" color={"blue"} onClick={resetAddressConfirmation}>
                Corrigir Endereço
              </Button>
            )}

            <Input
              placeholder="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              color={"black"}
            />

            <Input 
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value) }
              color={'black'}
            />

            <Input 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
              color={'black'}
            />
            
          </Box>
        </ModalBody>
        <ModalFooter margin={"auto"}>
          <Button colorScheme="gray" color={"red"} mr={3} onClick={handleTransfer}>
            Comprar
          </Button>
          <Button colorScheme="gray" color={"red"} onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
