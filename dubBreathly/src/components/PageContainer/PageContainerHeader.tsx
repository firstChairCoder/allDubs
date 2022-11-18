import type { FC } from "react";
import React from "react";
import { Animated, StyleSheet } from "react-native";

import { useAppContext } from "../../context/AppContext";

import { PageContainerBackButton } from "./PageContainerBackButton";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 6
  },
  title: {
    fontSize: 24,
    fontStyle: "italic",
    marginRight: 36
  }
});

interface Props {
  title: string;
  onBackButtonPress: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

export const PageContainerHeader: FC<Props> = ({
  title,
  onBackButtonPress,
  style
}) => {
  const { theme } = useAppContext();
  return (
    <Animated.View style={[styles.container, style]}>
      <PageContainerBackButton onPress={onBackButtonPress} />
      <Animated.Text style={[styles.title, { color: theme.textColor }]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
};
