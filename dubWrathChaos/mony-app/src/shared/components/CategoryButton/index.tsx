import React, { useMemo } from "react";
import {
  StyleProp,
  ViewStyle,
  Image,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "@react-navigation/native";
// import FastImage, { Source, ImageStyle } from "react-native-fast-image";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Text from "@components/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type CustomImageStyleProp =
  | StyleProp<ImageStyle>
  | Array<StyleProp<ImageStyle>>;

interface CategoryButtonProps {
  source: ImageSourcePropType;
  category: string;
  style?: CustomStyleProp;
  imageStyle?: CustomImageStyleProp;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  style,
  source,
  category,
  imageStyle,
  onPress,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      <Image source={source} style={[styles.imageStyle, imageStyle]} />
      <Text
        adjustsFontSizeToFit
        center
        fontFamily={"Medium"}
        style={styles.textStyle}
      >
        {category}
      </Text>
    </RNBounceable>
  );
};

export default CategoryButton;
