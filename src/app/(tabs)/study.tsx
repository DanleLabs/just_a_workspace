import * as Device from 'expo-device';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FloatingTabBarInset, Theme } from '@/constants/theme';
import { Plus, PlusCircle } from 'lucide-react-native';
import AddButton from '@/components/ui/addButton';

export default function StudyScreen() {
  return (
    <View style={styles.container}>
      <AddButton onPress={() => 0}>
        <Plus color={Theme.Colors.textPrimary} size={Theme.Icons.sizeLg} strokeWidth={Theme.Icons.strokeWidth}></Plus>
      </AddButton>
      <Text style={{color: "white", fontSize: 36}}>Study</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: FloatingTabBarInset + Theme.Spacing.md,
    justifyContent: "center", alignItems: "center",
    backgroundColor: Theme.Colors.surface
  },
});
