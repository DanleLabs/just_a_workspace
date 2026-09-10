import { LucideIcon } from "lucide-react-native";
import Backdrop from "../backdrop";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, { createAnimatedComponent, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import PopupItem from "./popupItem";
import { Theme } from "@/constants/theme";
import { useEffect, useState } from "react";

export interface IPopup {
  isOpen: boolean
  position: {
    top: number,
    left: number
  }
  beforePopupOpen?: () => void
  afterPopupOpen?: () => void
  beforePopupClose?: () => void
  afterPopupClose?: () => void
  backdropClick?: () => void
  items: {
    Icon?: LucideIcon
    title: string
    action: () => void
    }[]
}

const AnimatedWindow = createAnimatedComponent(View)

export default function Popup({
  isOpen,
  items,
  afterPopupClose,
  afterPopupOpen,
  beforePopupClose,
  beforePopupOpen,
  position,
  backdropClick
}: IPopup) {

  const [height, setHeight] = useState<number>(0)

  const display = useSharedValue<'flex' | 'none'>('flex')
  const animatedHeight = useSharedValue<number>(0)
  const animatedTranslateY = useSharedValue(10)
  const animatedOpacity = useSharedValue(0)

  const handleLayout = (e: LayoutChangeEvent) => {
      const { height: measuredHeight } = e.nativeEvent.layout;
      setHeight(measuredHeight);
    };

  const animatedHeightStyles = useAnimatedStyle(() => ({
    height: animatedHeight.value
  }))
  const popupStyles = useAnimatedStyle(() => ({
    display: display.value,
    transform: [{ translateY: animatedTranslateY.value }],
    opacity: animatedOpacity.value
  }))

  useEffect(() => {
    if (isOpen) {

    } else {

    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (beforePopupOpen) {
        beforePopupOpen()
      }
      display.value = 'flex'
      animatedTranslateY.value = withTiming(0, {duration: 180})
      animatedOpacity.value = withTiming(1, { duration: 180 },(finished) => {
        if (afterPopupOpen && finished) {
          afterPopupOpen()
        }
      });
    } else {
      if (beforePopupClose) {
        beforePopupClose()
      }
      animatedTranslateY.value = withTiming(-10, { duration: 120 }, (finished) => {
        if (finished) {
          if (afterPopupClose) {
            afterPopupClose()
          }
          display.value = 'none'
        }
      });
      animatedOpacity.value = withTiming(0, { duration: 120 });
      animatedHeight.value = withTiming(0, { duration: 400 }, (finished) => {
        if (finished) {
          if (afterPopupClose) {
            afterPopupClose()
          }
        }
      })
    }
  }, [isOpen, height]);


  return (
    <Backdrop isOpen={isOpen} onClick={() => {
      if (backdropClick) {
        backdropClick()
      }
    }}>
      <AnimatedWindow onLayout={handleLayout} style={[styles.popup, {
        position: 'absolute',
        top: position.top,
        left: position.left
        }, popupStyles]}>
          {
            items.map((item, i) => (
              <PopupItem
                onPress={item.action}
                text={item.title}
                Icon={item.Icon}
                key={i} />
            ))
          }
        </AnimatedWindow>
    </Backdrop>
  )
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor: Theme.Colors.popup,
    borderRadius: Theme.Radii.md,
    zIndex: Theme.ZPlacing.popup,
  },
})
