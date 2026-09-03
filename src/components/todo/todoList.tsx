import { View } from "react-native";
import TodoItem from "./todoItem";
import { useAtomValue } from "jotai";
import { taskDataAtom } from "@/state/state";
import { Theme } from "@/constants/theme";


export function TodoList() {

  const data = useAtomValue(taskDataAtom)

  return (
    <View style={{
      gap: Theme.Spacing.md
    }}>
      {
        data.map((item, i) => {
          return (
            <TodoItem description={item.description} id={item.id} isDone={item.isDone} priority={item.priority} title={ item.title } key={i} />
          )
        })
      }
    </View>
  )
}
