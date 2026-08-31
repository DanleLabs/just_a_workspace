import { Theme } from "@/constants/theme";
import { LucideIcon } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface ITabItem {
  onSelect: (index: number) => void,
  name: string,
  icon: LucideIcon,
  index: number,
  title: string,
  isActive: boolean,
}

const AnimatedView = Animated.createAnimatedComponent(View)

export default function TabItem({onSelect, icon, name, title, isActive, index}: ITabItem) {
const Icon = icon;
const scale = useSharedValue(isActive ? 1 : 0.3)
const opacity = useSharedValue(isActive ? 1 : 0)

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [{scale: scale.value}]
}))

  useEffect(() => {
    scale.value = withSpring(isActive ? 1 : 0.4, { damping: 80, stiffness: 700 });
    opacity.value = withTiming(isActive ? 1 : 0, { duration: 150 });
  }, [isActive])
  return (
  <Pressable
    key={name}
    onPressIn={() => onSelect(index)}
    accessibilityRole="tab"
    accessibilityState={{ selected: isActive }}
    style={styles.item}>
    <View
      style={[
        styles.itemFill,
      ]}>
      <AnimatedView style={[styles.viewFill, animatedStyle]}></AnimatedView>
      <Icon
        size={Theme.Icons.sizeMd}
        color={isActive ? Theme.Colors.accent : Theme.Colors.contrast}
        strokeWidth={Theme.Icons.strokeWidth}
      />
      <Text
        style={[
          styles.label,
          { color: isActive ? Theme.Colors.accent : Theme.Colors.contrast },
        ]}>
        {title}
      </Text>
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  viewFill: {
    backgroundColor: Theme.Colors.selected,
    borderRadius: Theme.Radii.full,
    position: "absolute",
    top: Theme.Spacing.none,
    bottom: Theme.Spacing.none,
    right: Theme.Spacing.none,
    left: Theme.Spacing.none,
  },
  label: {
    fontSize: Theme.Typography.sizes.xs.fontSize,
    fontFamily: Theme.Typography.families.regular,
    lineHeight: Theme.Typography.sizes.xs.lineHeight,
  },
  itemFill: {
    flex: 1,
    borderRadius: Theme.Radii.md,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Theme.Spacing.xxs,
  },
})
