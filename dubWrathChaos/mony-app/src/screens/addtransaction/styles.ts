import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { getStatusBarHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 24
    },
    tab: {
      flexDirection: "row",
      alignItems: "center",
    },
    tabTextStyle: {
      marginLeft: 16,
    },
    segmentedControlStyle: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E8E8E8",
    },
    datePickerButton: {
      marginTop: 16,
      marginLeft: 4,
      borderRadius: 8,
      alignSelf: "center",
      width: ScreenWidth * 0.35,
      backgroundColor: "#E8E8E8",
    },
    transactionKeyboard: {
      position: "absolute",
      bottom: getStatusBarHeight(),
      justifyContent: "flex-end",
    },
    transactionTextInput: {
      marginRight: 32,
      fontSize: 48,
      textAlign: "right",
      fontFamily: "Bold",
    },
    dateAndCategory: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    categoryButton: {
      marginTop: 16,
      borderRadius: 8,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      width: ScreenWidth * 0.5,
      backgroundColor: "#E8E8E8",
    },
    categoryIcon: {
      width: 30,
      height: 30,
      marginRight: 8,
    },
  });
};
