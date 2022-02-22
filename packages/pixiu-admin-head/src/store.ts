import { createStore } from 'ice';
import layout from './models/layout';
import tab from './models/tab';

const store = createStore(
  {
    layout,
    tab,
  },
  {
    // options
  },
);

export default store;
