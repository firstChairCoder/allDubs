import type { FC } from "react";
import React from "react";
import { Animated, StyleSheet } from "react-native";

import { useAppContext } from "../../context/AppContext";

import { itemAnimHideThreshold } from "./TechniquePickerViewPager";

const size = 10;
const margin = 6;
const maxScale = 1.3;
const maxOpacity = 0.8;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    margin: margin
  },
  dot: {
    position: "absolute",
    width: size,
    height: size,
    borderRadius: size / 2
  }
});

interface Props {
  panX: Animated.Value;
  position: "prev" | "curr" | "next" | undefined;
  color: string;
}

export const TechniquePickerDot: FC<Props> = ({ panX, position, color }) => {
  const { theme } = useAppContext();
  const createInterpolator = (outputRange: number[]) => {
    return panX.interpolate({
      inputRange: [-itemAnimHideThreshold, 0, itemAnimHideThreshold],
      outputRange: outputRange,
      extrapolate: "clamp"
    });
  };
  let scaleOutputRange = [];
  let dotOpacityOutputRange = [];
  if (position === "curr") {
    scaleOutputRange = [1, maxScale, 1];
    dotOpacityOutputRange = [0, maxOpacity, 0];
  } else if (position === "prev") {
    scaleOutputRange = [1, 1, maxScale];
    dotOpacityOutputRange = [0, 0, maxOpacity];
  } else if (position === "next") {
    scaleOutputRange = [maxScale, 1, 1];
    dotOpacityOutputRange = [maxOpacity, 0, 0];
  } else {
    scaleOutputRange = [1, 1, 1];
    dotOpacityOutputRange = [0, 0, 0];
  }
  const scale = createInterpolator(scaleOutputRange);
  const dotOpacity = createInterpolator(dotOpacityOutputRange);
  const containerAnimatedStyle = {
    transform: [{ scale: scale }]
  };
  const dotAnimatedStyle = {
    opacity: dotOpacity
  };
  return (
    <Animated.View
      style={[
        styles.container,
        containerAnimatedStyle,
        { backgroundColor: theme.textColorLighter }
      ]}
    >
      <Animated.View
        style={[styles.dot, dotAnimatedStyle, { backgroundColor: color }]}
      />
    </Animated.View>
  );
};
