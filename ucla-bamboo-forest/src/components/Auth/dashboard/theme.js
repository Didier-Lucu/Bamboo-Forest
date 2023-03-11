import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    secondary: {
      50: "#FEE2E2",
      100: "#FECACA",
      200: "#FCA5A5",
      300: "#F87171",
      400: "#EF4444",
      500: "#DC2626",
      600: "#B91C1C",
      700: "#991B1B",
      800: "#7F1D1D",
      900: "#63171B",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
export default theme;
