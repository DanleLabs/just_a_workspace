import { workspacePopupAtom } from "@/state/state"
import { useSetAtom } from "jotai"
import { LucideIcon } from "lucide-react-native"

export enum PopupPosition {
  BOTTOM = 'bottom',
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right'
}

type TSetIsOpen = ReturnType<typeof useSetAtom<typeof workspacePopupAtom>>

export interface IPopupMenu {
  items: { title: string, Icon?: LucideIcon, fn: () => void }[],
  isOpen: boolean,
  height: number,
  width?: number,
  elementRef: React.Ref<any>
  position: PopupPosition
  setIsOpen: TSetIsOpen
}
