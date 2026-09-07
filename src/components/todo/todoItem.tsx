import { Theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckBox from "../ui/checkbox";
import { useAtom, useSetAtom } from "jotai";
import { currentTodoId, isOpenTodoModal, taskDataAtom } from "@/state/state";
import { Task } from "../../../db/schema";
import { useTodo } from "@/hooks/use-tasks";

export default function TodoItem({ title, isDone, id, priority, description   }: Task) {

  const {toggleTodo, removeTodo} = useTodo()
  const [, setData] = useAtom(taskDataAtom)
  const setIsOpenTodoModal = useSetAtom(isOpenTodoModal)
  const [, setCurrentId] = useAtom(currentTodoId)

  return (
    <Pressable
      onPress={() => toggleTodo(id)}
      onLongPress={() => { setCurrentId(id); setIsOpenTodoModal(true)}}
      delayLongPress={300}
      style={styles.todoItem}>
      <CheckBox
        size={Theme.Icons.sizeMd + Theme.Spacing.sm}
        isChecked={isDone || false}
        onChange={() => {}} />
      <View>
        <Text
          style={
            [styles.text,
              { color: isDone ? Theme.Colors.textSecondary : Theme.Colors.textPrimary }
            ]
          }>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    gap: Theme.Spacing.md,
    alignItems: 'center',
    width: '100%',
    paddingVertical: Theme.Spacing.sm,
  },
  text: {
    fontSize: Theme.Typography.sizes.lg.fontSize,
    lineHeight: Theme.Typography.sizes.lg.lineHeight,
    fontFamily: Theme.Typography.families.regular,
  }
})
