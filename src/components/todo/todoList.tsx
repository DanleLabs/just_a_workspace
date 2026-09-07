import { View } from "react-native";
import TodoItem from "./todoItem";
import { useAtomValue } from "jotai";
import { taskDataAtom } from "@/state/state";
import { Theme } from "@/constants/theme";
import { useEffect } from "react";
import { useTodo } from "@/hooks/use-tasks";
import { useLocalSearchParams } from "expo-router";


export function TodoList() {

  const { workspace } = useLocalSearchParams()
  const {loadTodos} = useTodo()
  useEffect(() => {
    loadTodos()
  }, [workspace])
  const data = useAtomValue(taskDataAtom)

  return (
    <View style={{
      width: '100%',
      paddingHorizontal: Theme.Spacing.md
    }}>
      {
        data.map((item, i) => {
          return (
            <TodoItem workspaceId={item.workspaceId} description={item.description} id={item.id} isDone={item.isDone} priority={item.priority} title={ item.title } key={i} />
          )
        })
      }
    </View>
  )
}
