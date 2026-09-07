import { useRouter } from 'expo-router';
import { db } from '../../db/client';
import migrations from '../../drizzle/migrations'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { workspaceList } from '@/state/state';
import { WorkspaceManager } from '@/db/workspaceManager';
import { Theme } from '@/constants/theme';
import * as crypto from 'expo-crypto'

export default function HomeScreen() {
  const { success } = useMigrations(db, migrations);
    const [, setWorkspaces] = useAtom(workspaceList);
    const router = useRouter();

    useEffect(() => {
      if (!success) return;
      let cancelled = false;

      (async () => {
        try {
          const list = await WorkspaceManager.getWorkspaceList();
          if (cancelled) return;

          if (list?.length) {
            setWorkspaces(list);
            router.replace(`/${list[0].id}/todo`);
            return;
          }

          const def = await WorkspaceManager.createWorkspace({
            id: crypto.randomUUID(),
            title: 'Default',
          });
          if (cancelled || !def) return;
          setWorkspaces([def]);
          router.replace(`/${def.id}/todo`);
        } catch (err) {
          console.error('Bootstrap failed:', err);
        }
      })();

      return () => { cancelled = true; };
    }, [success]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Theme.Colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.background,
  },
});
