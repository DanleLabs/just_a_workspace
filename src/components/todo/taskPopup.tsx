import { Theme } from "@/constants/theme";
import { Pressable, StyleSheet, View } from "react-native";

interface ITaskPopup {
  isOpen: boolean
}

export function TaskPopup({isOpen}: ITaskPopup) {

  return (
    <View style={[styles.page, { display: isOpen ? 'flex' : 'none' }]} >
      <Pressable></Pressable>
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    top: 400,
    backgroundColor: Theme.Colors.floating,
    height: 800,
    width: 400
  },
  popup: {},
  pressableZone: {},
})
