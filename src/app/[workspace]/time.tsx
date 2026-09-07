import { Text, View } from 'react-native';
import { FloatingTabBarInset, Theme } from '@/constants/theme';
import { Theater } from 'lucide-react-native';

export default function TimeScreen() {
  return (
    <View style={{ flex: 1, paddingBottom: FloatingTabBarInset, justifyContent: "center", alignItems: "center", backgroundColor: Theme.Colors.surface }}>
      <Text style={{color: "white", fontSize: 36}}>Time</Text>
    </View>
  );
}
