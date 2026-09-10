import { useRouter } from 'expo-router';
import { db } from '../../db/client';
import migrations from '../../drizzle/migrations'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { activeWorkspace, workspaceList } from '@/state/state';
import { WorkspaceManager } from '@/db/workspaceManager';
import { Theme } from '@/constants/theme';
import * as crypto from 'expo-crypto'
import { userPreferences } from '../../db/schema';
import { PreferencesManager } from '@/db/preferencesManager';

export default function HomeScreen() {
  const { success, error } = useMigrations(db, migrations);
  const [currentWorkspace, setCurrentWorkspace] = useAtom(activeWorkspace)
  if (error) console.log("DB error: ", error)
  if (success) console.log("Migration Successful")
    const [, setWorkspaces] = useAtom(workspaceList);
    const router = useRouter();

    useEffect(() => {
      if (!success) return;
      let cancelled = false;

      (async () => {
        await db.insert(userPreferences).values({id: 'user'}).onConflictDoNothing()
        try {
          const list = await WorkspaceManager.getWorkspaceList();
          if (cancelled) return;

          if (list?.length) {
            setWorkspaces(list);
            const prefs = await PreferencesManager.getPreferences()
            const target = list.find(w => w.id === prefs?.defaultWorkspaceId) ?? list[0]
            setCurrentWorkspace(target)
            router.replace(`/${target.id}/todo`);
            return;
          }

          const def = await WorkspaceManager.createWorkspace({
            id: crypto.randomUUID(),
            title: 'Default',
            createdAt: null,
            updatedAt: null
          });
          if (cancelled || !def) return;
          PreferencesManager.updatePreferences({
            defaultWorkspaceId: def?.id
          })
          setWorkspaces([def]);
          setCurrentWorkspace(def)
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
