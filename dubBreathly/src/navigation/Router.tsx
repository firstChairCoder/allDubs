/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from "react";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";

import { useAppContext } from "../context/AppContext";
import { ButtonAnimator } from "../components/ButtonAnimator";
import { Exercise } from "../components/Exercise";
import { Menu } from "../components/Menu";
import { Settings } from "../components/Settings";
import { TechniquePicker } from "../components/TechniquePicker";
import { changeNavBarColor } from "../utils/changeNavBarColor";

/*
Router.tsx handles the navigation in the app.
We have 4 main screens we want the user to navigate:
 - Menu (screen type: "main")
 - Exercise (screen type: "main")
 - Settings (screen type: "settings")
 - Technique Picker (screen type: "techniquepicker")
 Since the menu and the exercise screens needs a complex transition they're wrapped 
 in the ButtonAnimator (identified by "main") component that takes care of 
 their navigation and their transition animations.
 */

type Screen =
  | "main"
  | "hiding-main"
  | "settings"
  | "hiding-settings"
  | "techniquepicker"
  | "hiding-techniquepicker";

/*
We also have a "page" information which keeps track of what 
screen the user is navigating to
 */
type MenuPage = "settings" | "techniquepicker" | null;

type MainScreen = "menu" | "exercise";

/*
Navigation flow example:
 - User taps on the Settings button
 - handleSettingsButtonPress is triggered: is starts hiding the "main" by setting 
   currentMenuScreen to "hiding-main" and we keep track of the destination by setting currentMenuPage to "settings".
- Once the "main" hide animation is completed handleButtonAnimatorHide is triggered: it sets the current
screen to "settings" (obtained from the currentMenuPage). This
means we can now safely unmount the "main" screen
(ButtonAnimator) and mount the "settings" screen, that animates its own entrance automatically.
 */

export const Router: FC = () => {
  const { theme, darkModeFlag } = useAppContext();
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [currentMenuPage, setCurrentMenuPage] = useState<MenuPage>(null);
  const [currentMainScreen, setCurrentMainScreen] =
    useState<MainScreen>("menu");

  useEffect(() => {
    if (currentMainScreen === "menu") {
      if (Platform.OS === "android") {
        changeNavBarColor(theme.backgroundColor, !darkModeFlag);
        StatusBar.setBackgroundColor(theme.backgroundColor);
      }
      StatusBar.setBarStyle(
        darkModeFlag ? "light-content" : "dark-content",
        true
      );
    } else if (currentMainScreen === "exercise") {
      if (Platform.OS === "android") {
        changeNavBarColor(theme.mainColor, false);
        StatusBar.setBackgroundColor(theme.mainColor);
      }
      StatusBar.setBarStyle("light-content", true);
    }
  }, [theme.backgroundColor, darkModeFlag, currentMainScreen]);

  const handleButtonAnimatorExpand = () => {
    setCurrentMainScreen("exercise");
  };

  const handleButtonAnimatorClose = () => {
    setCurrentMainScreen("menu");
  };

  /*
   A screen has three different states: completely visible, 
   transitioning or completely hidden.
   With the **Mounted** vars we keep track of which screen is 
   actually rendered.
   */
  const buttonAnimatorMounted =
    currentScreen === "hiding-main" || currentScreen === "main";

  const techniquePickerMounted =
    currentScreen === "hiding-techniquepicker" ||
    currentScreen === "techniquepicker";

  const settingsMounted =
    currentScreen === "hiding-settings" || currentScreen === "settings";

  // Settings navigation
  const handleSettingsButtonPress = () => {
    setCurrentMenuPage("settings");
    setCurrentScreen("hiding-main");
  };

  const handleSettingsBackButtonPress = () => {
    setCurrentScreen("hiding-settings");
  };

  const handleSettingsHide = () => {
    setCurrentMenuPage(null);
    setCurrentScreen("main");
  };

  // Technique-Picker navigation
  const handleTechniquePickerButtonPress = () => {
    setCurrentMenuPage("techniquepicker");
    setCurrentScreen("hiding-main");
  };

  const handleTechniquePickerBackButtonPress = () => {
    setCurrentScreen("hiding-techniquepicker");
  };

  const handleTechniquePickerHide = () => {
    setCurrentMenuPage(null);
    setCurrentScreen("main");
  };

  /*
    Once the ButtonAnimator hides completely, set the current screen to the page we are planning to navigate to
   */
  const handleButtonAnimatorHide = () => {
    if (currentMenuPage) {
      setCurrentScreen(currentMenuPage);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {buttonAnimatorMounted && (
        <ButtonAnimator
          visible={currentScreen === "main"}
          onHide={handleButtonAnimatorHide}
          onExpandPress={handleButtonAnimatorExpand}
          onClosePress={handleButtonAnimatorClose}
          front={
            <Menu
              onTechniquePickerPress={handleTechniquePickerButtonPress}
              onSettingsPress={handleSettingsButtonPress}
            />
          }
          back={<Exercise />}
        />
      )}
      {techniquePickerMounted && (
        <TechniquePicker
          visible={currentScreen === "techniquepicker"}
          onHide={handleTechniquePickerHide}
          onBackButtonPress={handleTechniquePickerBackButtonPress}
        />
      )}
      {settingsMounted && (
        <Settings
          visible={currentScreen === "settings"}
          onHide={handleSettingsHide}
          onBackButtonPress={handleSettingsBackButtonPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
