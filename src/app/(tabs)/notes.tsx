import { Text, View } from 'react-native';
import { FloatingTabBarInset, Theme } from '@/constants/theme';

export default function NotesScreen() {
  return (
    <View style={{ flex: 1, paddingBottom: FloatingTabBarInset + Theme.Spacing.md, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color: "white", fontSize: 36}}>Notes</Text>
    </View>
  );
}
