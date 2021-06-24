import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { CustomButton } from "./custom-style/button";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});

const theme = extendTheme({
  config,
  breakpoints,
  colors: {
    blue: {
      50: "#F0F4F9",
      400: "#5367FF",
    },
    blackAlpha: {
      900: "#212121",
    },
  },
  components: {
    Button: CustomButton,
  },
  shadows: {
    "2xl-blue": "0 25px 50px -12px rgba(83, 103, 255, 0.25)",
  },
});

export default theme;
