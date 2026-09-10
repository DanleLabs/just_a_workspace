import { Theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckBox from "../ui/checkbox";
import { useAtom, useSetAtom } from "jotai";
import { currentTodoId, isOpenTodoModal, taskDataAtom } from "@/state/state";
import { Task } from "../../../db/schema";
import { useTodo } from "@/hooks/use-tasks";
import { createAnimatedComponent, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedText = createAnimatedComponent(Text)

export default function TodoItem({ title, isDone, id, priority, description }: Omit<Task, 'createdAt' | 'updatedAt'>) {

  const isPressed = useSharedValue(isDone ? 1 : 0)

  const animatedTextBackground = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        isPressed.value,
        [0, 1],
        [Theme.Colors.textPrimary, Theme.Colors.textSecondary]
      )
    }
  })

  useEffect(() => {
    if (isDone) {
      isPressed.value = withTiming(1, {duration: 100})
    } else {
      isPressed.value = withTiming(0, {duration: 100})
    }
  }, [isDone])

  const {toggleTodo, removeTodo} = useTodo()
  const [, setData] = useAtom(taskDataAtom)
  const setIsOpenTodoModal = useSetAtom(isOpenTodoModal)
  const [, setCurrentId] = useAtom(currentTodoId)

  return (
    <Pressable
      onPress={() => {
        toggleTodo(id)
      }}
      onLongPress={() => { setCurrentId(id); setIsOpenTodoModal(true)}}
      delayLongPress={300}
      style={styles.todoItem}>
      <CheckBox
        size={Theme.Icons.sizeMd + Theme.Spacing.sm}
        isChecked={isDone || false}
        onChange={() => {}} />
      <View>
        <AnimatedText
          style={
            [styles.text, animatedTextBackground]
          }>{title}</AnimatedText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    gap: Theme.Spacing.md,
    alignItems: 'center',
    width: '100%',
    paddingVertical: Theme.Spacing.sm,
    paddingRight: Theme.Spacing.lg,
  },
  text: {
    fontSize: Theme.Typography.sizes.lg.fontSize,
    lineHeight: Theme.Typography.sizes.lg.lineHeight,
    fontFamily: Theme.Typography.families.regular,
  }
})
