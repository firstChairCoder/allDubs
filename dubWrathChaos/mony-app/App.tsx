import 'intl';
import 'intl/locale-data/jsonp/en';
import "react-native-gesture-handler";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { 
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic 
} from '@expo-google-fonts/montserrat';
import * as Font from "expo-font";
import { PersistGate } from "redux-persist/integration/react";
import { isAndroid } from "@freakycoder/react-native-helpers";
/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { store, persistor } from "./src/services/redux/Store";
import { initializeReduxService } from "./src/services/redux/ReduxService";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  useLayoutEffect(() => {
    initializeReduxService(store.dispatch, store.getState);
  });

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }
  }, [scheme, isDarkMode]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // keeps the splash screen visible while assets are cached
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: images, fonts, and videos
        await Font.loadAsync({
          "Thin": Montserrat_100Thin,
          "ThinItalic": Montserrat_100Thin_Italic,
          "ExtraLight": Montserrat_200ExtraLight,
          "ExtraLightItalic": Montserrat_200ExtraLight_Italic,
          "Light": Montserrat_300Light,
          "LightItalic": Montserrat_300Light_Italic,
          "Regular": Montserrat_400Regular,
          "RegularItalic": Montserrat_400Regular_Italic,
          "Medium": Montserrat_500Medium,
          "MediumItalic": Montserrat_500Medium_Italic,
          "SemiBold": Montserrat_600SemiBold,
          "SemiBoldItalic": Montserrat_600SemiBold_Italic,
          "Bold": Montserrat_700Bold,
          "BoldItalic": Montserrat_700Bold_Italic,
          "ExtraBold": Montserrat_800ExtraBold,
          "ExtraBoldItalic": Montserrat_800ExtraBold_Italic,
          Black: Montserrat_900Black,
          "BlackItalic": Montserrat_900Black_Italic,
        });
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;