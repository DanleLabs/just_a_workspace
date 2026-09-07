import { Theme } from "@/constants/theme";
import { currentTodoId, isOpenTodoModal } from "@/state/state";
import { useAtom, useAtomValue } from "jotai";
import { X } from "lucide-react-native";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Backdrop from "../ui/backdrop";
import { useTodo } from "@/hooks/use-tasks";
import Button from "../ui/button";
import Animated, { createAnimatedComponent, measure, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import * as Haptics from 'expo-haptics';

interface ITaskPopup {
  todoId: string
}

  const MODAL_HEIGHT_PROCENT = 60

export function TodoPopup() {

  const {height: SCREEN_HEIGHT} = useWindowDimensions()

  const MODAL_HEIGHT_PX = SCREEN_HEIGHT * (MODAL_HEIGHT_PROCENT / 100)

  const translateY = useSharedValue(MODAL_HEIGHT_PX)
  const display = useSharedValue<"none" | "flex" | "contents">('none')

  const animatedViewStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    display: display.value
  }))

  const [isOpen, setIsOpen] = useAtom(isOpenTodoModal)
  const { removeTodo } = useTodo()
  const todoId = useAtomValue(currentTodoId)

  useEffect(() => {
    if (isOpen) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      display.value = 'flex'
      translateY.value = withSpring(0, {
        damping: 150,
        stiffness: 2000,
      })
    } else {
      translateY.value = withSpring(MODAL_HEIGHT_PX, {
        damping: 150,
        stiffness: 2000,
      }, (finished) => {
        if (finished) display.value = 'none'
      })
    }
  }, [isOpen])

  return (
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <Animated.View style={[styles.modal, animatedViewStyles]} >
          <Pressable style={styles.closeButton} onPress={() => setIsOpen(false)}>
            <X style={styles.icon} size={Theme.Icons.sizeMd} color={Theme.Colors.textPrimary} />
          </Pressable>
        <Button buttonStyles={{
          position: 'absolute',
          bottom: Theme.Spacing.xxl,
          left: Theme.Spacing.lg,
          right: Theme.Spacing.lg,
        }} title={'Delete Task'} onClick={() => { removeTodo(todoId!); setIsOpen(false)}} />
          <View></View>
        </Animated.View>
      </Backdrop>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: '40%',
    backgroundColor: Theme.Colors.floating,
    height: '60%',
    width: '100%',
    zIndex: 20,
    borderRadius: Theme.Radii.xl,
  },
  popup: {},
  pressableZone: {},
  icon: {},
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: Theme.Spacing.md,
  },
})
