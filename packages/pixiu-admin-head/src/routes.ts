import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/Layout';
import LoginWrapper from './components/LoginWrapper';
import Login from './pages/Login';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/components/NotFound'));
const authLayout = LoginWrapper(Layout);
const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: authLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
