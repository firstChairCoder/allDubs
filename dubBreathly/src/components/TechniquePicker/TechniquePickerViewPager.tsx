import type { FC } from "react";
import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";

import { deviceWidth } from "../../config/constants";

interface Props {
  panX: Animated.Value;
  onNextReached: () => void;
  onPrevReached: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
  children?: React.ReactNode;
}

// Swipe distance required for completing an item animation
export const fullSwipeThreshold = 0.75 * deviceWidth;
/*
Swipe distance required for triggering an item change
It basically works this way:
- if the user swipes below this threshold then the carousel will rewind the animation back to the previous item
- if the user swipes above this threshold then the carousel will complete the animation and jump to the next item
 */
export const swipeItemChangeThreshold = fullSwipeThreshold * 0.02;
// Swipe distance required for reaching the point in the
// animation where the front image hides
export const itemAnimHideThreshold = fullSwipeThreshold * 0.5;
export const fullAnimDuration = 1000;

export const TechniquePickerViewPager: FC<Props> = ({
  panX,
  onNextReached,
  onPrevReached,
  children,
  ...otherProps
}) => {
  const swipingRight = useRef(false);
  const swipingLeft = useRef(false);

  const animateTransition = (config: { toValue: number; duration: number }) => {
    Animated.timing(panX, {
      toValue: config.toValue,
      duration: config.duration,
      useNativeDriver: true
    }).start(() => {
      if (config.toValue < 0) {
        panX.setValue(0);
        onNextReached();
      } else if (config.toValue > 0) {
        panX.setValue(0);
        onPrevReached();
      }
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Registers only gesture to the left direction
      if (gestureState.dx < 0 && !swipingRight.current) {
        swipingLeft.current = true;
        swipingRight.current = false;
        Animated.event([null, { dx: panX }])(evt, gestureState);
      } else if (gestureState.dx > 0 && !swipingLeft.current) {
        swipingRight.current = true;
        swipingLeft.current = false;
        Animated.event([null, { dx: panX }])(evt, gestureState);
      }
    },
    onPanResponderRelease: (_, { dx }) => {
      if (-dx >= swipeItemChangeThreshold && swipingLeft.current) {
        if (-dx < fullSwipeThreshold) {
          const progress = (1 / fullSwipeThreshold) * Math.abs(dx);
          // Complete the animation and set the next item as the visible one
          animateTransition({
            toValue: -fullSwipeThreshold,
            duration: fullAnimDuration - fullAnimDuration * progress
          });
        } else {
          // Set the next item as the visible one
          panX.setValue(0);
          onNextReached();
        }
      } else if (dx >= swipeItemChangeThreshold && swipingRight.current) {
        if (dx < fullSwipeThreshold) {
          const progress = (1 / fullSwipeThreshold) * Math.abs(dx);
          // Complete the animation and set the next item as the visible one
          animateTransition({
            toValue: fullSwipeThreshold,
            duration: fullAnimDuration - fullAnimDuration * progress
          });
        } else {
          // Set the previous item as the visible one
          panX.setValue(0);
          onPrevReached();
        }
      } else {
        // Rewind to the previous item
        animateTransition({
          toValue: 0,
          duration: 200
        });
      }
      swipingRight.current = false;
      swipingLeft.current = false;
    }
  });

  return (
    <Animated.View
      pointerEvents="box-none"
      {...panResponder.panHandlers}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
};
