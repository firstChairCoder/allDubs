import type { FC } from "react";
import React from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useAppContext } from "../../context/AppContext";

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    zIndex: 2
  },
  label: {
    fontSize: 13,
    textAlign: "center",
    marginRight: 6
  },
  image: {
    width: 26,
    height: 26
  }
});

interface Props {
  imageSource: ImageSourcePropType;
  label: string;
  onPress: () => void;
}

export const MenuButton: FC<Props> = ({ imageSource, onPress, label }) => {
  const { theme } = useAppContext();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touchable}
      hitSlop={{
        top: 4,
        bottom: 4,
        left: 4,
        right: 4
      }}
    >
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <Image
        source={imageSource}
        style={[styles.image, { tintColor: theme.textColorLighter }]}
      />
    </TouchableOpacity>
  );
};
