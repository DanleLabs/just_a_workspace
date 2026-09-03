import { Redirect } from 'expo-router';
import { db } from '../../db/client';
import migrations from '../../drizzle/migrations'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'

export default function HomeScreen() {
  const { success, error } = useMigrations(db, migrations)

  return <Redirect href="/todo" />;
}
