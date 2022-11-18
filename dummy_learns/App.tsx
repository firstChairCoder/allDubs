/* eslint-disable import/no-default-export */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Provider, connect } from "react-redux";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Host } from "react-native-portalize";
import { IntlProvider } from "react-intl";

import Application from "./src/ecency/screens/application";
import { initQueryClient } from "./src/ecency/providers/queries";
import { persistor, store } from "./src/ecency/redux/store/store";
import messages from "./src/ecency/config/locales";
import { flattenMessages } from "./src/ecency/utils/flattenMessages";

const queryClientProviderProps = initQueryClient();

const _renderApp = ({ locale }) => (
  <PersistQueryClientProvider {...queryClientProviderProps}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider
        locale={locale}
        messages={flattenMessages(messages[locale])}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Host>
              <Application />
            </Host>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </IntlProvider>
    </PersistGate>
  </PersistQueryClientProvider>
);

const mapStateToProps = (state) => ({
  locale: state.application.language
});

const App = connect(mapStateToProps)(_renderApp);

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

/*
root config ecency:
Reactotron, 

AppCenter - AppCenter.setLogLevel(AppCenter.LogLevel.VERBOSE);

*/

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
