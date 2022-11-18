import { StyleSheet } from "react-native";
import { getStatusBarHeight, ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

// interface Style {
//   container: ViewStyle;
//   titleTextStyle: TextStyle;
//   buttonStyle: ViewStyle;
//   buttonTextStyle: TextStyle;
//   header: ViewStyle;
//   contentContainer: ViewStyle;
//   listContainer: ViewStyle;
//   profilePicImageStyle: ImageStyle;
// }

export default (theme: any) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: getStatusBarHeight(),
      backgroundColor: colors.background,
    },
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      height: 45,
      width: ScreenWidth * 0.9,
      marginTop: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      shadowRadius: 5,
      shadowOpacity: 0.7,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    buttonTextStyle: {
      color: colors.white,
      fontWeight: "700",
    },
    header: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentContainer: {
      marginTop: 16,
    },
    listContainer: {
      flexGrow: 0,
      marginTop: 8,
      minHeight: ScreenHeight * 0.55
    },
    accountsCard: {
      marginLeft: 8,
    },
    activePeriodCard: {
      marginLeft: 24,
    },
    mynetWorthCard: {
      marginTop: 16,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    scContentInset: {
      left: 24,
      right: 24,
    },
    transactions: {
      alignItems: "center",
      justifyContent: "center",
    },
    transactionsSection: {
      flex: 1,
      paddingBottom: 24,
      marginTop: 16,
    },
    transactionsHeader: {
      marginLeft: 24,
      marginRight: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    transactionCard: {
      marginTop: 16,
    },
  });
};