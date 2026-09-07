import { Theme } from "@/constants/theme";
import { LucideIcon } from "lucide-react-native";
import { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

interface ISwitchMenu {
  items: {
    title: string;
    url: string;
    Icon?: LucideIcon;
    id: string;
  }[];
}

type LayoutMap = {
  [key: string]: { x: number; width: number };
};

export default function SwitchMenu({ items }: ISwitchMenu) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id);
  const [layouts, setLayouts] = useState<LayoutMap>({});

  const handleLayout = (id: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setLayouts((prev) => ({
      ...prev,
      [id]: { x, width },
    }));
  };

  const animatedViewStyle = useAnimatedStyle(() => {
    const activeLayout = layouts[activeId];

    if (!activeLayout) {
      return {
        opacity: 0,
        width: 0,
        transform: [{ translateX: 0 }],
      };
    }

    return {
      opacity: 1,
      width: withSpring(activeLayout.width, { damping: 60, stiffness: 200 }),
      transform: [
        { translateX: withSpring(activeLayout.x, { damping: 170, stiffness: 3000 }) },
      ],
    };
  }, [activeId, layouts]);

  return (
    <View style={styles.menu}>
      <Animated.View style={[styles.animatedElement, animatedViewStyle]} />
      {items.map((item) => (
        <Pressable
          key={item.id}
          onLayout={(e) => handleLayout(item.id, e)}
          onPressIn={() => setActiveId(item.id)}
          style={styles.button}
        >
          <Text style={[styles.text, {color: activeId === item.id ? Theme.Colors.accent : Theme.Colors.textSecondary}]}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: 36,
    width: 340,
    backgroundColor: Theme.Colors.floating,
    borderRadius: Theme.Radii.full,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Theme.Spacing.xs,
    position: "relative",
  },
  button: {
    flex: 1,
    borderRadius: Theme.Radii.full,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: Theme.Typography.sizes.sm.fontSize,
    lineHeight: Theme.Typography.sizes.sm.lineHeight,
  },
  animatedElement: {
    position: "absolute",
    top: Theme.Spacing.xs,
    bottom: Theme.Spacing.xs,
    backgroundColor: Theme.Colors.accentMuted,
    borderRadius: Theme.Radii.full,
    zIndex: 0,
  },
});
