import type { FC } from "react";
import React from "react";
import { Animated, StyleSheet, Switch, Text, Platform } from "react-native";

import { useAppContext } from "../../context/AppContext";
import { fontLight } from "../../config/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  label: {
    fontSize: 20,
    ...fontLight
  }
});

interface Props {
  label: string;
  color: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SettingsItemSwitch: FC<Props> = ({
  label,
  color,
  value,
  onValueChange
}) => {
  const { theme } = useAppContext();
  return (
    <Animated.View style={styles.container}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "undefined", true: color }}
        thumbColor={Platform.OS === "android" && value ? color : undefined}
      />
    </Animated.View>
  );
};
