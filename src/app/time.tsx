import { Text } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { FloatingTabBarInset, Spacing } from '@/constants/theme';

export default function TimeScreen() {
  return (
    <ThemedView style={{ flex: 1, paddingBottom: FloatingTabBarInset + Spacing.three, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color: "white", fontSize: 36}}>Time</Text>
    </ThemedView>
  );
}
