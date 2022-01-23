import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  GlobalOutlined,
  BulbOutlined,
  DollarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../libs/contexts/auth';

const { Header, Content, Footer, Sider } = Layout;

const menus = [
  { to: '/', icon: <GlobalOutlined />, text: 'Home' },
  { to: '/users', icon: <BulbOutlined />, text: 'Users' },
  { to: '/billing', icon: <DollarOutlined />, text: 'Billing' },
  {
    to: '/settings',
    icon: <SettingOutlined />,
    text: 'Settings',
    menus: [
      { to: '/settings/profile', text: 'Profile' },
      { to: '/settings/password', text: 'Change Password' },
    ],
  },
];

const LayoutDashboard = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={['/']}
          mode="inline"
          selectedKeys={location.pathname}
        >
          {menus.map((menu) => {
            const hasSubmenu =
              menu.hasOwnProperty('menus') && menu?.menus?.length > 0;

            if (hasSubmenu) {
              return (
                <Menu.SubMenu key={menu.to} icon={menu.icon} title={menu.text}>
                  {menu.menus.map((submenu) => (
                    <Menu.Item key={submenu.to}>
                      <Link to={submenu.to}>{submenu.text}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }

            return (
              <Menu.Item key={menu.to} icon={menu.icon}>
                <Link to={menu.to}>{menu.text}</Link>
              </Menu.Item>
            );
          })}
          <Menu.Item
            key="/logout"
            danger
            icon={<LogoutOutlined />}
            onClick={() => logout()}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vincere Digital ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
