import { Theme } from "@/constants/theme";
import { ITaskData } from "@/types/todoItem.type";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "../ui/checkbox";
import { useState } from "react";
import { useAtom } from "jotai";
import { taskDataAtom } from "@/state/state";

export default function TodoItem({ taskText, isDone, id, priority   }: ITaskData) {

  const [data, setData] = useAtom(taskDataAtom)

  return (
    <View style={styles.todoItem}>
      <CheckBox isChecked={isDone} onChange={() => {
          console.log('[tap]', id);
          setData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)),
          )
        }} />
      <Text style={styles.text}>{ taskText }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    marginBottom: Theme.Spacing.md,
    flexDirection: "row",
    gap: Theme.Spacing.sm,
  },
  text: {
    color: Theme.Colors.contrast,
    fontSize: Theme.Typography.sizes.md.fontSize,
    lineHeight: Theme.Typography.sizes.md.lineHeight,
    fontFamily: Theme.Typography.families.regular,
  }
})
