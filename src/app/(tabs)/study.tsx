import * as Device from 'expo-device';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FloatingTabBarInset, Spacing, Theme } from '@/constants/theme';

export default function StudyScreen() {
  return (
    <View style={styles.container}>
      <Text style={{color: "white", fontSize: 36}}>Study</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: FloatingTabBarInset + Spacing.three,
    justifyContent: "center", alignItems: "center",
    backgroundColor: Theme.dark.surface
  },
});
