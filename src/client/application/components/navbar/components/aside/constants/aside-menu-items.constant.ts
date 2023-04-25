import { FiBook, FiHome, FiUser } from 'react-icons/fi'
import { AsideMenuItemItem } from '../components'

export const asideMenuItems: AsideMenuItemItem[] = [
  { icon: FiHome, label: 'Dashboard', link: '/dashboard' },
  { icon: FiUser, label: 'Empresas', link: '/companies' },
  { icon: FiBook, label: 'Categorias', link: '/categories' },
  { icon: FiBook, label: 'Configurações', link: '/configs' },
  { icon: FiBook, label: 'Lançar Nota Fiscal', link: '/receipts' },
  { icon: FiBook, label: 'Lançar Despesa', link: '/costs' },
]
