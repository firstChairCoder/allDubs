import React from "react";
import { StyleSheet, Image, useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@constants";
import { lightTheme, darkTheme, palette } from "@theme/themes";
import HOMEIMG from "@assets/images/house.png";
import TransactionIMG from "@assets/images/transaction2.png";
import UserIMG from "@assets/images/account.png"
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import TransactionsScreen from "@screens/transactions/TransactionsScreen"
// import SearchScreen from "@screens/search/SearchScreen";
// import DetailScreen from "@screens/detail/DetailScreen";
// import ProfileScreen from "@screens/profile/ProfileScreen";
// import NotificationScreen from "@screens/notification/NotificationScreen";
import TabBarMainButton from "@components/TabBarMainButton";
import { isAndroid } from "@freakycoder/react-native-helpers";
import AddTransaction from "@screens/addtransaction/AddTransaction";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  const renderTabIcon = (
    route: any,
    color: string,
    size?: number,
  ) => {
    let icon = <Icon name={"home"} type={"Ionicons"} size={size} color={color} />;
    switch (route.name) {
      case SCREENS.HOME:
        icon = <Image source={HOMEIMG} style={[styles.homeIcon, { tintColor: color }]} />;
        break;
        case SCREENS.INSIGHT: {
          icon = (
            <Icon
              name="insights"
              type="MaterialIcons"
              size={size}
              color={color}
            />
          );
          break;
        }
        case SCREENS.TRANSACTIONS: {
          // icon = <Icon name="list" type="Entypo" size={size} color={color} />;
          icon = (
            <Image
              source={TransactionIMG}
              style={[styles.transactionIcon, { tintColor: color } ]}
            />
          );
          break;
        }
        case SCREENS.PROFILE: {
          icon = (
            <Image
              source={UserIMG}
              style={[styles.userIcon, { tintColor: color }]}
            />
          );
          break;
    }
  }
    return icon;
  };

  const RenderTabNavigation = () => {
    const navigation = useNavigation()
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            renderTabIcon(route, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Tab.Screen
          name={SCREENS.TRANSACTIONS}
          component={TransactionsScreen}
        />
        <Tab.Screen
          name="Rocket"
          component={TransactionsScreen}
          options={{
            tabBarButton: () => (
              <TabBarMainButton onPress={() => {
                navigation.navigate(SCREENS.ADD_TRANSACTION)
              }} />
            ),
          }}
        />
        {/* <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
        <Tab.Screen
          name={SCREENS.NOTIFICATION}
          component={NotificationScreen}
        />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} /> */}
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      theme={isDarkMode ? darkTheme : lightTheme}
    >
      <Stack.Navigator screenOptions={{
          gestureEnabled: true,
          headerShown: false,
          animation: "flip"
          // ...(isAndroid && TransitionPresets.ModalPresentationIOS), //probable change to stack navigator
        }}
        >
        <Stack.Screen name={SCREENS.MAIN} component={RenderTabNavigation} />
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: isAndroid ? "transparentModal" : "containedModal" ,
          }}
        >
          <Stack.Screen
            name={SCREENS.ADD_TRANSACTION}
            component={AddTransaction}
          />
        </Stack.Group>
        {/* <Stack.Screen name={SCREENS.DETAIL}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

export const styles = StyleSheet.create({
  homeIcon: {
    width: 20,
    height: 20,
  },
  transactionIcon: {
    width: 28,
    height: 28,
  },
  userIcon: {
    width: 25,
    height: 25,
  },
});