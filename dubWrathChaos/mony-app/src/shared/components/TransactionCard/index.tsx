import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Text from "@components/TextWrapper";
import { formatCurrency } from "@utils";
import { Transaction } from "@services/models";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface TransactionCardProps {
  style?: CustomStyleProp;
  data: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ style, data }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { name, date, value } = data;

  return (
    <View style={[styles.container, style]}>
      <Text h4 fontFamily={"Medium"} color={colors.offBlack}>
        {name}
      </Text>
      <Text color={colors.offGray} style={styles.dateText}>
        {moment(date).format("DD MMM YYYY")}
      </Text>
      <View style={styles.value}>
        <Text h3 bold color={colors.offBlack}>
          {formatCurrency().format(value)}
        </Text>
      </View>
    </View>
  );
};

export default TransactionCard;