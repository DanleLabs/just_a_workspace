import { LucideIcon } from "lucide-react-native"

export enum PopupPosition {
  BOTTOM = 'bottom',
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface IPopupMenu {
  items: { title: string, Icon?: LucideIcon, fn: () => void }[],
  isOpen: boolean,
  height: number,
  width?: number,
  elementRef: React.Ref<any>
  position: PopupPosition
  setIsOpen: (prev: boolean) => void
}
