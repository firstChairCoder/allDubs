import type { FC } from "react";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

import { AppContextProvider, useAppContext } from "./src/context/AppContext";
import { useOnMount } from "./src/hooks/useOnMount";
import { useOnUpdate } from "./src/hooks/useOnUpdate";
import { Router } from "./src/navigation/Router";

const AppMain: FC = () => {
  const { ready, initialize } = useAppContext();

  useOnMount(() => {
    initialize();
  });
  useOnUpdate((prevReady) => {
    if (!prevReady && ready) {
      SplashScreen.hideAsync();
    }
  }, ready);

  if (!ready) {
    return <View />;
  } else {
    return <Router />;
  }
};
/*
App entry point used to wrap the core logic of the app 
with context providers
 */
export default function App() {
  return (
    <AppContextProvider>
      <AppMain />
    </AppContextProvider>
  );
}

