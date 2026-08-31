import { Theme } from "@/constants/theme";
import { ChevronDown, ChevronDownCircle, ChevronRight, CircleUserRound, UserRound } from "lucide-react-native";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from "react-native-reanimated";
import PopupMenu from "./ui/popupMenu";
import { WORKSPACE_POPUP } from "@/mock-data/popup.data";
import { IPopupMenu, PopupPosition } from "@/types/popupMenu.type";
import SwitchMenu from "./ui/switchMenu";
import { workspacePopupAtom } from "@/state/state";
import { useAtom } from "jotai";

const AnimatedView = Animated.createAnimatedComponent(View)

export default function Header({setPopupArgs}: {setPopupArgs: Dispatch<SetStateAction<IPopupMenu>>}) {

  const elementRef = useRef(null)

  const [isOpenMenu, setIsOpenMenu] = useAtom(workspacePopupAtom)

  const rotation = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}]
  }))

  const handlePress = () => {
    setIsOpenMenu(prev => !prev)
  }

  useEffect(() => {

    setPopupArgs(prev => ({
      ...prev,
      elementRef: elementRef,
      height: 200,
      isOpen: isOpenMenu,
      items: WORKSPACE_POPUP,
      position: PopupPosition.BOTTOM
    }))

    const targetRotation = isOpenMenu ? -180 : 0;

      rotation.value = withSpring(targetRotation, {
        damping: 150,
        stiffness: 1900,
      });
  }, [isOpenMenu])

  return (
    <View ref={elementRef} style={[styles.header]}>
      <View style={styles.box}>
        <Pressable onPress={handlePress} style={styles.workspaceBox}>
          <Text style={styles.text}>Workspace</Text>
          <AnimatedView style={[animatedStyle]}>
            <ChevronDown size={Theme.Icons.sizeSm} strokeWidth={Theme.Icons.strokeWidth - 0.25} color={Theme.Colors.textSecondary}/>
          </AnimatedView>
        </Pressable>
        <UserRound color={Theme.Colors.textPrimary} size={Theme.Icons.sizeMd} strokeWidth={Theme.Icons.strokeWidth} />
      </View>
      <SwitchMenu items={[
        {
          title: 'Todo',
          url: 'todo',
          id:'1',
        },
        {
          title: 'Calendar',
          url: 'calendar-view',
          id: '2',
        },
      ]} />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Theme.Spacing.none,
    flexDirection: "row",
    paddingHorizontal: Theme.Spacing.lg,
    overflow: "hidden",
    marginBottom: Theme.Spacing.md
  },
  text: {
    color: Theme.Colors.contrast,
    fontSize: Theme.Typography.sizes.xl.fontSize,
    lineHeight: Theme.Typography.sizes.xl.lineHeight,
    fontFamily: Theme.Typography.families.regular,
  },
  workspaceBox: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingRight: Theme.Spacing.xxl
  },
  header: {
    paddingTop: 45,
    paddingBottom: Theme.Spacing.md,
    backgroundColor: Theme.Colors.surface,
  },
})
