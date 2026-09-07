import { WorkspaceManager } from '@/db/workspaceManager'
import * as crypto from 'expo-crypto'
import { Workspace } from '../../db/schema'
import { useAtom } from 'jotai'
import { workspaceList } from '@/state/state'
import { QueueTaskType, syncService } from '@/sync/sync.service'


export const useWorkspace = () => {

  const [, setWorkspaces] = useAtom(workspaceList)

  const syncWorkspace = async () => {
    setTimeout(async () => {
      const workspaceList = await WorkspaceManager.getWorkspaceList()
      setWorkspaces(workspaceList || [])
      console.log('Workspaces are in sync with DB')
    }, 800)
  }

  const createWorkspace = (data: Omit<Workspace, 'id'>) => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      title: data.title
    }
    setWorkspaces(prev => [...prev, newWorkspace])
    syncService.enqueue<Workspace>({
      id: crypto.randomUUID(),
      type: QueueTaskType.CREATE_WORKSPACE,
      payload: newWorkspace,
    })
    syncWorkspace()
  }

  return {createWorkspace}
}
