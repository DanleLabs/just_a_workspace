import { Theme } from "@/constants/theme";
import { LucideIcon } from "lucide-react-native";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface IAddButton extends PropsWithChildren {
  onPress: () => {},
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AddButton(props: IAddButton) {

  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 70,
      stiffness:1600
    })
    opacity.value = withTiming(0.9, {
      duration: 70
    })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 70,
      stiffness: 1400
    })
    opacity.value = withTiming(1, {
      duration: 300
    })
  }

  return (
    <AnimatedPressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={[styles.button, animatedStyle]}>
      {props.children}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: Theme.Components.PlusButton.bottomOffset,
    right: Theme.Components.PlusButton.rightOffset,
    backgroundColor: Theme.Colors.accent,
    borderRadius: Theme.Radii.full,
    padding: Theme.Spacing.sm,
  }
})
