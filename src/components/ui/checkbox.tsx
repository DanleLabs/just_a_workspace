import { Theme } from "@/constants/theme"
import { Check, LucideIcon } from "lucide-react-native"
import { Pressable, StyleSheet } from "react-native"

interface ICheckBox {
  isChecked: boolean
  onChange: () => void
  Icon?: LucideIcon
}

export default function CheckBox({ isChecked, onChange, Icon = Check }: ICheckBox) {
  return (
    <Pressable style={styles.box} onPress={() => onChange()}>
      {isChecked && <Icon color={Theme.Colors.textPrimary} size={Theme.Icons.sizeMd} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  box: {
    borderRadius: Theme.Radii.full,
    borderColor: Theme.Colors.accentMuted,
    borderWidth: 1,
    height: Theme.Icons.sizeMd + Theme.Spacing.sm,
    width: Theme.Icons.sizeMd + Theme.Spacing.sm,
  },
})
