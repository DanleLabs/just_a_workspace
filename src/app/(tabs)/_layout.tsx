import TopTabs, { MaterialTopTabBarProps } from 'expo-router/js-top-tabs';
import { StyleSheet, View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import Header from '@/components/header';
import { WORKSPACE_POPUP } from '@/mock-data/popup.data';
import PopupMenu from '@/components/ui/popupMenu';
import { useRef, useState } from 'react';
import { IPopupMenu, PopupPosition } from '@/types/popupMenu.type';
import { NAVIGATION } from '@/constants/data/navigation.data';
import { Theme } from '@/constants/theme';
import { useAtom, useSetAtom } from 'jotai';
import { workspacePopupAtom } from '@/state/state';

export default function TabsLayout() {

  const testRef = useRef<View>(null)

  const [isOpen, setIsOpen] = useAtom(workspacePopupAtom)

  const [popupMenuArgs, setPopupMenuArgs] = useState<IPopupMenu>({
    elementRef: null,
    height: 140,
    isOpen: false,
    items: WORKSPACE_POPUP,
    position: PopupPosition.BOTTOM,
    setIsOpen: setIsOpen,
  })

  return (
    <View ref={testRef} style={styles.container}>
      <PopupMenu setIsOpen={setIsOpen} elementRef={popupMenuArgs.elementRef} height={popupMenuArgs.height} isOpen={isOpen} items={popupMenuArgs.items} position={popupMenuArgs.position} />
      <Header setPopupArgs={
        setPopupMenuArgs
      }></Header>
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
