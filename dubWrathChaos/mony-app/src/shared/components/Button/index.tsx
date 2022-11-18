import React, { useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Text, {
  ITextWrapperProps,
} from "@components/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ButtonProps extends ITextWrapperProps {
  style?: CustomStyleProp;
  large?: boolean;
  text: string;
  iconComponent?: any;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  style,
  large,
  text,
  iconComponent,
  onPress,
  ...rest
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <RNBounceable
      style={[styles.container, large && styles.largeButton, style]}
      onPress={onPress}
    >
      {!!iconComponent && iconComponent}
      <Text h3 color={colors.white} {...rest}>
        {text}
      </Text>
    </RNBounceable>
  );
};

export default Button;