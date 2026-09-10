import { workspacePopupAtom } from "@/state/state"
import { useSetAtom } from "jotai"
import { LucideIcon } from "lucide-react-native"
import { Workspace } from "../../db/schema"

export enum PopupPosition {
  BOTTOM = 'bottom',
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right'
}

type TSetIsOpen = ReturnType<typeof useSetAtom<typeof workspacePopupAtom>>

export interface IPopupMenu {
  items: Workspace[],
  isOpen: boolean,
  height?: number,
  width?: number,
  elementRef?: React.Ref<any>
  position?: PopupPosition
  setIsOpen: TSetIsOpen,
  onItemClick: () => void,
}
