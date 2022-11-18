import { NativeModules, Platform } from "react-native";

export const changeNavBarColor = async (color: string, darkContent = false) => {
  if (Platform.OS === "android") {
    return NativeModules.NavigationBarColor.changeNavigationBarColor(
      color,
      darkContent
    );
  }
};
