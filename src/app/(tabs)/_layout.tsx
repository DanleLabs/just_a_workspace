import TopTabs, { MaterialTopTabBarProps } from 'expo-router/js-top-tabs';
import { StyleSheet, View } from 'react-native';

import AppTabs from '@/components/app-tabs';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <TopTabs
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: true,
          animationEnabled: true,
        }}
        tabBar={(props: MaterialTopTabBarProps) => <AppTabs {...props} />}
      >
        <TopTabs.Screen name="study" options={{ title: 'Study' }} />
        <TopTabs.Screen name="todo" options={{ title: 'Todo' }} />
        <TopTabs.Screen name="time" options={{ title: 'Time' }} />
        <TopTabs.Screen name="notes" options={{ title: 'Notes' }} />
      </TopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
