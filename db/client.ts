import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite'
import * as schema from './schema'

const expoDb = openDatabaseSync('app_database.db')

expoDb.execSync('PRAGMA journal_mode = WAL;');
expoDb.execSync('PRAGMA busy_timeout = 3000;');
expoDb.execSync('PRAGMA foreign_keys = ON;')

export const db = drizzle(expoDb, { schema })
