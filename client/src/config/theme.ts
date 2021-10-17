import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

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
      500: "#4C6FFF",
      600: "#3754DB",
    },
    blackAlpha: {
      900: "#212121",
    },
    gray: {
      200: "#EDF2F7",
      300: "#E2E8F0",
    },
    border: {
      light: "#EDF2F7",
    },
    heading: {
      dark: "#27272E",
    },
    body: {
      light: "#425466",
    },
  },
  shadows: {
    "2xl-blue": "0 25px 50px -12px rgba(83, 103, 255, 0.25)",
  },
});

export default theme;
