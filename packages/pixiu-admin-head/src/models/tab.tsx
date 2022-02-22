export default {
  state: {
    tabs: [
      { title: '首页', url: '/page', key: '首页', closeable: false },
      { title: '首页2', url: '/page/2', key: '首页2key' },
    ],
    currentTab: 0,
  },
  reducers: {
    resolveDel(prevState, payload) {
      let current = prevState.currentTab;
      const currentObjKey = prevState.tabs[current].key;
      if (payload === currentObjKey) {
        current = 0;
      }
      const newTabs = prevState.tabs.filter((v) => v.key !== payload);
      const newState = {
        tabs: newTabs,
        currentTab: current,
      };
      return {
        ...prevState,
        ...newState,
      };
    },
    resolveAdd(prevState, payload) {
      // 需要检查原来有没有，有的话不增加，变更current，没有才增加
      let find = 0;
      const isExist = prevState.tabs.some((v, i) => {
        find = i;
        return v.key === payload.key;
      });
      if (!isExist) {
        const tabs = [...prevState.tabs, payload];
        return {
          ...prevState,
          tabs,
          currentTab: tabs.length - 1,
        };
      } else {
        return {
          ...prevState,
          currentTab: find,
        };
      }
    },
    resolveCurrent(prevState, payload) {
      const index = prevState.tabs.findIndex((v) => v.key === payload);
      const currentTab = index;
      return {
        ...prevState,
        currentTab,
      };
    },
  },
  effects: (dispatch) => ({
    deleteTab(key) {
      dispatch.tab.resolveDel(key);
    },
    addTab(obj) {
      dispatch.tab.resolveAdd(obj);
    },
    changeCurrent(key) {
      dispatch.tab.resolveCurrent(key);
    },
  }),
};
