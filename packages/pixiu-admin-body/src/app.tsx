import { IAppConfig, runApp } from 'ice';
import NotFound from '@/components/NotFound';
import FrameworkLayout from '@/Layouts/FrameworkLayout';

const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => <>{children}</>,
  },
  router: {
    type: 'browser',
  },
  icestark: {
    Layout: FrameworkLayout,
    getApps: async () => {
      const apps = [
        {
          path: '/seller',
          title: '商家平台',
          loadScriptMode: 'import',
          // React app demo: https://github.com/ice-lab/react-materials/tree/master/scaffolds/icestark-child
          entry: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-ice-vite/index.html',
        },
        {
          path: '/waiter',
          title: '小二平台',
          loadScriptMode: 'import',
          entry: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-vue3-vite/index.html',
        },
      ];
      return apps;
    },
    appRouter: {
      NotFoundComponent: NotFound,
    },
  },
};

runApp(appConfig as IAppConfig);
