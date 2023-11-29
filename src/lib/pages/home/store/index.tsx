import React from 'react';
import { Flex, Box, Grid, Image, Text, VStack, Link as ChakraLink, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import BuyModal from './buyModal2';
interface Card {
  imageUrl: string;
  subtitle: string;
  url?: string;
  hoverImageUrl?: string;
  price?: string;
}

const cardData: Card[] = [
  {
    imageUrl: '/assets/loja/bermudaazul.jpg',
    hoverImageUrl: '', // Specify hover image URL
    subtitle: 'Bermuda Azul',
    url: '',
    price: 'Valor: 149,90'
    },
    {
    imageUrl: '/assets/loja/shapeazul.jpg',
    subtitle: 'Shape Marfim Azul',
    price: 'Valor: 189,90'
    },

  {
    imageUrl: '/assets/loja/shape.jpg',
    subtitle: 'Shape Selvagem',
    price: 'Valor: 349,90'
  },
  {
    imageUrl: '/assets/loja/marrom.jpg',
    subtitle: ' Camiseta SoMa Marrom ',
    price: 'Valor: 99,90'
  },
  {
    imageUrl: '/assets/loja/cruiser.jpg',
    subtitle: 'SoMa ShApE Cruizer',
    hoverImageUrl: '',
    price: 'Valor: 249,90'
  },
  {
    imageUrl: '/assets/loja/bermudaamarela.jpg',
    subtitle: 'SoMa Bermuda AmarelA',
    url: '',
    hoverImageUrl: '',
    price: 'Valor: 149,90'
  },
  {
    imageUrl: '/assets/loja/marinho.jpg',
    subtitle: 'SomA Camiseta Marinho',
    price: 'Valor: 99,90'
  },
  {
    imageUrl: '/assets/loja/verde.jpg',
    subtitle: 'SoMa Teleferico Verde',
    url: '',
    price: 'Valor: 99,90'
    
  },
  {
    imageUrl: '/assets/loja/telefericopreto.jpg',
    subtitle: 'SoMa Camiseta Teleferico Preta',
    url: '',
    price: 'Valor: 99,90'
    
  },
  {
    imageUrl: '/assets/loja/somaclassic.jpg',
    subtitle: 'Shape SoMa classic Marfim',
    url: '',
    price: 'Valor: 189,90'
    
  },
  {
    imageUrl: '/assets/loja/shouldersoma.jpg',
    subtitle: 'Shoulder Bag SoMa Vermelha',
    url: '',
    price: 'Valor: 99,90'
    
  },
  {
    imageUrl: '/assets/loja/casacosoma.jpg',
    subtitle: 'Moletom SoMa',
    url: '',
    price: 'Valor: 99,90'
    
  },

];

const Store: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [hiveMemo, setHiveMemo] = useState("");
    const [endereco, setEndereco] = useState(""); // Make sure these are declared
const [email, setEmail] = useState("");
    const handleOpenModal = () => {
      setShowModal(true);
      console.log(showModal)
    };
    const handleBuy = (index: number) => {
      handleOpenModal()
      console.log(`Compra do item ${index + 1}`);
  }

  
    

    return (
      <>
        <center>
          <Text fontSize={"48px"} color={"#b4d701"} >
            LOJA
          </Text>
        </center>
  
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={4}
          p={4}
        >
          {cardData.map((card, index) => (
            <Box
              key={index}
              borderWidth="3px"
              borderRadius="lg"
              borderColor={"black"}
              overflow="hidden"
              style={{ filter: 'initial' }}
              bg='white'
            >
              <RouterLink to={card.url || '/'}>
                <div
                  style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'initial',
                      transition: 'transform 0.3s ease-in-out',
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                    src={hoveredIndex === index ? card.hoverImageUrl || card.imageUrl : card.imageUrl}
                    alt={`Image ${index + 1}`}
                  />
                  <Image
                    boxSize={10}
                    src='/assets/somalogo.ico'
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      transform: 'scale(0)',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                </div>
              </RouterLink>
  
              <VStack spacing={2} align="center" p={4}>
                <center>
                    <Flex alignItems="center">
                    <Image
                        boxSize={10}
                        src='/assets/somalogo.ico'
                    />
                    <ChakraLink
                        as={RouterLink}
                        to={card.url || '/'}
                        fontSize="sm"
                        fontWeight="bold"
                        marginLeft={'8px'}
                        color={'black'}
                    >
                        {card.subtitle}
                    </ChakraLink>
                    </Flex>
                    {card.price && <Text fontSize="md" color="black">{card.price}</Text>}
                    <Button onClick={() => handleBuy(index)}>Comprar</Button>
                </center>
                </VStack>
                <BuyModal 
  showModal={showModal}
  email={email}
  setShowModal={setShowModal}
  toAddress={toAddress}
  setToAddress={setToAddress}
  amount={amount}
  setAmount={setAmount}
  hiveMemo={hiveMemo}
  setHiveMemo={setHiveMemo}
  endereco={endereco}
  setEndereco={setEndereco}
setEmail={setEmail}

/>

            </Box>
          ))}
        </Grid>

      </>

    );
};

export default Store;