import { useEffect } from "react"
import { Keyboard, Platform } from "react-native"
import { useSharedValue, withTiming } from "react-native-reanimated"


export const useKeyboardOffset = (maxLift?: number) => {
  const keybordOffset = useSharedValue(0)

  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        const lift = maxLift
          ? Math.min(e.endCoordinates.height, maxLift)
          : e.endCoordinates.height
        keybordOffset.value = withTiming(lift, {duration: 200})
      }
    )
    const hide = Keyboard.addListener(
      Platform.OS === 'ios'
        ? 'keyboardWillHide'
        : 'keyboardDidHide',
      () => {
        keybordOffset.value = withTiming(0, {duration: 200})
      }
    )
    return () => {
      show.remove()
      hide.remove()
    }
  }, [maxLift])

  return keybordOffset
}
