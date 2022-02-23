import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';
import Demo from './pages/Demo1';
import Demo2 from './pages/Demo2';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/components/NotFound'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/page',
        exact: true,
        component: Home,
      },
      {
        path: '/page/demo1',
        exact: true,
        component: Demo,
      },
      {
        path: '/page/demo2',
        exact: true,
        component: Demo2,
      },
      {
        path: '/page/demo3',
        exact: true,
        component: Demo,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
