import { Theme } from "@/constants/theme";
import { WorkspaceManager } from "@/db/workspaceManager";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Backdrop from "../ui/backdrop";
import { createAnimatedComponent, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAtom } from "jotai";
import { useLocalSearchParams } from "expo-router";
import { isOpenAddWorkspacePopup } from "@/state/state";
import { useWorkspace } from "@/hooks/use-workspace";
import { useEffect, useState } from "react";

const AnimatedPopup = createAnimatedComponent(View)

export default function AddWorkspace() {
  const [isOpen, setIsOpen] = useAtom(isOpenAddWorkspacePopup)
  const { workspace } = useLocalSearchParams<{ workspace: string }>()

  const {createWorkspace} = useWorkspace()

  const animatedOpacity = useSharedValue(0);
  const animatedBgOpacity = useSharedValue(0)
  const animatedTranslateY = useSharedValue(0);
  const display = useSharedValue<"none" | "flex" | "contents" | undefined>('none')

  const popupAnimatedStyles = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
    transform: [{ translateY: animatedTranslateY.value }],
    display: display.value
  }));

  const handlePress = () => {
    if (text === '') return
    Keyboard.dismiss()
    setIsOpen(false)
    setText('')
    createWorkspace({
      title: text
    })
  }

  const [text, setText] = useState('')

  useEffect(() => {
    if (isOpen) {
      display.value = 'flex'
      animatedBgOpacity.value = withTiming(0.4, {duration: 180})
      animatedTranslateY.value = withTiming(0, {duration: 180})
      animatedOpacity.value = withTiming(1, { duration: 180 });
    } else {
      animatedTranslateY.value = withTiming(-10, { duration: 120 });
      animatedOpacity.value = withTiming(0, { duration: 120 });
      animatedBgOpacity.value = withTiming(0.3, { duration: 120 }, (finished) => {
        if (finished) {
          display.value = 'none'
        }
      })
    }
  }, [isOpen]);

  return (
    <Backdrop pageStyle={{ justifyContent: 'center' }} isOpen={isOpen} onClick={() => {
      Keyboard.dismiss()
      setIsOpen(false)
    }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        >
          <AnimatedPopup style={[styles.popup, popupAnimatedStyles]}>
            <Text style={styles.title}>Create Workspace</Text>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Workspace..."
              placeholderTextColor={Theme.Colors.textSecondary}
            />
            <Pressable style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonLabel}>Save</Text>
            </Pressable>
          </AnimatedPopup>
        </KeyboardAvoidingView>
      </Backdrop>

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
    alignSelf: 'center',
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
