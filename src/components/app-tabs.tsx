import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';

import { NAVIGATION } from '@/constants/data/navigation.data';
import { Colors, FloatingTabBar, Spacing } from '@/constants/theme';

const SIDE_MARGIN = 20;

const Palette = {
  light: {
    background: '#F3F4F6',
    activeTint: '#2299f2',
    inactiveTint: Colors.light.textSecondary,
    activeBackground: '#E0E1E6',
    shadow: '#000',
  },
  dark: {
    background: '#232323',
    activeTint: Colors.dark.accent,
    inactiveTint: '#ececec',
    activeBackground: '#1b374d',
    shadow: '#000',
  },
} as const;

export default function AppTabs() {
  const scheme = useColorScheme();
  const { width } = useWindowDimensions();
  const palette = Palette[scheme === 'dark' ? 'dark' : 'light'];

  const marginHorizontal =
    width > FloatingTabBar.maxWidth + SIDE_MARGIN * 2
      ? (width - FloatingTabBar.maxWidth) / 2
      : SIDE_MARGIN;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: 'below-icon',
        animation: "none",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarActiveTintColor: palette.activeTint,
        tabBarInactiveTintColor: palette.inactiveTint,
        tabBarActiveBackgroundColor: palette.activeBackground,
        tabBarButton: ({ ref: _ref, pressOpacity: _pressOpacity, hoverEffect: _hoverEffect, ...props }) => (
          <Pressable {...props} style={[props.style, styles.tabButton]} />
        ),
        tabBarStyle: {
          position: 'absolute',
          bottom: FloatingTabBar.bottomOffset,
          height: FloatingTabBar.height,
          marginHorizontal,
          backgroundColor: palette.background,
          borderTopWidth: 0,
          borderRadius: 999, //FloatingTabBar.height / 2,
          paddingTop: 4,
          paddingBottom: 4,
          paddingHorizontal: 3,
          elevation: 12,
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 24,
        },
        tabBarItemStyle: {
          flex: 1,
          borderRadius: 999,
          overflow: 'hidden',
          marginHorizontal: Spacing.half,
        },
      }}
    >
      {NAVIGATION.map((item) => {
        const Icon = item.icon;
        return (
          <Tabs.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.title,
              tabBarAccessibilityLabel: item.title,
              tabBarIcon: ({ color, size, focused }) => (
                <Icon size={size} color={color} strokeWidth={1.75} />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
