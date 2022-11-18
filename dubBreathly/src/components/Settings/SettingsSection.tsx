import type { FC } from "react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useAppContext } from "../../context/AppContext";

const styles = StyleSheet.create({
  container: {
    marginBottom: 26
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 4
  }
});

interface Props {
  label: string;
  children: React.ReactNode;
}

export const SettingsSection: FC<Props> = ({ label, children }) => {
  const { theme } = useAppContext();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textColor }]}>
        {label.toUpperCase()}
      </Text>
      {children}
    </View>
  );
};
