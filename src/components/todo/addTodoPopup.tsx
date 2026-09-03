import { Theme } from "@/constants/theme";
import { isOpenAddTodoPopupAtom, taskDataAtom } from "@/state/state";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createAnimatedComponent, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTodo } from "@/hooks/use-tasks";

const AnimatedPopup = createAnimatedComponent(View)
const AnimatedPressable = createAnimatedComponent(Pressable)

export default function AddTodoPopup() {

  const [isOpen, setIsOpen] = useAtom(isOpenAddTodoPopupAtom)
  const [data, setTaskData] = useAtom(taskDataAtom)

  const {createTodo} = useTodo()

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

  const handlePressAddTask = () => {
    if (text === '') return
    Keyboard.dismiss()
    setIsOpen(false)
    setText('')
    createTodo({
      title: text,
      description: null,
      isDone: null,
      priority: null,
    })
  }

  const [text, setText] = useState('')
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
    <View style={styles.view}>
      <AnimatedPressable style={[styles.bg, bgAnimatedStyles]} onPress={() => { setIsOpen(false); Keyboard.dismiss(); setText('')}}>
      </AnimatedPressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      >
        <AnimatedPopup style={[styles.popup, popupAnimatedStyles]}>
          <Text style={styles.title}>Create Task</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Task..."
            placeholderTextColor={Theme.Colors.textSecondary}
          />
          <Pressable style={styles.button} onPress={handlePressAddTask}>
            <Text style={styles.buttonLabel}>Save</Text>
          </Pressable>
        </AnimatedPopup>
      </KeyboardAvoidingView>
    </View>

  )
}

const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
    backgroundColor: Theme.Colors.background,
    zIndex: 19,
  },
  popup: {
    padding: Theme.Spacing.md,
    backgroundColor: Theme.Colors.popup,
    borderRadius: Theme.Radii.lg,
    zIndex: 20,
    width: 270,
    height: 120,
  },
  input: {
    padding: Theme.Spacing.md,
    borderRadius: Theme.Radii.lg,
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.md.fontSize,
    lineHeight: Theme.Typography.sizes.md.lineHeight,
  },
  title: {
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.lg.fontSize,
  },
  button: {
    paddingVertical: Theme.Spacing.sm,
    paddingHorizontal: Theme.Spacing.lg,
    backgroundColor: Theme.Colors.accent,
    position: 'absolute',
    right: Theme.Spacing.md,
    bottom: Theme.Spacing.md,
    borderRadius: Theme.Radii.full,
  },
  buttonLabel: {
    color: Theme.Colors.textPrimary,
  },
})
