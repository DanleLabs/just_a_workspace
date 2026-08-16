import { Pressable, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';

import { NAVIGATION } from '@/constants/data/navigation.data';
import { Theme, FloatingTabBar, Spacing } from '@/constants/theme';

const SIDE_MARGIN = 20;

const Palette = {
  dark: {
    background: '#181818',
    activeTint: Theme.dark.accent,
    inactiveTint: '#f1f1f1',
    activeBackground: '#222832',
    shadow: '#000',
  },
} as const;

export function FloatingNavBar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const scheme = useColorScheme();
  const { width } = useWindowDimensions();
  const palette = 'dark';

  const marginHorizontal =
    width > FloatingTabBar.maxWidth + SIDE_MARGIN * 2
      ? (width - FloatingTabBar.maxWidth) / 2
      : SIDE_MARGIN;

  return (
    <View
      style={[
        styles.bar,
        {
          marginHorizontal,
          backgroundColor: Theme.dark.floating,
          shadowColor: Theme.dark.shadow,
        },
      ]}>
      {NAVIGATION.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === activeIndex;
        return (
          <Pressable
            key={item.name}
            onPress={() => onSelect(index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [styles.item, pressed && styles.pressed, {
              padding: 0
            }]}>
            <View
              style={[
                styles.itemFill,
                isActive && { backgroundColor: Theme.dark.backgroundSelected },
              ]}>
              <Icon
                size={Theme.dark.iconSize}
                color={isActive ? Theme.dark.accent : Theme.dark.neutral}
                strokeWidth={1.75}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? Theme.dark.accent : Theme.dark.neutral },
                ]}>
                {item.title}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: FloatingTabBar.bottomOffset,
    left: 0,
    right: 0,
    height: FloatingTabBar.height,
    flexDirection: 'row',
    borderRadius: FloatingTabBar.height / 2,
    paddingHorizontal: 4,
    paddingVertical: 4,
    elevation: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    width: FloatingTabBar.maxWidth
  },
  item: {
    flex: 1,
  },
  itemFill: {
    flex: 1,
    borderRadius: Spacing.five,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});
