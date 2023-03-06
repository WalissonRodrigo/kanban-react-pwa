import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TerrainIcon from '@mui/icons-material/Terrain';
import LogoutIcon from '@mui/icons-material/Logout';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
    auth: true,
  },
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    title: 'Login',
    icon: GitHubIcon,
  },
  [Pages.PageAuthenticated]: {
    component: asyncComponentLoader(() => import('@/pages/PageAuthenticated')),
    path: '/page-authenticated',
    title: 'Page Auth',
    icon: LockOpenIcon,
    auth: true,
  },
  [Pages.Logout]: {
    component: asyncComponentLoader(() => import('@/pages/Logout')),
    path: '/logout',
    title: 'Logout',
    icon: LogoutIcon,
    auth: true,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Page 3',
    icon: TerrainIcon,
    auth: true,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Page 4',
    icon: BugReportIcon,
    auth: true,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
