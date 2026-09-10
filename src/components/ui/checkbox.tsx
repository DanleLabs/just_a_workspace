import { Theme } from "@/constants/theme"
import { Check, LucideIcon } from "lucide-react-native"
import { Pressable, StyleSheet, View } from "react-native"

interface ICheckBox {
  isChecked: boolean
  onChange: () => void
  Icon?: LucideIcon
  size?: number
}

export default function CheckBox({ isChecked, onChange, Icon = Check, size = 24, }: ICheckBox) {
  return (
    <View style={[styles.box, {width: size, height: size, borderColor: isChecked ? Theme.Colors.accent : Theme.Colors.textSecondary,}]}>
      {isChecked && <Icon color={Theme.Colors.accent} size={Theme.Icons.sizeMd} />}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderRadius: Theme.Radii.full,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
