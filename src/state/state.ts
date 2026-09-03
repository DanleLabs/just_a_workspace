import { atom } from 'jotai'
import { Task } from '../../db/schema'

export const taskDataAtom = atom<Task[]>([])
export const workspacePopupAtom = atom<boolean>(false)
export const isOpenAddTodoPopupAtom = atom<boolean>(false)
