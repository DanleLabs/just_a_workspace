import { Theme } from "@/constants/theme";
import { IPopupMenu } from "@/types/popupMenu.type";
import { CirclePlus } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  createAnimatedComponent,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Backdrop from "../ui/backdrop";
import { useAtom } from "jotai";
import { activeWorkspace, isOpenAddWorkspacePopup, workspacePopupAtom } from "@/state/state";
import { Href, usePathname, useRouter } from "expo-router";
import WorkspaceMenuItem from "./workspaceMenuItem";

const AnimatedPressable = createAnimatedComponent(Pressable)

export default function WorkspaceMenu({
  items,
  width,
  isOpen,
  height,
  setIsOpen,
  onItemClick,
}: IPopupMenu) {

  const isPressed = useSharedValue(0)

  const [isOpenMenu, setIsOpenMenu] = useAtom(workspacePopupAtom)
  const [isOpenPopup, setIsOpenPopup] = useAtom(isOpenAddWorkspacePopup)
  const [currentWorkspace, setCurrentWorkspace] = useAtom(activeWorkspace)

  const animatedBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isPressed.value,
        [0, 1],
        [Theme.Colors.popup, Theme.Colors.popupOnClick]
      )
    }
  })

  const animatedOpacity = useSharedValue(0);
  const animatedTranslateY = useSharedValue(0);
  const display = useSharedValue<"none" | "flex" | "contents" | undefined>('none')

  const router = useRouter()
  const pathname = usePathname()
  const currentTab = pathname.split('/').filter(Boolean).pop() ?? 'todo'

  const popupAnimatedStyles = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
    transform: [{ translateY: animatedTranslateY.value }],
    display: display.value
  }));

  const isScrollbar = items.length > 4

  useEffect(() => {
    if (isOpenMenu) {
      display.value = 'flex'
      animatedTranslateY.value = withTiming(0, {duration: 180})
      animatedOpacity.value = withTiming(1, { duration: 180 });
    } else {
      animatedTranslateY.value = withTiming(-10, { duration: 120 }, (finished) => {
        if (finished) display.value = 'none'
      });
      animatedOpacity.value = withTiming(0, { duration: 120 });
    }
  }, [isOpenMenu]);

  return (
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Animated.View
          style={[
            styles.menu,
            { width: '60%' },
            popupAnimatedStyles,
          ]}
        >
          {items.length > 0 && <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={isScrollbar}
            style={[styles.scrollView, {maxHeight: height}]}
            contentContainerStyle={styles.scrollContent}
          >
          {items.map((item, i) => (
            <WorkspaceMenuItem i={i} item={item} key={i} />
            ))}
          </ScrollView>}

        <AnimatedPressable style={[styles.secondBlock, animatedBackground]}
          onPress={() => {
          setIsOpenPopup(true)
          setIsOpen(false)
          }}
          onPressIn={() => isPressed.value = withTiming(1, { duration: 150 })}
          onPressOut={() => isPressed.value = withTiming(0, { duration: 150 })}
        >
          <CirclePlus size={Theme.Icons.sizeMd} strokeWidth={Theme.Icons.strokeWidth} color={Theme.Colors.contrast} />
            <Text style={styles.menuItemText}>Workspace</Text>
          </AnimatedPressable>
        </Animated.View>
      </Backdrop>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 90,
    left: 15,
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
  },
  menuItemText: {
    color: Theme.Colors.textPrimary,
    fontSize: 18,
  },
});
