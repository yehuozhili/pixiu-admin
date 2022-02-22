import { IconFont } from '@/icon';
import { APIS } from '@/services/apis';
import { request } from '@/services/request';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const defaultMenu = (
  <Menu>
    <Menu.Item key={1}>sssss</Menu.Item>
    <Menu.Item key={2}>sdfsas</Menu.Item>
    <Menu.Item key={3}>sdasda</Menu.Item>
    <SubMenu key={4} title="sub menu">
      <Menu.Item key={5}>3rd menu item</Menu.Item>
      <Menu.Item key={6}>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu key={5} title="disabled sub menu" disabled>
      <Menu.Item key={7}>5d menu item</Menu.Item>
      <Menu.Item key={8}>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

export default {
  state: {
    menu: [],
    menuDom: defaultMenu,
    leafMenu: [],
  },
  reducers: {
    updateMenu(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getMenu() {
      const res = await request(APIS.getMenu, 'post');
      if (res.success) {
        const loopMenuItem = (menus, leaf) =>
          menus
            .sort((a, b) => a.index - b.index)
            .map(({ icon, children, key, title, disabled, url }) => {
              if (children) {
                const t = icon ? (
                  <span>
                    <IconFont type={icon} /> {title}
                  </span>
                ) : (
                  <span> {title} </span>
                );
                return (
                  <SubMenu key={key} disabled={disabled} title={t}>
                    {loopMenuItem(children, leaf)}
                  </SubMenu>
                );
              } else {
                leaf.push({ icon, children, key, title, disabled, url });
                return (
                  <Menu.Item
                    key={key}
                    disabled={disabled}
                    onClick={() => {
                      dispatch.tab.addTab({ icon, children, key, title, disabled, url });
                    }}
                  >
                    {icon && <IconFont type={icon} />} {title}
                  </Menu.Item>
                );
              }
            });
        const leaf = [];
        const m = loopMenuItem(res.data, leaf);
        dispatch.layout.updateMenu({
          menu: res.data,
          menuDom: <Menu>{m}</Menu>,
          leafMenu: leaf,
        });
        return res.data;
      } else {
        return [];
      }
    },
  }),
};
