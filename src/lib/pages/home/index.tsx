import { Flex, Tabs, TabList, Tab, TabPanels, TabPanel, useTabs,Image, VStack, Text, } from "@chakra-ui/react";
import HiveBlog from "./Feed/Feed";
import HiveVideos from "./videos/FeedVideo";
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
        <Tabs isFitted variant="line" width="100%" colorScheme="yellow" {...tabProps} size='sm' >
          <TabList mb="1em" width="100%">
            <Tab
              fontSize="20px"
              border="3px black solid"
              _selected={{ backgroundColor: "#CCCCCC", border:"3px black solid" }} // Change the background color when selected
            >
              <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>POST</Text></VStack>
              
            </Tab>
            {/* <Tab
              color="white" 
              border="2px black solid"
              _selected={{ backgroundColor: "#65418C",color:"white", fontWeight:"bold", border:"1px solid white" }} // Change the background color when selected
            >
              <Image src="assets\gifs\crows1.gif" alt="" width="20%" height="auto"/>VIDEOS
            </Tab> */}
            {/* <Tab
              color="white"
              border="2px limegreen solid"
              _selected={{ backgroundColor: "limegreen",color:"black", fontWeight:"bold", border:"1px solid white" }} // Change the background color when selected
            >
              :video_game: PLAY
            </Tab> */}
            <Tab
             fontSize="20px"
             border="3px black solid"
             _selected={{ backgroundColor: "#CCCCCC", border:"3px #5E317A solid" }} // Change the background color when selected
            >
              <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>UPLOAD</Text></VStack>
            </Tab>
            <Tab
            fontSize="20px"
            border="3px black solid"
            _selected={{ backgroundColor: "#CCCCCC", border:"3px #5E317A solid" }} // Change the background color when selected
           >
             <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>EQUIPE</Text></VStack>
            </Tab>
            
            <Tab
            fontSize="20px"
            border="3px black solid"
            _selected={{ backgroundColor: "#CCCCCC", border:"3px #5E317A solid" }} // Change the background color when selected
           >
             <VStack><Image src="" alt="" width="40%" height="auto" style={{margin: "-4%"}} /><Text color={"black"}>LOJA</Text></VStack>
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