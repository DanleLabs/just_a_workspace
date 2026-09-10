import { db } from "../../db/client";
import { UpdateUerPreferences, userPreferences, UserPreferences } from "../../db/schema";



export const PreferencesManager = {
  getPreferences: async (): Promise<UserPreferences> => {
    const result = await db.query.userPreferences.findMany()
    return result[0]
  },
  updatePreferences: async (data: UpdateUerPreferences): Promise<UserPreferences> => {
    const result = await db.update(userPreferences).set(data).returning()
    return result[0]
  }
}
