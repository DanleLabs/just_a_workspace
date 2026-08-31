import { Theme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";


export default function SwitchMenu() {
  return (
    <View style={styles.menu}></View>
  )
}

const styles = StyleSheet.create({
  menu: {
    height: 35,
    width: 340,
    backgroundColor: Theme.Colors.floating,
    borderRadius: Theme.Radii.full,
    //position: "absolute",
    //bottom: Theme.Spacing.sm,
    alignSelf: "center",
  },
})
