import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const palette = {
  primary: "#0564D4",
  secondary: "#FF6A00",
  background: "#F3F5F9",
  white: "#FFF",
  offBlack: "#49455F",
  offGray: "#C9D0DE",
  black: "#101214",
  blue: "#0E7AFE",
  button: "#252234",
  shadow: "#757575",
  text: "#30363B",
  borderColor: "#D0D7DE",
  borderColorDark: "#333942",
  placeholder: "#A1A1A1",
  danger: "rgb(208, 2, 27)",
  title: "rgb(102, 102, 102)",
  separator: "rgb(194, 194, 195)",
  highlight: "rgb(199, 198, 203)",
  blackOverlay: "rgba(0,0,0,0.6)",
  whiteTransparent01: "rgba(255,255,255,0.1)",
  iconWhite: "#FFF",
  iconBlack: "#101214",
  dynamicWhite: "#FFF",
  dynamicBlack: "#1CE21",
  dynamicBackground: "#FFF",
  transparent: "transparent",
  calpyse: "#2B7488",
  expensesRed: "#941010",
  incomeGreen: "#10943C"
};

export const lightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...lightTheme.colors,
    background: palette.black,
    foreground: palette.white,
    text: palette.white,
    tabBar: palette.black,
    iconWhite: palette.black,
    iconBlack: palette.white,
    // offBlack: palette.white,
    dynamicBackground: palette.dynamicBlack,
    shadow: palette.transparent,
    borderColor: palette.borderColorDark,
  },
};