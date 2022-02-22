import { useEffect } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { Col, Dropdown, Row, Select, Avatar, Tabs } from 'antd';
import store from '@/store';

const { Option } = Select;
const { TabPane } = Tabs;

export default function BasicLayout(props) {
  const [layoutState, layoutDispatchers] = store.useModel('layout');
  const [tabState, tabDispatchers] = store.useModel('tab');
  useEffect(() => {
    layoutDispatchers.getMenu();
  }, [layoutDispatchers]);

  const onChange = (e) => {
    const menu: any[] = layoutState.leafMenu;
    const changed = menu.find((v) => v.key === e);
    tabDispatchers.addTab(changed);
  };
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
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {layoutState.leafMenu.map((v: any) => {
                return (
                  <Option key={v.key} value={v.key}>
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
          activeKey={tabState.tabs[tabState.currentTab].key}
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
      <div className="pixiu-admin-body">{tabState.tabs[tabState.currentTab].url}</div>
    </div>
  );
}