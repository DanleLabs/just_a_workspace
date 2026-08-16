import { Text, View } from 'react-native';
import { FloatingTabBarInset, Spacing } from '@/constants/theme';

export default function NotesScreen() {
  return (
    <View style={{ flex: 1, paddingBottom: FloatingTabBarInset + Spacing.three, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color: "white", fontSize: 36}}>Notes</Text>
    </View>
  );
}
