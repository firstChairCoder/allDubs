import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Text from "@components/TextWrapper";
import { formatCurrency } from "@utils";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface MonyCardProps {
  style?: CustomStyleProp;
  money: number;
  type: string;
  iconName?: string;
  iconType?: IconType;
}

const MoneyContainer: React.FC<MonyCardProps> = ({
  style,
  iconName = "arrow-up",
  iconType = "FontAwesome",
  money,
  type,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.arrowCircle}>
        <Icon name={iconName} type={iconType} color={colors.white} size={16} />
      </View>
      <View style={styles.content}>
        <Text h3 bold color={colors.white}>
          {formatCurrency().format(money)}
        </Text>
        <Text
          style={styles.typeText}
          fontFamily={"Medium"}
          color={colors.offBlack}
        >
          {type}
        </Text>
      </View>
    </View>
  );
};

export default MoneyContainer;