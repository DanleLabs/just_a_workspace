import {BookOpenText, CalendarCheck, Clock, LucideIcon, SquarePen} from 'lucide-react-native'

export interface INavigation {
  title: string,
  icon: LucideIcon,
  name: string
}

export const NAVIGATION: INavigation[] = [
  {
    title: 'Todo',
    icon: CalendarCheck,
    name: 'todo'
  },
  {
    title: 'Time',
    icon: Clock,
    name: 'time'
  },
  {
    title: 'Notes',
    icon: SquarePen,
    name: 'notes'
  },
  {
    title: 'Study',
    icon: BookOpenText,
    name: 'study'
  },
]
