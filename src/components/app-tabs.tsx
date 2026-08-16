import { FloatingNavBar } from './floating-nav-bar';

type TabBarProps = {
  state: { index: number; routeNames: string[] };
  navigation: { navigate: (name: string, params?: object) => void };
};

export default function AppTabs({ state, navigation }: TabBarProps) {
  return (
    <FloatingNavBar
      activeIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    />
  );
}