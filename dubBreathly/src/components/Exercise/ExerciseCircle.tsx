import type { FC } from "react";
import React, { useState } from "react";
import { Animated, StyleSheet } from "react-native";

import { deviceWidth } from "../../config/constants";
import { useOnMount } from "../../hooks/useOnMount";
import { animate } from "../../utils/animate";
import {
  interpolateScale,
  interpolateTranslateY
} from "../../utils/interpolate";
import { loopAnimations } from "../../utils/loopAnimations";
import { fontThin } from "../../config/fonts";

import { ExerciseCircleDots } from "./ExerciseCircleDots";

const circleSize = deviceWidth * 0.8;
const fadeInAnimDuration = 400;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth
  },
  circleMin: {
    position: "absolute",
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    transform: [{ scale: 0.6 }]
  },
  circleMax: {
    position: "absolute",
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  content: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: Math.floor(24),
    textAlign: "center",
    color: "white",
    ...fontThin
  }
});

interface Step {
  id: string;
  label: string;
  duration: number;
  showDots: boolean;
  skipped: boolean;
}

type Props = {
  steps: Step[];
};

export const ExerciseCircle: FC<Props> = ({ steps }) => {
  const [showUpAnimVal] = useState(new Animated.Value(0));
  const [scaleAnimVal] = useState(new Animated.Value(0));
  const [textAnimVal] = useState(new Animated.Value(1));
  const [cirlceMinAnimVal] = useState(new Animated.Value(0));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const activeSteps = steps.filter((x) => !x.skipped);
  const currentStep = activeSteps[currentStepIndex];

  const animateStep = (toValue: number, duration: number) => {
    const textDuration = fadeInAnimDuration;
    return Animated.stagger(duration - textDuration, [
      Animated.parallel([
        animate(scaleAnimVal, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: false
        }),
        animate(textAnimVal, {
          toValue: 1,
          duration: textDuration,
          useNativeDriver: false
        })
      ]),
      animate(textAnimVal, {
        toValue: 0,
        duration: textDuration,
        useNativeDriver: false
      })
    ]);
  };

  const showCirlceMinAnimation = animate(cirlceMinAnimVal, {
    toValue: 1,
    duration: fadeInAnimDuration,
    useNativeDriver: false
  });

  const hideCirlceMinAnimation = animate(cirlceMinAnimVal, {
    toValue: 0,
    duration: fadeInAnimDuration,
    useNativeDriver: false
  });

  const showUpAnimation = animate(showUpAnimVal, {
    toValue: 1,
    duration: fadeInAnimDuration,
    useNativeDriver: false
  });

  const onStepStart = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
    const step = activeSteps[stepIndex];
    if (step?.id === "exhale") {
      showCirlceMinAnimation.start();
    } else if (step?.id === "afterExhale" || step?.id === "inhale") {
      hideCirlceMinAnimation.start();
    }
  };

  const startAnimationSteps = () => {
    const createStepAnimations = () =>
      activeSteps.map((x) =>
        animateStep(
          x.id === "inhale" || x.id === "afterInhale" ? 1 : 0,
          x.duration
        )
      );
    const stopLoop = loopAnimations(createStepAnimations, onStepStart);
    return stopLoop;
  };

  useOnMount(() => {
    let cleanUpAnimationsSteps: () => void;
    showUpAnimation.start(({ finished }) => {
      if (finished) {
        cleanUpAnimationsSteps = startAnimationSteps();
      }
    });
    return () => {
      cleanUpAnimationsSteps && cleanUpAnimationsSteps();
      showUpAnimation.stop();
      showCirlceMinAnimation.stop();
      hideCirlceMinAnimation.stop();
    };
  });

  const containerAnimatedStyle = {
    opacity: showUpAnimVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
  };

  const circleAnimatedStyle = {
    transform: [
      interpolateScale(scaleAnimVal, {
        inputRange: [0, 1],
        outputRange: [0.6, 1]
      })
    ]
  };

  const contentAnimatedStyle = {
    opacity: textAnimVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    }),
    transform: [
      interpolateScale(scaleAnimVal, {
        inputRange: [0, 1],
        outputRange: [1, 1.3]
      }),
      interpolateTranslateY(textAnimVal, {
        inputRange: [0, 1],
        outputRange: [-8, 0]
      })
    ]
  };

  const circleMinAnimatedStyle = {
    opacity: cirlceMinAnimVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
  };

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.View style={[styles.circle, circleAnimatedStyle]} />
      <Animated.View style={[styles.circleMin, circleMinAnimatedStyle]} />
      <Animated.View style={styles.circleMax} />
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <Animated.Text style={styles.text}>{currentStep.label}</Animated.Text>
        <ExerciseCircleDots
          visible={currentStep.showDots}
          numberOfDots={3}
          totalDuration={currentStep.duration}
        />
      </Animated.View>
    </Animated.View>
  );
};
