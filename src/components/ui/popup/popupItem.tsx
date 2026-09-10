import { Theme } from "@/constants/theme"
import { LucideIcon } from "lucide-react-native"
import { Pressable, StyleSheet, Text } from "react-native"
import { createAnimatedComponent } from "react-native-reanimated"


interface IPopupItem {
  onPress: () => void,
  text: string
  Icon?: LucideIcon
}

const AnimatedItem = createAnimatedComponent(Pressable)

export default function PopupItem({onPress, text, Icon}: IPopupItem) {


  return (
    <AnimatedItem style={[styles.popupItem, ]} onPress={onPress}>
      {
        Icon && <Icon style={[styles.popupItemIcon, ]} />
      }
      <Text style={[styles.popupItemText]}>{ text }</Text>
    </AnimatedItem>
  )
}

const styles = StyleSheet.create({
  popupItem: {
    paddingHorizontal: Theme.Spacing.lg,
    paddingVertical: Theme.Spacing.sm,
  },
  popupItemText: {
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.md.fontSize,
    lineHeight: Theme.Typography.sizes.md.lineHeight,
  },
  popupItemIcon: {},
})
