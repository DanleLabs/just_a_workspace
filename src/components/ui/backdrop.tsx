import { Theme } from "@/constants/theme"
import { PropsWithChildren, useEffect } from "react"
import { StyleProp } from "react-native"
import { StyleSheet, View, Pressable, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface IBackdrop extends PropsWithChildren {
  isOpen: boolean
  onClick: () => void
  pageStyle?: StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Backdrop({ isOpen, onClick, children, pageStyle }: IBackdrop) {
  const animatedBgOpacity = useSharedValue(0)
  const display = useSharedValue<"none" | "flex">('none')

  const backdropAnimatedStyles = useAnimatedStyle(() => ({
    opacity: animatedBgOpacity.value,
    display: display.value,
  }))

  useEffect(() => {
    if (isOpen) {
      display.value = 'flex'
      animatedBgOpacity.value = withTiming(0.3, { duration: 180 })
    } else {
      animatedBgOpacity.value = withTiming(0, { duration: 120 }, (finished) => {
        if (finished) {
          'worklet'
          display.value = 'none'
        }
      })
    }
  }, [isOpen])

  return (
    <View style={[styles.page, pageStyle]} pointerEvents={isOpen ? 'auto' : 'none'}>
      <AnimatedPressable
        onPress={onClick}
        style={[styles.backdrop, backdropAnimatedStyles]}
      />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: Theme.ZPlacing.backdrop,
    backgroundColor: Theme.Colors.background,
  },
  page: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    borderRadius: Theme.Radii.xl,
    overflow: 'hidden',
  },
})
