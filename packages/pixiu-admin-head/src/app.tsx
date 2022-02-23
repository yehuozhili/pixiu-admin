import { IAppConfig, runApp } from 'ice';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
};

runApp(appConfig as IAppConfig);
