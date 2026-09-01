import { Theme } from "@/constants/theme";
import { ITaskData } from "@/types/todoItem.type";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "../ui/checkbox";
import { useState } from "react";
import { useAtom } from "jotai";
import { taskDataAtom } from "@/state/state";

export default function TodoItem({ taskText, isDone, id, priority   }: ITaskData) {

  const [, setData] = useAtom(taskDataAtom)

  return (
    <View style={styles.todoItem}>
      <CheckBox size={Theme.Icons.sizeMd + Theme.Spacing.sm} isChecked={isDone} onChange={() => {
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
    flexDirection: 'row',
    gap: Theme.Spacing.md,
    alignItems: 'center',
  },
  text: {
    color: Theme.Colors.contrast,
    fontSize: Theme.Typography.sizes.lg.fontSize,
    lineHeight: Theme.Typography.sizes.lg.lineHeight,
    fontFamily: Theme.Typography.families.regular,
  }
})
