import { LayoutDashboard, Ticket, Users } from 'lucide-react'
import { LogoIcon } from '@/components/brand/logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Coordinador Académico',
    email: 'coordinacion@universidad.edu',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'SIGA',
      logo: LogoIcon,
      plan: 'Mentoría - Sede Central',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Estudiantes',
          url: '/students',
          icon: Users,
        },
        {
          title: 'Tickets',
          url: '/tickets',
          icon: Ticket,
        },
      ],
    },
  ],
}
