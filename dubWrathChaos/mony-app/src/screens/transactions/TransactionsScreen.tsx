import React, { useMemo } from "react";
import { View, SectionList } from "react-native";
import moment from "moment";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
//Local imports
import createStyles from "./styles";
import { transactions } from "@utils/mocks/transactions";
import { Transaction } from "@services/models";
import TransactionCard from "@components/TransactionCard";
import Text from "@components/TextWrapper";
import { formatCurrency } from "@utils";

const DATA = [
  {
    title: moment(new Date()).format("MMM YYYY"),
    total: 130593.95,
    data: transactions,
  },
  {
    title: moment(1651468160000).format("MMM YYYY"),
    total: -31519.55,
    data: transactions,
  },
  {
    title: moment(1631718960000).format("MMM YYYY"),
    total: 87549.53,
    data: transactions,
  },
  {
    title: moment(1615475760000).format("MMM YYYY"),
    total: 45135.5,
    data: transactions,
  },
];

const TransactionsScreen = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const Item = ({ data }: { data: Transaction }) => (
    <View style={styles.item}>
      <TransactionCard data={data} />
    </View>
  );

  const Header = ({ title, total }: { title: string; total: number }) => (
    <View
      style={{
        marginTop: 48,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text h3 fontFamily={"Bold"}>
        {title}
      </Text>
      <Text h2 bold color={total > 0 ? colors.incomeGreen : colors.expensesRed}>
        {formatCurrency().format(total)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => <Item data={item} />}
        renderSectionHeader={({ section: { title, total }}) => (
          <Header key={title} title={title} total={total} />
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

export default TransactionsScreen;
