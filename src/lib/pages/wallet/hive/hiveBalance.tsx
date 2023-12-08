import { Image, Link, Box, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, Button, VStack, HStack, Divider, Tooltip } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import SendHiveModal from "./sendHiveModal";
import SendHBDModal from "./sendHBDmodal";
import useAuthUser from "lib/pages/home/api/useAuthUser";
import * as dhive from "@hiveio/dhive";
// import WalletTransactions from "lib/pages/home/dao/components/hiveGnars/txHistory";
import PowerUpModal from "./powerUpModal";
import PowerDownModal from "./powerDownModal";
import DelegationModal from "./delegationModal";
import { useFetcher } from "react-router-dom";


const dhiveClient = new dhive.Client([
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network",
]);

const HIVE_LOGO_URL = "https://cryptologos.cc/logos/hive-blockchain-hive-logo.png";
const HBD_LOGO_URL = "https://i.ibb.co/C6TPhs3/HBD.png";
const SAVINGS_LOGO_URL = "https://i.ibb.co/rMVdTYt/savings-hive.png";
const HIVE_POWER_LOGO_URL = "https://i.ibb.co/C9bCZBp/hive-power.png";
const DEFAULT_AVATAR_URL = "https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif";

interface User {
  balance: string;
  hbd_balance: string;
  savings_hbd_balance: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  name?: string;
  posting_json_metadata?: string;
  metadata: any;
}

// send to utils.tsx
// Create a caching object
export const cache: { conversionRate?: number, hbdPrice?: number } = {};

export function resetCache() {
  cache.conversionRate = undefined;
  cache.hbdPrice = undefined;
  console.log("Cache reset");
}
// send to utils.tsx


const styles = `
  @keyframes glow {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

export async function fetchHbdPrice() {
  try {
    if (cache.hbdPrice !== undefined) {
      // Use the cached value if available
      return cache.hbdPrice;
    }
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=hive_dollar&vs_currencies=brl");
    const data = await response.json();
    const hbdPrice = data.hive_dollar.brl;
    // Update the cache
    cache.hbdPrice = hbdPrice;
    return hbdPrice;
  } catch (error) {
    console.error("Error fetching HBD price:", error);
    return 0;
  }
};

// send to utils.tsx
export async function fetchConversionRate() {
  try {
    if (cache.conversionRate !== undefined) {
      // Use the cached value if available
      return cache.conversionRate;
    }
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=brl");
    const data = await response.json();
    const conversionRate = data.hive.brl;
    // Update the cache
    cache.conversionRate = conversionRate;
    return conversionRate; // Return the conversion rate as a number
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return 0;
  }
};

export default function HiveBalanceDisplay2() {
  const { user } = useAuthUser() as { user: User | null };
  const [hiveBalance, setHiveBalance] = useState<string>("0");
  const [hivePower, setHivePower] = useState<string>("0");
  const [hbdBalance, setHbdBalance] = useState<string>("0");
  const [savingsBalance, setSavingsBalance] = useState<string>("0");
  const [showModal, setShowModal] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [totalWorth, setTotalWorth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hiveMemo, setHiveMemo] = useState("");
  const [showPowerUpModal, setShowPowerUpModal] = useState(false);
  const [showPowerDownModal, setShowPowerDownModal] = useState(false);
  const [showDelegationModal, setShowDelegationModal] = useState(false);
  const [sendHBDmodal, setSendHBDmodal] = useState(false);
  const [ownedTotal, setOwnedTotal] = useState<number>(0);
  const [profileImage, setProfileImage] = useState<string>("https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif");
  const [delegatedToUserInUSD, setDelegatedToUserInUSD] = useState<string>("0");
  const [HPdelegatedToUser, setHPdelegatedToUser] = useState<string>("0");

  const convertVestingSharesToHivePower = async (
    vestingShares: string,
    delegatedVestingShares: string,
    receivedVestingShares: string
  ) => {
    const vestingSharesFloat = parseFloat(vestingShares.split(" ")[0]);
    console.log("vestingSharesFloat", vestingSharesFloat)
    const delegatedVestingSharesFloat = parseFloat(delegatedVestingShares.split(" ")[0]);
    console.log("delegatedVestingSharesFloat", delegatedVestingSharesFloat)
    const receivedVestingSharesFloat = parseFloat(receivedVestingShares.split(" ")[0]);
    console.log("receivedVestingSharesFloat", receivedVestingSharesFloat)
    const availableVESTS = vestingSharesFloat - delegatedVestingSharesFloat ;
    console.log("availableVESTS", availableVESTS)

    const response = await fetch('https://api.hive.blog', {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'condenser_api.get_dynamic_global_properties',
        params: [],
        id: 1,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const vestHive =
      (parseFloat(result.result.total_vesting_fund_hive) * availableVESTS) /
      parseFloat(result.result.total_vesting_shares);
    
    const DelegatedToSomeoneHivePower =
      (parseFloat(result.result.total_vesting_fund_hive) * delegatedVestingSharesFloat) /
      parseFloat(result.result.total_vesting_shares);

    const delegatedToUserInUSD = (parseFloat(result.result.total_vesting_fund_hive) * receivedVestingSharesFloat) /
    parseFloat(result.result.total_vesting_shares);
    const HPdelegatedToUser = (parseFloat(result.result.total_vesting_fund_hive) * receivedVestingSharesFloat) /
    parseFloat(result.result.total_vesting_shares);
    return {
      hivePower: vestHive.toFixed(3), 
      DelegatedToSomeoneHivePower: DelegatedToSomeoneHivePower.toFixed(3),
      delegatedToUserInUSD: delegatedToUserInUSD.toFixed(3),
      HPdelegatedToUser: HPdelegatedToUser.toFixed(3),
    };

  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user) {
        try {
          const metadata = JSON.parse(user.posting_json_metadata || '');
          setProfileImage(metadata.profile.profile_image);
        } catch (error) {
          console.error('Error parsing JSON metadata:', error);
        }
      }
    };
    fetchProfileImage();
  }
  , [user]);


  const onStart = async function () {
    if (user) {
      try {
        const [conversionRate, hbdPrice, vestingSharesData] = await Promise.all([
          fetchConversionRate(),
          fetchHbdPrice(),
          convertVestingSharesToHivePower(
            user.vesting_shares,
            user.delegated_vesting_shares,
            user.received_vesting_shares
          ),
        ]);

        const hiveWorth = parseFloat(user.balance.split(" ")[0]) * conversionRate;
        const hivePowerWorth =
          (parseFloat(vestingSharesData.hivePower) + parseFloat(vestingSharesData.DelegatedToSomeoneHivePower)) *
          conversionRate;
        const hbdWorth = parseFloat(user.hbd_balance.split(" ")[0]) * hbdPrice;
        const delegatedToUserInUSD = parseFloat(vestingSharesData.delegatedToUserInUSD) * conversionRate;
        const savingsWorth = parseFloat(user.savings_hbd_balance.split(" ")[0]) * hbdPrice;
        const HPdelegatedToUser = parseFloat(vestingSharesData.HPdelegatedToUser) 
        const total = hiveWorth + hivePowerWorth + hbdWorth + savingsWorth + delegatedToUserInUSD; 
        const total_Owned = Number(hiveWorth) + Number(savingsWorth) + Number(hbdWorth) + Number(hivePowerWorth) ;
        setConversionRate(conversionRate);
        setHbdBalance(user.hbd_balance);
        setHiveBalance(user.balance);
        setSavingsBalance(user.savings_hbd_balance);
        setHivePower(`${vestingSharesData.DelegatedToSomeoneHivePower} (emprestado para outros  + ${vestingSharesData.hivePower} (te dando um boost)`);
        setTotalWorth(total);
        setIsLoading(false);
        setOwnedTotal(total_Owned);
        setDelegatedToUserInUSD(`${delegatedToUserInUSD.toFixed(3).toString()} USD em Poder de Voto`); 
        setHPdelegatedToUser(`${HPdelegatedToUser.toFixed(3).toString()} HP emprestado para vc`);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  
  useEffect(() => {
    onStart();
  }, [user]);
  

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the default button click behavior
    setShowModal(true);
  };
  
  const handleLogoClick = (balanceType: string) => {
    console.log(`Clicked ${balanceType} logo`);
  };
  const handleOpenPowerUpModal = () => {
    setShowPowerUpModal(true);
  };
  const handleOpenPowerDownModal = () => {
    setShowPowerDownModal(true);
  };
  const handleOpenDelegationModal = () => {
    setShowDelegationModal(true);
  };
  const handleOpenSendHBDModal = () => {
    setSendHBDmodal(true);
  }
  return (
    <Box
      borderRadius="12px"
      border="2px solid red"
      padding="10px"
      maxWidth={{ base: "100%", md: "100%" }}
    >
      <VStack spacing={4} align="stretch">
        <Flex alignItems="center" justifyContent="center" padding="10px">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {user ? (
              <Flex>
                <>
                  <Image
                    src={`https://images.hive.blog/u/${user.name}/avatar`}
                    alt="profile avatar"
                    borderRadius="20px"
                    border="2px solid blue"
                    boxSize="80px"
                  />
                  <Text fontSize="32px" padding="10px" color="black">
                    {user.name}
                  </Text>
                </>
                <VStack>
                  <Button
                    width="170px"
                    borderRadius="10px"
                    border="1px dashed black"
                    justifyContent="center"
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "grey" }}
                    onClick={handleOpenPowerUpModal}
                  >
                    🔺 Ascender o Cosmos
                  </Button>
                  <Button
                    width="170px"
                    borderRadius="10px"
                    border="1px dashed black"
                    justifyContent="center"
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "grey" }}
                    onClick={handleOpenPowerDownModal}
                  >
                    🔻 Dar uma Broxada
                  </Button>
                  
                </VStack>
              </Flex>
            ) : (
              <>
                <Image
                  src={DEFAULT_AVATAR_URL}
                  alt="pepito"
                  borderRadius="20px"
                  boxSize="60px"
                />
              </>
            )}
          </Box>
        </Flex>
        <Divider backgroundColor="red" />
  
        {isLoading ? (
          <center>
            <Image width="60px" src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
            <Text color="black">Loading...</Text>
          </center>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="center">
              <VStack>

              <Text fontWeight="bold" color="black">
                Meu Total: ${ownedTotal.toFixed(2)}
              </Text>
              <Text fontWeight="bold" color="black">
                Valor da Minha Carteira: ${totalWorth.toFixed(2)}
              </Text>
              </VStack>
            </Flex>
            <Divider backgroundColor="red" />
            <HStack spacing={4} align="stretch">
              <BalanceDisplay
                label="Dinheiro Magico da Internet"
                balance={hiveBalance}
                labelTooltip="Native Token of Hive Blockchain"
                balanceTooltip="Hive tokens are like digital coins on the Hive blockchain, and they have different uses. You can vote on stuff, get premium features, and help with the network and decision-making by staking them. They also reward content makers, keep users engaged, and you can trade them elsewhere. They basically keep Hive running, adding value and community vibes. 🛹🚀"
              ></BalanceDisplay>
              <BalanceDisplay
                label="Poder de Voto"
                balance={hivePower}
                labelTooltip="Hive Power signifies influence, voting, and status within Hive blockchain. 🚀🤝"
                balanceTooltip="Hive Power represents a user's influence and engagement within the Hive blockchain. It's like your reputation and impact score on the platform. When you ´power up Hive tokens by converting liquid Hive into Hive Power, you increase your ability to vote on content and participate in network governance. This boosts your say in decision-making and supports the Hive ecosystem's stability and decentralization. It's like investing in your standing and community involvement on Hive. 🚀🤝s"
              />
  
            </HStack>
            <HStack spacing={4} align="stretch">
              <BalanceDisplay
                label="Poupança em Dollar"
                balance={savingsBalance}
                labelTooltip="Hive Savings are like a savings account for your HBD tokens. 🚀🤝"
                balanceTooltip="Picture it like planting some Hive coins, but in this case, they're Hive Backed Dollars (HBD), kind of like specialized cannabis strains. You nurture them over time, and they steadily grow. With a 20% increase each year, it's like cultivating a thriving HBD garden. You're investing your time and care, and eventually, you'll have a bountiful harvest of HBD, just like some potent homegrown herb. So, you're tending to your HBD crop, man, and it's growing just as nicely as your favorite buds. 🌱💵🚀"
              />
              <BalanceDisplay
                label="Dollar"
                color="black"
                balance={hbdBalance}
                labelTooltip="Hive Backed Dollar (HBD) is a stablecoin pegged to the US Dollar"
                balanceTooltip="Hive Backed Dollars (HBD) are a stablecoin on the Hive blockchain designed to maintain a value close to one United States dollar. They are backed by Hive cryptocurrency held in a collateralized debt position. HBD provides users with a stable and reliable digital currency for transactions, making it a practical choice for everyday use within the Hive ecosystem."
                labelLink='https://giveth.io/es/project/skatehive-skateboarding-community'
  
              />
            </HStack>
            <Divider backgroundColor="red" />
            <BalanceDisplay
              label="Poder Emprestado"
              balance={HPdelegatedToUser}
              labelTooltip="How much HivePower People is delegating to You 🚀🤝"
              
              ></BalanceDisplay>
          
            <Tooltip
              bg="white"
              color="black"
              borderRadius="10px"
              border="1px dashed black"
              label="Buy hive using other crypto"
            >
              <HStack
                margin="10px"
                borderRadius="10px"
                border="1px dashed black"
                justifyContent="center"
                padding="10px"
              >
                <Image
                  src="https://images.ecency.com/u/hive-173115/avatar/large"
                  alt="Avatar"
                  width="20px"
                  height="20px"
                />
                <ChakraLink target="_blank" href="https://simpleswap.io/" fontSize="16px">Buy HIVE </ChakraLink>
              </HStack>
            </Tooltip>
  
            <Tooltip
              bg="white"
              color="black"
              borderRadius="10px"
              border="1px dashed black"
              label="Dont! power up!"
            >
              <HStack
                margin="10px"
                borderRadius="10px"
                border="1px dashed black"
                justifyContent="center"
                padding="10px"
              >
                <Image
                  src="https://images.ecency.com/u/hive-173115/avatar/large"
                  alt="Avatar"
                  width="20px"
                  height="20px"
                />
                <ChakraLink target="_blank" href="https://simpleswap.io/" fontSize="16px">Sell Hive  </ChakraLink>
              </HStack>
            </Tooltip>
            <Button
              margin="10px"
              borderRadius="10px"
              border="1px dashed black"
              justifyContent="center"
              padding="10px" onClick={handleOpenModal}>
              Enviar Dinheiro Magico
            </Button>
            <Button
              margin="10px"
              borderRadius="10px"
              border="1px dashed black"
              justifyContent="center"
              padding="10px" onClick={handleOpenSendHBDModal}>
              Enviar Dollar
            </Button>
            <Button
              margin="10px"
              borderRadius="10px"
              border="1px dashed black"
              justifyContent="center"
              padding="10px"
              onClick={handleOpenDelegationModal}
            >
             👑 Emprestar Poder de Voto para Skatehive 👑
            </Button>
          </>
        )}
      </VStack>
      <SendHiveModal
        showModal={showModal}
        setShowModal={setShowModal}
        toAddress={toAddress}
        setToAddress={setToAddress}
        amount={amount}
        setAmount={setAmount}
        hiveMemo={hiveMemo} // Make sure to pass hiveMemo here
        setHiveMemo={setHiveMemo}
      />
            <SendHBDModal
        showModal={sendHBDmodal}
        setShowModal={setSendHBDmodal}  
        toAddress={toAddress}
        setToAddress={setToAddress}
        amount={amount}
        setAmount={setAmount}
        hiveMemo={hiveMemo} // Make sure to pass hiveMemo here
        setHiveMemo={setHiveMemo}
      />
  
      {/* <WalletTransactions wallet={user?.name || ""} /> */}
      <PowerUpModal isOpen={showPowerUpModal} onClose={() => setShowPowerUpModal(false)} user={user} />
      <PowerDownModal isOpen={showPowerDownModal} onClose={() => setShowPowerDownModal(false)} user={user} />
      <DelegationModal isOpen={showDelegationModal} onClose={() => setShowDelegationModal(false)} user={user} />
    </Box>
  );
  
};

const BalanceDisplay = ({
label,
balance,
labelTooltip,
balanceTooltip,
labelLink,
balanceLink,
color
}: {
label: string;
balance: string;
labelTooltip?: string;
balanceTooltip?: string;
labelLink?: string;
balanceLink?: string;
labelStyle?: React.CSSProperties;
balanceStyle?: React.CSSProperties;
color?: string;
}) => {

const balanceStyle: React.CSSProperties = {
color: color || "black",
cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
color: color || "black",
fontWeight: "bold",
cursor: "pointer",
};



return (
<Box
  borderRadius="5px"
  border="1px solid red"
  width="100%"
  padding="10px"
  textAlign="center"
>
  {labelTooltip ? (
    <Tooltip label={labelTooltip} bg="white" color="black" borderRadius="10px" border="1px dashed black">
      {labelLink ? (
        <Link fontWeight="bold"  href={labelLink} isExternal style={labelStyle}>
          {label}
        </Link>
      ) : (
        <Text  fontWeight="bold" cursor="pointer" style={labelStyle}>
          {label}
        </Text>
      )}
    </Tooltip>
  ) : (
    labelLink ? (
      <Link fontWeight="bold"  href={labelLink} isExternal style={labelStyle}>
        {label}
      </Link>
    ) : (
      <Text fontWeight="bold" style={labelStyle}>
        {label}
      </Text>
    )
  )}
  {balanceTooltip ? (
    <Tooltip label={balanceTooltip} bg="white" color="black" borderRadius="10px" border="1px dashed black">
    {balanceLink ? (
        <Link href={balanceLink} isExternal style={balanceStyle}>
          {balance || "Loading..."}
        </Link>
      ) : (
        <Text style={balanceStyle}>{balance || "PEPE"}</Text>
      )}
    </Tooltip>
  ) : (
    balanceLink ? (
      <Link  href={balanceLink} isExternal style={balanceStyle}>
        {balance || "PEPE"}
      </Link>
    ) : (
      <Text style={balanceStyle}>{balance || "Loading..."}</Text>
    )
  )}

</Box>
);
};
  
  
  
