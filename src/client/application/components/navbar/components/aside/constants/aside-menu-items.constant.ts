import {
  FiFileMinus,
  FiFilePlus,
  FiHome,
  FiLayers,
  FiSettings,
  FiTruck,
} from 'react-icons/fi'
import { AsideMenuItemItem } from '../components'

export const asideMenuItemsPreferences: AsideMenuItemItem[] = [
  { icon: FiTruck, label: 'Empresas', link: '/companies' },
  { icon: FiLayers, label: 'Categorias', link: '/categories' },
  { icon: FiSettings, label: 'Configurações', link: '/configs' },
]

export const asideMenuItemsInAndOut: AsideMenuItemItem[] = [
  { icon: FiHome, label: 'Dashboard', link: '/dashboard' },
  { icon: FiFilePlus, label: 'Lançar Nota Fiscal', link: '/receipts' },
  { icon: FiFileMinus, label: 'Lançar Despesa', link: '/costs' },
]
