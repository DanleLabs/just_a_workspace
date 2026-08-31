import { Pressable, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';

import { NAVIGATION } from '@/constants/data/navigation.data';
import { Theme, FloatingTabBar } from '@/constants/theme';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import TabItem from './tabItem';

const SIDE_MARGIN = 20;

export function FloatingNavBar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const { width } = useWindowDimensions();

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
          backgroundColor: Theme.Colors.floating,
          shadowColor: Theme.Colors.shadow,
        },
      ]}>
      {NAVIGATION.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === activeIndex;
        return (
          <TabItem key={index} icon={Icon} index={index} isActive={isActive} name={item.name} title={item.title} onSelect={onSelect}></TabItem>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: FloatingTabBar.bottomOffset,
    left: Theme.Spacing.none,
    right: Theme.Spacing.none,
    height: FloatingTabBar.height,
    flexDirection: 'row',
    borderRadius: FloatingTabBar.height / 2,
    paddingHorizontal: Theme.Spacing.xs,
    paddingVertical: Theme.Spacing.xs,
    elevation: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    width: FloatingTabBar.maxWidth,
    flex: 1,
  },
});
