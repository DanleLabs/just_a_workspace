import { TodoList } from '@/components/todo/todoList';
import { Theme } from '@/constants/theme';
import { taskDataAtom } from '@/state/state';
import { useAtomValue } from 'jotai';
import { StyleSheet, Text, View } from 'react-native';

export default function TodoScreen() {

  const data = useAtomValue(taskDataAtom)

  return (
    <View style={styles.page}>
      <TodoList taskData={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Theme.Colors.surface,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
})
