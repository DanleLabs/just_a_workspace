import { DarkTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { workspaceList } from '@/state/state';
import { useWorkspace } from '@/hooks/use-workspace';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [loaded, errror] = useFonts({
    'Geist-Regular': require('../../assets/fonts/Geist/static/Geist-Regular.ttf'),
    'Geist-SemiBold': require('../../assets/fonts/Geist/static/Geist-SemiBold.ttf'),
    'Geist-Italic': require('../../assets/fonts/Geist/static/Geist-Italic.ttf'),
    'Geist-Medium': require('../../assets/fonts/Geist/static/Geist-Medium.ttf'),
  })

  useEffect(() => {
    if (loaded || errror) {
      SplashScreen.hideAsync()
    }
  }, [loaded, errror])

  if (!loaded && !errror) {
    return null
  }
  return (
    <ThemeProvider value={DarkTheme}>
      <Slot />
    </ThemeProvider>
  );
}
