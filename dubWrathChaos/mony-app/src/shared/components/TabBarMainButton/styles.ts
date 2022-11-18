import { StyleSheet } from "react-native";

export default (theme: any) => {
  const { colors } = theme;
  // console.log(colors.primary)
  return StyleSheet.create({
    container: {
      width: 75,
      alignItems: "center",
    },
    background: {
      position: "absolute",
      top: 0,
      backgroundColor: colors.background,
    },
    button: {
      top: -22.5,
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      borderRadius: 27,
      backgroundColor: colors.primary,
    },
  });
};
