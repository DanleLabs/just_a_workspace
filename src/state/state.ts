import { atom } from 'jotai'
import { Task, Workspace } from '../../db/schema'
import { IPopup } from '@/components/ui/popup/popup'

export const taskDataAtom = atom<Task[]>([])
export const workspacePopupAtom = atom<boolean>(false)
export const isOpenAddTodoPopupAtom = atom<boolean>(false)
export const isOpenTodoModal = atom<boolean>(false)
export const isBackdrop = atom<boolean>(false)
export const backdropOnClick = atom<(() => void) | null>(null)
export const currentTodoId = atom<string | null>(null)
export const workspaceList = atom<Workspace[]>([])
export const isOpenAddWorkspacePopup = atom<boolean>(false)
export const activeWorkspace = atom<Workspace | null>(null)

export const popupParams = atom<Omit<IPopup, 'isOpen'> | null>(null)
export const isOpenPopup = atom<boolean>(false)
