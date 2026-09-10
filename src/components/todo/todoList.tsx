import { View } from "react-native";
import TodoItem from "./todoItem";
import { useAtomValue } from "jotai";
import { activeWorkspace, taskDataAtom } from "@/state/state";
import { Theme } from "@/constants/theme";
import { useEffect, useState } from "react";
import { useTodo } from "@/hooks/use-tasks";
import { useLocalSearchParams } from "expo-router";
import { Loader } from "lucide-react-native";


export function TodoList() {

  const { loadTodos } = useTodo()
  const currentWorkspace = useAtomValue(activeWorkspace)
  useEffect(() => {
    loadTodos()
  }, [currentWorkspace])
  const data = useAtomValue(taskDataAtom)

  return (
    <View style={{
      width: '100%',
      paddingHorizontal: Theme.Spacing.lg
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
