import type { FC } from "react";
import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import SegmentedControl from "react-native-segmented-control-2";

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
    marginTop: 8
  }
});

interface Props {
  label: string;
  items: { value: number; label: string }[];
  value: number;
  color?: string;
  onValueChange: (newValue: number) => void;
}

export const SettingsItemPickerIOS: FC<Props> = ({
  label,
  items,
  value,
  color,
  onValueChange
}) => {
  const { theme } = useAppContext();
  const valueIndex = items.findIndex((x) => x.value === value);
  const handleValueChange = (selectedLabel: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const selectedItem = items.find((x) => x.label === selectedLabel)!;
    onValueChange(selectedItem.value);
  };
  return (
    <Animated.View style={styles.container}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      {/* <SegmentedControlIOS
        values={items.map((x) => x.label)}
        selectedIndex={valueIndex}
        tintColor={color}
        onValueChange={handleValueChange}
        style={styles.picker}
      /> */}

      <SegmentedControl
        style={styles.picker}
        activeTabColor={color}
        // activeTextColor="#fff"
        tabs={items.map((x) => x.label)}
        onChange={(index: number) => console.log("Index: ", index)}
        // onChange={handleValueChange} //TODO: change fn arg to number
      />
    </Animated.View>
  );
};
