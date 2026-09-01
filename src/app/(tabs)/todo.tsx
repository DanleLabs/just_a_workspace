import { TaskPopup } from '@/components/todo/taskPopup';
import { TodoList } from '@/components/todo/todoList';
import AddButton from '@/components/ui/addButton';
import { Theme } from '@/constants/theme';
import { taskDataAtom } from '@/state/state';
import { useAtomValue } from 'jotai';
import { Plus } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function TodoScreen() {

  const data = useAtomValue(taskDataAtom)

  return (
    <View style={styles.page}>
      <TaskPopup isOpen={false} />
      <TodoList taskData={data} />
      <AddButton onPress={() => { console.log('hello world') }}>
        <Plus size={Theme.Icons.sizeLg} strokeWidth={Theme.Icons.strokeWidth} color={Theme.Colors.textPrimary} />
      </AddButton>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Theme.Colors.surface,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: Theme.Spacing.md,
    paddingTop: Theme.Spacing.lg,
  },
})
