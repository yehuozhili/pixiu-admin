module.exports = {
  'POST /api/getMenu': {
    data: [
      {
        disabled: false,
        icon: 'icon-javascript',
        key: '3',
        index: 3,
        title: '菜单1',
        url: '/page/demo1',
      },
      {
        disabled: true,
        icon: 'icon-python',
        key: '4',
        index: 4,
        title: '菜单2',
        url: '/page/demo2',
      },
      {
        disabled: true,
        icon: 'icon-java',
        key: '1',
        index: 2,
        title: '财务中心',
        url: '/page/fcenter',
        children: [
          {
            disabled: true,
            key: '1-1',
            index: 1,
            title: '向上对账',
            url: '/page/fcenter/s',
          },
          {
            disabled: true,
            key: '1-2',
            index: 2,
            title: '资金管理',
            url: '/page/fcenter/q',
          },
        ],
      },
      {
        disabled: false,
        icon: 'icon-shoppingcart',
        key: '2',
        index: 2,
        title: '质控中心',
        url: '/page/zcenter',
        children: [
          {
            disabled: false,
            key: '2-1',
            index: 1,
            title: '操作管理',
            url: '/page/zcenter/s',
          },
          {
            disabled: true,
            key: '2-2',
            index: 2,
            title: '实时监控',
            url: '/page/zcenter/q',
          },
        ],
      },
    ],
    success: true,
  },
  '/api/getRepos': {
    dataSource: [
      {
        id: 1,
        name: 'facebook/react',
        description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces',
        logo: 'https://avatars3.githubusercontent.com/u/69631',
      },
      {
        id: 2,
        name: 'vuejs/vue',
        description:
          'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web. ',
        logo: 'https://avatars1.githubusercontent.com/u/6128107',
      },
      {
        id: 3,
        name: 'angular/angular',
        description: 'One framework. Mobile & desktop. ',
        logo: 'https://avatars3.githubusercontent.com/u/139426',
      },
      {
        id: 4,
        name: 'nuxt/nuxt.js',
        description: 'The Vue.js Framework',
        logo: 'https://avatars2.githubusercontent.com/u/23360933',
      },
      {
        id: 5,
        name: 'zeit/next.js',
        description: 'The React Framework',
        logo: 'https://avatars0.githubusercontent.com/u/14985020',
      },
      {
        id: 6,
        name: 'ice-lab/ice.js',
        description: 'A universal framework based on React.js.',
        logo: 'https://avatars1.githubusercontent.com/u/1961952',
      },
    ],
  },
};
