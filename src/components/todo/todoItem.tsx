import { Theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckBox from "../ui/checkbox";
import { useAtom } from "jotai";
import { taskDataAtom } from "@/state/state";
import { Task } from "../../../db/schema";
import { useTodo } from "@/hooks/use-tasks";

export default function TodoItem({ title, isDone, id, priority, description   }: Task) {

  const {toggleTodo, removeTodo} = useTodo()
  const [, setData] = useAtom(taskDataAtom)

  return (
    <View style={styles.todoItem}>
      <CheckBox
        size={Theme.Icons.sizeMd + Theme.Spacing.sm}
        isChecked={isDone || false}
        onChange={() => toggleTodo(id)} />
      <Pressable onPress={() => removeTodo(id)}>
        <Text
          style={
            [styles.text,
              { color: isDone ? Theme.Colors.textSecondary : Theme.Colors.textPrimary }
            ]
          }>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    gap: Theme.Spacing.md,
    alignItems: 'center',
  },
  text: {
    fontSize: Theme.Typography.sizes.lg.fontSize,
    lineHeight: Theme.Typography.sizes.lg.lineHeight,
    fontFamily: Theme.Typography.families.regular,
  }
})
