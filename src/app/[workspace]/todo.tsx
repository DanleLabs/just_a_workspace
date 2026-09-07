import { TodoList } from '@/components/todo/todoList';
import AddButton from '@/components/ui/addButton';
import { Theme } from '@/constants/theme';
import { useTodo } from '@/hooks/use-tasks';
import { isOpenAddTodoPopupAtom } from '@/state/state';
import { useLocalSearchParams } from 'expo-router';
import { useSetAtom } from 'jotai';
import { Plus } from 'lucide-react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TodoScreen() {

  const setIsOpenAddTodo = useSetAtom(isOpenAddTodoPopupAtom)

  return (
    <View style={styles.page}>
      <TodoList />
      <AddButton onPress={() => { setIsOpenAddTodo(true) }}>
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
  },
})
