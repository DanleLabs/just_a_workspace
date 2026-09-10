import { IPopup } from "@/components/ui/popup/popup"
import { isOpenPopup, popupParams } from "@/state/state"
import { useAtom } from "jotai"



export const usePopup = () => {

  const [, setPopupParam] = useAtom(popupParams)
  const [, setIsOpen] = useAtom(isOpenPopup)

  const showPopup = (params: Omit<IPopup, 'isOpen'>) => {
    setPopupParam(params)
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  return { showPopup, closePopup }
}
