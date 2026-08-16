import { Tabs, usePathname, useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { FloatingNavBar } from '@/components/floating-nav-bar';
import { NAVIGATION } from '@/constants/data/navigation.data';

export default function TabsLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const activeIndex = Math.max(
    0,
    NAVIGATION.findIndex((item) => pathname === `/${item.name}`)
  );

  return (
    <View style={styles.container}>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
        {NAVIGATION.map((item) => (
          <Tabs.Screen key={item.name} name={item.name} options={{ title: item.title }} />
        ))}
      </Tabs>
      <View style={styles.overlay} pointerEvents="box-none">
        <FloatingNavBar
          activeIndex={activeIndex}
          onSelect={(index) => router.push(`/${NAVIGATION[index].name}` as Href)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
  },
});