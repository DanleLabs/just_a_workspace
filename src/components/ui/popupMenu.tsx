import { Theme } from "@/constants/theme";
import { IPopupMenu } from "@/types/popupMenu.type";
import { CirclePlus } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  createAnimatedComponent,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedBg = createAnimatedComponent(Pressable)

export default function PopupMenu({
  items,
  width,
  isOpen,
  height,
  setIsOpen,
}: IPopupMenu) {

  const animatedBackground = useSharedValue(0)
  const animatedOpacity = useSharedValue(0);
  const animatedBgOpacity = useSharedValue(0)
  const animatedTranslateY = useSharedValue(0);
  const display = useSharedValue<"none" | "flex" | "contents" | undefined>('none')

  const popupAnimatedStyles = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
    transform: [{ translateY: animatedTranslateY.value }],
    display: display.value
  }));
  const bgAnimatedStyles = useAnimatedStyle(() => ({
    opacity: animatedBgOpacity.value,
    display: display.value
  }))

  const isScrollbar = items.length > 4
  const [timerId, setTimerId] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      if (timerId) {
        clearTimeout(timerId)
      }
      display.value = 'flex'
      animatedBgOpacity.value = withTiming(0.4, {duration: 180})
      animatedTranslateY.value = withTiming(0, {duration: 180})
      animatedOpacity.value = withTiming(1, { duration: 180 });
    } else {
      animatedTranslateY.value = withTiming(-10, { duration: 120 });
      animatedOpacity.value = withTiming(0, { duration: 120 });
      animatedBgOpacity.value = withTiming(0.3, {duration: 120})
      const timerId = setTimeout(() => { display.value = 'none' }, 120)
      setTimerId(timerId)
    }
  }, [isOpen]);

  return (
    <View>
      <AnimatedBg style={[styles.pressable, bgAnimatedStyles]} onPress={() => setIsOpen(prev => !prev)}></AnimatedBg>
      <Animated.View
        style={[
          styles.menu,
          { width },
          popupAnimatedStyles,
        ]}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={isScrollbar}
          style={[styles.scrollView, {maxHeight: height}]}
          contentContainerStyle={styles.scrollContent}
        >
          {items.map((item, i) => {
            const IconComponent = item.Icon;

            return (
              <Pressable style={styles.menuItem} onPress={item.fn} key={i}>
                {IconComponent ? <IconComponent strokeWidth={Theme.Icons.strokeWidth} size={Theme.Icons.sizeMd} color={Theme.Colors.contrast} /> : null}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable style={styles.secondBlock}>
          <CirclePlus size={Theme.Icons.sizeMd} strokeWidth={Theme.Icons.strokeWidth} color={Theme.Colors.contrast} />
          <Text style={styles.menuItemText}>Workspace</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 90,
    left:15,
    zIndex: 20,
    overflow: "hidden",
  },
  scrollView: {
    borderRadius: Theme.Radii.md,
    backgroundColor: Theme.Colors.popup,
    marginBottom: Theme.Spacing.sm,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  menuItemText: {
    color: Theme.Colors.textPrimary,
    fontSize: 18,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.Spacing.sm,
    paddingHorizontal: Theme.Spacing.lg,
    paddingVertical: Theme.Spacing.md,
  },
  secondBlock: {
    backgroundColor: Theme.Colors.popup,
    borderRadius: Theme.Radii.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.Spacing.sm,
    paddingHorizontal: Theme.Spacing.lg,
    paddingVertical: Theme.Spacing.md,
  },
  pressable: {
    position: 'absolute',
    height: 1000,
    width: 1000,
    zIndex: 19,
    backgroundColor: Theme.Colors.background,
  }
});
