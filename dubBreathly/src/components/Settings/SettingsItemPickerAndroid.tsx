import type { FC } from "react";
import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useAppContext } from "../../context/AppContext";
import { fontLight } from "../../config/fonts";

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  label: {
    fontSize: 20,
    ...fontLight
  },
  picker: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 1
  },
  pickerItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  pickerItemLabel: {
    paddingVertical: 4,
    overflow: "hidden",
    ...fontLight
  }
});

interface Props {
  label: string;
  items: { value: number; label: string }[];
  value: number;
  color?: string;
  onValueChange: (newValue: number) => void;
}

export const SettingsItemPickerAndroid: FC<Props> = ({
  label,
  items,
  value,
  color,
  onValueChange
}) => {
  const { theme } = useAppContext();
  return (
    <Animated.View style={styles.container}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <Animated.View style={[styles.picker, { borderColor: color }]}>
        {items.map((item, index) => {
          const selected = value === item.value;
          const itemStyle = {
            borderLeftWidth: index === 0 ? 0 : 1,
            borderColor: color,
            backgroundColor: selected ? color : "transparent"
          };
          const labelStyle = {
            color: selected ? "white" : color
          };
          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => onValueChange(item.value)}
              style={[styles.pickerItem, itemStyle]}
            >
              <Animated.Text style={[styles.pickerItemLabel, labelStyle]}>
                {item.label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};
