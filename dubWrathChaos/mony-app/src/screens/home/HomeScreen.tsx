import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import React, { FC, useEffect, useMemo } from "react";
import { View, Image, ScrollView } from "react-native";
import Androw from "react-native-androw";
import Icon from "react-native-dynamic-vector-icons";
import AccountsCard from "@components/AccountsCard";
import Text from "@components/TextWrapper";

import createStyles from "./styles";
import UserService from "./services/userService";
import ActivePeriodCard from "@components/ActivePeriodCard";
import MyNetWorthCard from "@components/MyNetWorth";
import { transactions } from "@utils/mocks/transactions";
import TransactionCard from "@components/TransactionCard";

const profileURI =
  // eslint-disable-next-line max-len
  "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80";

const HomeScreen: FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    const mockUserData = {
      id: "301395-3150134",
      username: "FreakyCoder",
      fullname: "Kuray",
      email: "freakycoder@gmail.com",
      socialType: "google",
      creationDate: 1652631678000,
      photo: null,
    };
    UserService.setUserData(mockUserData);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderMenuButton = () => (
    <RNBounceable>
      <Icon name="menu" type="Ionicons" color={colors.iconBlack} size={30} />
    </RNBounceable>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {renderMenuButton()}
      <Image
        resizeMode="cover"
        source={{ uri: profileURI }}
        style={styles.profilePicImageStyle}
      />
    </View>
  );

  const renderScrollView = () => (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentInset={styles.scContentInset}
      style={styles.listContainer}
    >
      <Androw
        style={{
          shadowColor: colors.foreground,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.5,
          shadowRadius: 0.3,
        }}
      >
        <AccountsCard
          style={styles.accountsCard}
          onPress={() => {}}
          onThreeDotPress={() => {}}
        />
      </Androw>
      <View style={styles.activePeriodCard}>
        <ActivePeriodCard income={75637.35} expenses={31653.11} />
        <MyNetWorthCard style={styles.mynetWorthCard} />
      </View>
    </ScrollView>
  );

  const renderTransactions = () => {
    return (
      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <Text h4 fontFamily={"Medium"} color={colors.offGray}>
            Transactions
          </Text>
          <RNBounceable onPress={() => {}}>
            <Text>See All</Text>
          </RNBounceable>
        </View>
        <View style={styles.transactions}>
          {transactions.map((transaction, index) => {
            return (
              <TransactionCard
                style={styles.transactionCard}
                key={index}
                data={transaction}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderContent = () => (
    <ScrollView style={styles.contentContainer}>
      {/* {renderMainList()} */}
      {renderScrollView()}
      {renderTransactions()}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

export default HomeScreen;
