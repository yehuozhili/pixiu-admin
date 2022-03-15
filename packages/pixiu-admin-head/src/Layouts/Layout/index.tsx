import { useEffect, useRef } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { Col, Dropdown, Row, Select, Avatar, Tabs } from 'antd';
import store from '@/store';
import { useLocation } from 'ice';

const { Option } = Select;
const { TabPane } = Tabs;
const MESSEAGE_ADD_TAB = 'MESSEAGE_ADD_TAB';
const MESSEAGE_HREF = 'MESSEAGE_HREF';

export default function BasicLayout(props) {
  const [layoutState, layoutDispatchers] = store.useModel('layout');
  const [tabState, tabDispatchers] = store.useModel('tab');

  useEffect(() => {
    layoutDispatchers.getMenu();
  }, [layoutDispatchers]);

  useEffect(() => {
    const fn = (e) => {
      const { data } = e;
      try {
        const msg = JSON.parse(data);
        const { url } = msg.data;
        const { type } = msg;
        switch (type) {
          case MESSEAGE_ADD_TAB:
            // eslint-disable-next-line no-case-declarations
            const menu: any[] = layoutState.leafMenu;
            // eslint-disable-next-line no-case-declarations
            const a = document.createElement('a');
            a.href = url;
            // eslint-disable-next-line no-case-declarations
            const { pathname } = a;
            // eslint-disable-next-line no-case-declarations
            const changed = menu.find((v) => v.url === pathname);
            if (changed) {
              tabDispatchers.addTab(changed);
            } else {
              const item = { title: '未知', url, key: Date.now() };
              tabDispatchers.addTab(item);
            }
            break;
          case MESSEAGE_HREF:
            window.location.href = url;
            break;
          default:
            break;
        }
        // eslint-disable-next-line no-empty
      } catch (s) {
        // console.error(s);
      }
    };
    window.addEventListener('message', fn);
    return () => {
      window.removeEventListener('message', fn);
    };
  }, [layoutState.leafMenu, tabDispatchers]);

  const onChange = (e) => {
    const menu: any[] = layoutState.leafMenu;
    const changed = menu.find((v) => v.key === e);
    tabDispatchers.addTab(changed);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      tabDispatchers.storeContainer(ref.current);
      tabDispatchers.resolveDom();
    }
  }, [tabDispatchers]);

  const location = useLocation();

  return (
    <div>
      <div className={styles.pixiuAdminHead}>
        <Row style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Col style={{ height: '100%' }}>
            <Dropdown overlay={layoutState.menuDom}>
              <div className={styles.iconMenu} style={{ height: '100%' }}>
                <UnorderedListOutlined
                  style={{ fontSize: 16, display: 'flex', alignItems: 'center', height: '100%' }}
                />
              </div>
            </Dropdown>
          </Col>
          <Col
            className={styles.pixiuLogo}
            onClick={() => {
              window.open('https://github.com/yehuozhili');
            }}
          >
            PIXIU-ADMIN
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Select
              className="pixiu-head-search"
              style={{ width: 200 }}
              showSearch
              placeholder="搜索"
              allowClear
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {layoutState.leafMenu.map((v: any) => {
                return (
                  <Option key={v.key} value={v.key} disabled={v.disabled}>
                    {v.title}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col style={{ flex: 1, textAlign: 'right' }}>
            <Avatar>User</Avatar>
          </Col>
        </Row>
      </div>
      <div className={styles.pixiuAdminTab}>
        <Tabs
          defaultActiveKey="首页"
          type="editable-card"
          hideAdd
          className="pixiu-admin-head-tab"
          activeKey={tabState.tabs[tabState.currentTab]?.key}
          onChange={(e) => {
            tabDispatchers.changeCurrent(e);
          }}
          onEdit={(e) => {
            tabDispatchers.deleteTab(e);
          }}
        >
          {tabState.tabs.map((v) => {
            return <TabPane tab={v.title} key={v.key} closable={v.closeable} />;
          })}
        </Tabs>
      </div>
      <div className="pixiu-admin-body" style={{ height: 'calc(100vh - 60px - 41px)' }}>
        {location.pathname === '/' ? (
          <div
            className="pixiu-admin-body-container"
            style={{ height: '100%', width: '100%', position: 'relative' }}
            ref={ref}
          />
        ) : (
          props.children
        )}
      </div>
    </div>
  );
}
