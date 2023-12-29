import React from 'react';
import { Flex, Box, Grid, Image, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
interface Card {
  imageUrl: string;
  subtitle: string;
  url?: string;
  hoverImageUrl?: string;
}

const cardData: Card[] = [
  {
    imageUrl: '../../../../assets/leofoto.jpg',
    hoverImageUrl: '../../../../assets/leo.gif', 
    subtitle: 'XVLAD',
    url: ''
    },
    {
    imageUrl: '../../../../assets/arthurcampos.jpg',
    hoverImageUrl: '../../../../assets/campos.gif',
    subtitle: 'ARTHUR CAMPOS',
    },

  {
    imageUrl: '../../../../assets/miguelzinho.jpg',
    hoverImageUrl: '../../../../assets/miguelzinho.gif',
    subtitle: 'Miguelzinho',
  },
  {
    imageUrl: '../../../../assets/pujol.jpg',
    hoverImageUrl: '../../../../assets/pujol.gif',
    subtitle: 'PUJOLEDUARDO',
  },
 
 
];

const Equipe: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
      <>
        <center>
          <Text fontSize={"48px"} color={"black"}>
            Equipe
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
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              style={{ filter: 'grayscale(100%)' }}
              bg='black'
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
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                    src={hoveredIndex === index ? card.hoverImageUrl || card.imageUrl : card.imageUrl}
                    alt={`Image ${index + 1}`}
                  />

                </div>
              </RouterLink>
  
              <VStack spacing={2} align="center" p={4}>
                <center>
                  <Flex alignItems="center">
                    <ChakraLink
                      as={RouterLink}
                      to={card.url || '/'}
                      fontSize="lg"
                      fontWeight="bold"
                      marginLeft={'8px'}
                      color={'white'}
                    >
                      {card.subtitle}
                    </ChakraLink>
                  </Flex>
                </center>
              </VStack>
            </Box>
          ))}
        </Grid>
      </>
    );
};

export default Equipe;