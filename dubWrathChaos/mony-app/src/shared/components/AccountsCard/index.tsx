import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Text from "@components/TextWrapper";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Button from "@components/Button";
import Balance from "@components/Balance";
import MoneyContainer from "@components/MoneyContainer";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface AccountsCardProps {
  style?: CustomStyleProp;
  onPress: () => void;
  onThreeDotPress: () => void;
}

const AccountsCard: React.FC<AccountsCardProps> = ({
  style,
  onPress,
  onThreeDotPress,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.circle} />
        <Text color={colors.white} bold style={styles.accountNameText}>
          Main
        </Text>
      </View>
      <TouchableHighlight
        underlayColor="rgba(255,255,255,0.1)"
        style={styles.threeDot}
        onPress={onThreeDotPress}
      >
        <Icon
          name="dots-three-horizontal"
          type="Entypo"
          color={colors.offBlack}
          size={24}
        />
      </TouchableHighlight>
    </View>
  );

  const renderBalance = () => <Balance balance={753637.96} />;

  const renderIncomeExpenses = () => (
    <View style={styles.incomeExpenses}>
      <MoneyContainer money={32500} type="Income" iconName="arrow-down" />
      <MoneyContainer style={styles.expenses} money={12500} type="Expenses" />
    </View>
  );

  return (
    <RNBounceable
      style={[styles.container, style]}
      bounceEffect={0.98}
      onPress={onPress}
    >
      {renderHeader()}
      {renderBalance()}
      {renderIncomeExpenses()}
      <Button
        text="Add Transaction"
        style={styles.addTransactionButton}
        fontFamily={"Bold"}
        large
        onPress={() => {}}
      />
    </RNBounceable>
  );
};

export default AccountsCard;