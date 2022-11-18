/* eslint-disable import/no-default-export */
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  //AsyncStorage would either come from `react-native` or `@react-native-async-strage/async-storage`
  .configure({
    name: "Ecency"
  })
  .useReactNative() //add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); //let's connect

export default reactotron;
