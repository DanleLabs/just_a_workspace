import TopTabs, { MaterialTopTabBarProps } from 'expo-router/js-top-tabs';
import { StyleSheet, View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import Header from '@/components/header';
import { useEffect, useRef, useState } from 'react';
import { IPopupMenu, PopupPosition } from '@/types/popupMenu.type';
import { NAVIGATION } from '@/constants/data/navigation.data';
import { Theme } from '@/constants/theme';
import { useAtom, useSetAtom } from 'jotai';
import { activeWorkspace, isOpenPopup, popupParams, taskDataAtom, workspaceList, workspacePopupAtom } from '@/state/state';
import AddTodoPopup from '@/components/todo/addTodoPopup';
import { TaskManager } from '@/db/tasksManager';
import { TodoPopup } from '@/components/todo/todoPopup';
import Backdrop from '@/components/ui/backdrop';
import { useLocalSearchParams } from 'expo-router';
import { WorkspaceManager } from '@/db/workspaceManager';
import AddWorkspace from '@/components/workspace/addWorkspace';
import { Workspace } from '../../../db/schema';
import WorkspaceMenu from '@/components/workspaceMenu/workspaceMenu';
import Popup from '@/components/ui/popup/popup';

export default function TabsLayout() {

  const testRef = useRef<View>(null)

  const [popupParam, setPopupParam] = useAtom(popupParams)
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenPopup)

  const [isOpen, setIsOpen] = useAtom(workspacePopupAtom)
  const [workspaces, setWorkspaces] = useAtom(workspaceList)
  const { workspace } = useLocalSearchParams<{ workspace: string }>()
  const [popupData, setPopupData] = useState<Workspace[]>([])
  const [currentWorkspace, setCurrentWorkspace] = useAtom(activeWorkspace)

  const setTodoData = useSetAtom(taskDataAtom)
  useEffect(() => {
    WorkspaceManager.getWorkspaceList().then((result) => {
      if (!result?.length) {
        setWorkspaces([])
        return
      }
      const filteredWorkspaces = result.filter((item) => item.id !== currentWorkspace!.id)
      setPopupData(filteredWorkspaces)
    })
    TaskManager.getTasksFromWorkspace(currentWorkspace!.id).then((result) => {
      setTodoData(result ?? [])
    }
    ).catch((err) => console.error(err))
    }, [currentWorkspace])

  return (
    <View ref={testRef} style={styles.container}>
      <AddTodoPopup />
      <AddWorkspace />
      {popupParam && <Popup
        {...popupParam}
        isOpen={isOpenModal} />}
      <TodoPopup />
      <WorkspaceMenu onItemClick={() => {}} setIsOpen={setIsOpen} isOpen={isOpen} items={popupData} />
      <Header></Header>
      <TopTabs
        style={styles.topTabs}
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: true,
          animationEnabled: true,
        }}
        tabBar={(props: MaterialTopTabBarProps) => <AppTabs {...props} />}
      >
        {
          NAVIGATION.map((item, i) => {
            return <TopTabs.Screen key={i} name={item.name} options={{ title: item.title }} />
          })
        }
      </TopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Theme.Colors.background,
  },
  topTabs: {
    flex: 1
  }
});
