import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/roboto-mono';
import '@fontsource/satisfy';
import '@fontsource-variable/comfortaa';

type GlobalStyleProps = { colorMode: "light" | "dark" };

const themeConfig = {

  useSystemColorMode: false,
};


export const theme = extendTheme({
  ...themeConfig,
  fonts: {
  heading: "font-family: 'Comfortaa Variable, sans-serif",
  body: "font-family: 'Comfortaa Variable, sans-serif", 
  },
  

  styles: {
    global: (props: GlobalStyleProps) => ({
      body: { 
        background: "#FEFFFF",
        color:  "black" ,
        'font-family': 'Comfortaa Variable, sans-serif',

      },
      p: {
        color: "white",
        'font-family': 'Comfortaa Variable, sans-serif',

      },
      
      heading:{
        fontSize: "75px",
        'font-family': 'Comfortaa Variable, sans-serif',
      },

      // Style for Webkit scrollbars
      "::-webkit-scrollbar": {
        width: "4px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "black",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "black",
        borderRadius: "0px",
      },
      // Style for Firefox scrollbars
      scrollbarWidth: "thin",
      scrollbarColor: "black black",
      
  

      
    }),
  },
});