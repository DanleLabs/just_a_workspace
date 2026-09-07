import { db } from "../../db/client"
import { Workspace, workspaces } from "../../db/schema"

export const WorkspaceManager = {
  getWorkspaceList: async (): Promise<Workspace[] | null> => {
    const workspaces = await db.query.workspaces.findMany()
    return workspaces || null
  },
  createWorkspace: async (data: Workspace): Promise<Workspace | null> => {
    const workspace = await db.insert(workspaces).values(data).returning()
    return workspace[0] || null
  }
}
