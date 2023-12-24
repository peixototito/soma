import { Flex, Tabs, TabList, Tab, TabPanels, TabPanel, useTabs,Image, VStack, Text, } from "@chakra-ui/react";
import HiveBlog from "./Feed/Feed";

import SnapShot from "./dao/snapshot";
import Chat from "./chat";
import QFS from "../qfs";
import NewUpload from "../upload/newUpload";
import Equipe from "./equipe";
import Store from "./store";

  const Home = () => {
    const { selectedIndex, ...tabProps } = useTabs({});
  
    return (
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Tabs isFitted variant="enclosed" width="100%" colorScheme="black" {...tabProps} size='sm' >
          <TabList mb="1em" width="100%">
            <Tab
              fontSize="20px"
              border="2px black solid"
              _selected={{ backgroundColor: "#CCCCCC", border:"1px black solid" }} // Change the background color when selected
            >
              <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>POST</Text></VStack>
              
            </Tab>
           
            <Tab
             fontSize="20px"
             border="2px black solid"
             _selected={{ backgroundColor: "#CCCCCC", border:"1px #5E317A solid" }} // Change the background color when selected
            >
              <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>UPLOAD</Text></VStack>
            </Tab>
            <Tab
            fontSize="20px"
            border="2px black solid"
            _selected={{ backgroundColor: "#CCCCCC", border:"1px #5E317A solid" }} // Change the background color when selected
           >
             <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-%"}} /><Text color={"black"}>TIME</Text></VStack>
            </Tab>
            
            <Tab
            fontSize="20px"
            border="2px black solid"
            _selected={{ backgroundColor: "#CCCCCC", border:"1px #5E317A solid" }} // Change the background color when selected
           >
             <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>SKATE SHOP</Text></VStack>
            </Tab>

          </TabList>
          <TabPanels>
            <TabPanel>
              <HiveBlog/>
            </TabPanel>
            <TabPanel>
            <NewUpload/>
            </TabPanel>
            <TabPanel>
            <Equipe/>

            </TabPanel>
            <TabPanel>
              <Store/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Chat />
      </Flex>
    );
  };
  
  export default Home;