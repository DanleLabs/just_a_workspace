import { Text, View } from 'react-native';
import { FloatingTabBarInset } from '@/constants/theme';

export default function TimeScreen() {
  return (
    <View style={{ flex: 1, paddingBottom: FloatingTabBarInset, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color: "white", fontSize: 36}}>Time</Text>
    </View>
  );
}
