import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";


export function TaskPopup({isOpen}: {isOpen: boolean}) {

  return (
    <View>
      <Pressable></Pressable>
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {},
  popup: {},
  pressableZone: {},
})
