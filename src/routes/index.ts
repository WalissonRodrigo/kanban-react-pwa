import LogoutIcon from '@mui/icons-material/Logout';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Kanban]: {
    component: asyncComponentLoader(() => import('@/pages/Kanban')),
    path: '/',
    title: 'Kanban',
    icon: ViewKanbanIcon,
    auth: true,
  },
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    // title: 'Login',
    // icon: GitHubIcon,
  },
  [Pages.Logout]: {
    component: asyncComponentLoader(() => import('@/pages/Logout')),
    path: '/logout',
    title: 'Logout',
    icon: LogoutIcon,
    auth: true,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
