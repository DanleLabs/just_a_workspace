import { Theme } from "@/constants/theme";
import { activeWorkspace, isOpenAddWorkspacePopup, workspacePopupAtom } from "@/state/state";
import { useAtom } from "jotai";
import { Pressable, StyleSheet, Text } from "react-native";
import { createAnimatedComponent, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Workspace } from "../../../db/schema";

const AnimatedPressable = createAnimatedComponent(Pressable)

export default function WorkspaceMenuItem({item, i}: {i: number, item: Workspace}) {
  const isPressed = useSharedValue(0)
    const [isOpenMenu, setIsOpenMenu] = useAtom(workspacePopupAtom)

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

    return (
        <AnimatedPressable key={i} style={[styles.menuItem, animatedBackground]}
          onPress={() => {
            setIsOpenMenu(false)
            setCurrentWorkspace(item)
          }}
          onPressIn={() => isPressed.value = withTiming(1, { duration: 150 })}
          onPressOut={() => isPressed.value = withTiming(0, { duration: 150 })}
        >
          <Text style={styles.menuItemText}>{item.title}</Text>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
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
})
