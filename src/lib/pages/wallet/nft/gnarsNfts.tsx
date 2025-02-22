import React, { useEffect, useState } from "react";
import { Box, Text, Grid,Flex, Image, VStack, Button } from "@chakra-ui/react";
//@ts-ignore
import { Pioneer } from "@pioneer-platform/pioneer-react";

import {
  usePioneer,
  // @ts-ignore
} from "@pioneer-platform/pioneer-react";

type NFT = {
  token: {
    medias: {
      originalUrl: string;
    }[];
    collection: {
      name: string;
      address: string;
    };
    floorPriceEth: string; 
    lastSaleEth: string;   
    lastOffer?: {
      price: string;
    };
  };
};



const GnarsNfts = () => {
  const { state } = usePioneer();
  const { api, app, context, assetContext, blockchainContext, pubkeyContext, status } = state;
  const [ETHaddress, setETHAddress] = useState("");
  const [userPortfolios, setUserPortfolios] = useState<NFT[]>([]); // Provide a type annotation for userPortfolios
  const [loading, setLoading] = useState(true);
  const defaultImageUrl = "../../../assets/loading.gif"; // Replace with the actual URL of your default image

  const onStart = async function () {
    try {
      if (app) {
        const currentAddress = app.wallets[0].wallet.accounts[0];
        console.log("currentAddress: ", currentAddress);
        setETHAddress(currentAddress);
      }
      if (ETHaddress) {
        const portfolio = await api.GetPortfolio({ address: ETHaddress.toUpperCase() });
        setUserPortfolios(portfolio.data.nfts);
        console.log("portfolio: ", userPortfolios);
        console.log(portfolio.data.nfts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onStart();
    console.log("loaded")
  }, [app, api, app?.wallets, status, pubkeyContext]);

useEffect(() => {
  onStart();
  console.log("loaded")
}
, [ETHaddress]);

  return (
    <Box>
      <center>
        <Pioneer />
        <p>Selected Wallet</p>
        <p>{ETHaddress}</p>
      </center>

      <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
      {userPortfolios
  .filter((nft) => nft.token.collection.name === "Gnars")
  .map((nft, index) => (
    <Flex
      key={index}
      borderWidth="1px"
      borderColor="blue"
      width="100%"
      alignItems="center"
      padding="10px"
      borderRadius="10px"
      bg="black"
      color="white"
    >
      {/* NFT Image */}

      <VStack alignItems="start" spacing={1} flex="1">

      {nft.token.medias[0]?.originalUrl ? (
        <Image
          src={nft.token.medias[0]?.originalUrl}
          alt={`NFT ${index}`}
          objectFit="cover"
          width="100%"
          height="100%"
          borderRadius="10px"
        />
        
        
      ) : (
        <Image
          src={defaultImageUrl}
          alt={`Default NFT ${index}`}
          objectFit="cover"
          width="100%"
          height="100%"
          borderRadius="10px"
        />
      )}
              {/* Check if last offer exists and display it */}
              {nft.token.lastSaleEth && (
                <Text>Last Sale  {Number(nft.token.lastSaleEth).toFixed(2)} ETH</Text>
              )}
              {/* Add any additional information you want to display for each NFT here */}
            </VStack>
    </Flex>
  ))}
      </Grid>
      <center>
        <Button onClick={onStart} marginTop="1rem">
          Load NFTs
        </Button>
      </center>
    </Box>
  );
};


export default GnarsNfts;