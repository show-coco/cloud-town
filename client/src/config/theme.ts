import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    blue: {
      50: "#F0F4F9",
      400: "#5367FF",
    },
    blackAlpha: {
      900: "#212121",
    },
  },
});

export default theme;
