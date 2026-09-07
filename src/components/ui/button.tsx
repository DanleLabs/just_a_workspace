import { Theme } from "@/constants/theme"
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native"

interface IButton {
  title: string
  onClick: () => void
  buttonStyles?: StyleProp<ViewStyle>
}

export default function Button({ title, onClick, buttonStyles }: IButton) {

  return (
  <Pressable style={[styles.button, buttonStyles]} onPress={() => onClick()}>
      <Text style={[styles.title]}>
        {title}
      </Text>
  </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.Colors.accent,
    padding: Theme.Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.Radii.full,
  },
  title: {
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.md.fontSize,
    lineHeight: Theme.Typography.sizes.md.lineHeight,
  },
})
