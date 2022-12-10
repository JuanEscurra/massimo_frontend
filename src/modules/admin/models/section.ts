import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface section {
  title: string,
  path: string,
  icon: any
}

export const sections: section[] = [
  {
    title: 'Gestionar usuarios',
    path: '/admin/users',
    icon: GroupIcon
  },
  {
    title: 'Gestionar productos',
    path: '/admin/products',
    icon: InventoryIcon
  },
  {
    title: 'Generar comanda',
    path: '/admin/commands',
    icon: ListAltIcon
  },
  {
    title: 'Generar ticket',
    path: '/admin/tickets',
    icon: ReceiptIcon
  },
  {
    title: 'Generar reporte',
    path: '/admin/reports',
    icon: AssessmentIcon
  }
];