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
    imageUrl: '../../../../assets/leoxvlad.jpeg',
    hoverImageUrl: '../../../../assets/.gif', // Specify hover image URL
    subtitle: 'XVLAD',
    url: 'https://crowsnight.vercel.app/profile/xvlad'
    },
    {
    imageUrl: '../../../../assets/arthurcampos.jpg',
    hoverImageUrl: '../../../../assets/.gif',
    subtitle: 'ARTHUR CAMPOS',
    },

  {
    imageUrl: '../../../../assets/miguelzinho.jpg',
    hoverImageUrl: '../../../../assets/team/',
    subtitle: 'Miguelzinho',
  },
  {
    imageUrl: '../../../../assets/team/',
    hoverImageUrl: '',
    subtitle: '',
  },
  {
    imageUrl: '../../../../assets/team/',
    subtitle: '',
    url: 'https://crowsnight.vercel.app/profile/xvlad',
    hoverImageUrl: '../../../../assets/team/vlad_hover.gif',
  },
  {
    imageUrl: '../../../../assets/team/',
    subtitle: 'Pharra',
    url: 'https://crowsnight.vercel.app/profile/pharra',
    hoverImageUrl: '../../../../assets/team/',
  },
  {
    imageUrl: '../../../../assets/team/',
    subtitle: 'Defon',
    hoverImageUrl: '../../../../assets/team/',
    url: 'https://crowsnight.vercel.app/profile/doblershiva'
  },
  {
    imageUrl: '../../../../assets/team/',
    subtitle: 'Bruno Boaz',
    hoverImageUrl: '../../../../assets/team/',
    url: ''
  },
  { 
    imageUrl: '../../../../assets/team/',
    subtitle: 'Meola',
    hoverImageUrl: '../../../../assets/team/',
    url: ''
  },

];

const Equipe: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
      <>
        <center>
          <Text fontSize={"48px"} color={"#b4d701"}>
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
                  <Image
                    boxSize={10}
                    src='https://i.pinimg.com/originals/00/10/0a/00100af8e857761d150425dbc8213d69.gif'
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
                      src='https://i.pinimg.com/originals/00/10/0a/00100af8e857761d150425dbc8213d69.gif'
                    />
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