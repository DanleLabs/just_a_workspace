import { View } from "react-native";
import TodoItem from "./todoItem";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { taskDataAtom } from "@/state/state";
import { ITaskData } from "@/types/todoItem.type";
import { Theme } from "@/constants/theme";


export function TodoList({taskData}: {taskData: ITaskData[]}) {

  const data = useAtomValue(taskDataAtom)

  return (
    <View style={{
      gap: Theme.Spacing.md
    }}>
      {
        data.map((item, i) => {
          return (
            <TodoItem id={item.id} isDone={item.isDone} priority={item.priority} taskText={ item.taskText } key={i} />
          )
        })
      }
    </View>
  )
}
