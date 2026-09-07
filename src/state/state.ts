import { atom } from 'jotai'
import { Task, Workspace } from '../../db/schema'

export const taskDataAtom = atom<Task[]>([])
export const workspacePopupAtom = atom<boolean>(false)
export const isOpenAddTodoPopupAtom = atom<boolean>(false)
export const isOpenTodoModal = atom<boolean>(true)
export const isBackdrop = atom<boolean>(false)
export const backdropOnClick = atom<(() => void) | null>(null)
export const currentTodoId = atom<string | null>(null)
export const workspaceList = atom<Workspace[]>([])
