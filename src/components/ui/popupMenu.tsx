import { Theme } from "@/constants/theme";
import { IPopupMenu } from "@/types/popupMenu.type";
import { CirclePlus } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Backdrop from "./backdrop";

export default function PopupMenu({
  items,
  width,
  isOpen,
  height,
  setIsOpen,
}: IPopupMenu) {

  const animatedOpacity = useSharedValue(0);
  const animatedTranslateY = useSharedValue(0);
  const display = useSharedValue<"none" | "flex" | "contents" | undefined>('none')

  const popupAnimatedStyles = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
    transform: [{ translateY: animatedTranslateY.value }],
    display: display.value
  }));

  const isScrollbar = items.length > 4

  useEffect(() => {
    if (isOpen) {
      display.value = 'flex'
      animatedTranslateY.value = withTiming(0, {duration: 180})
      animatedOpacity.value = withTiming(1, { duration: 180 });
    } else {
      animatedTranslateY.value = withTiming(-10, { duration: 120 }, (finished) => {
        if (finished) display.value = 'none'
      });
      animatedOpacity.value = withTiming(0, { duration: 120 });
    }
  }, [isOpen]);

  return (
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)}>
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
      </Backdrop>
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
