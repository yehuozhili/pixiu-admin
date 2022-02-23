// eslint-disable-next-line @iceworks/best-practices/no-http-url
const prefix = 'http://localhost:8888';

export default {
  state: {
    tabs: [{ title: '首页', url: '/page', key: '首页', closeable: false }],
    currentTab: 0,
    domMap: {},
    container: null,
  },
  reducers: {
    storeContainer(prev, dom) {
      return {
        ...prev,
        container: dom,
      };
    },
    resolveDom(prev) {
      const current = prev.tabs[prev.currentTab];
      // 首页key查找map
      if (!prev.domMap[current.key]) {
        const iframe = document.createElement('iframe');
        iframe.src = prefix + (current.url as string);
        iframe.style.border = 'none';
        iframe.style.zIndex = '1';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        if (prev.container) {
          prev.container.appendChild(iframe);
        }
        const originMap = Object.keys(prev.domMap).reduce((p, n) => {
          const r = p;
          r[n] = prev.domMap[n];
          r[n].style.zIndex = '-1';
          return r;
        }, {});
        originMap[current.key] = iframe;
        return {
          ...prev,
          domMap: originMap,
        };
      } else {
        // 如果存在，修改z
        const originMap = Object.keys(prev.domMap).reduce((p, n) => {
          const r = p;
          r[n] = prev.domMap[n];
          if (n === current.key) {
            r[n].style.zIndex = '1';
          } else {
            r[n].style.zIndex = '-1';
          }
          return r;
        }, {});
        return {
          ...prev,
          domMap: originMap,
        };
      }
    },
    deleteDom(prev, key) {
      const pre = prev;
      const dele = pre.domMap[key];
      if (dele) {
        if (pre.container) {
          (pre.container as HTMLDivElement).removeChild(dele);
          const newmap = { ...pre.domMap };
          delete newmap[key];
          return {
            ...prev,
            domMap: newmap,
          };
        }
      }
    },
    resolveDel(prevState, payload) {
      let current = prevState.currentTab;
      const currentObjKey = prevState.tabs[current].key;
      const domMap = { ...prevState.domMap };
      if (payload === currentObjKey) {
        current = 0;
        const { key } = prevState.tabs[0];
        domMap[key].style.zIndex = 1;
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
      dispatch.tab.deleteDom(key);
    },
    addTab(obj) {
      dispatch.tab.resolveAdd(obj);
      dispatch.tab.resolveDom();
    },
    changeCurrent(key) {
      dispatch.tab.resolveCurrent(key);
      dispatch.tab.resolveDom();
    },
  }),
};
