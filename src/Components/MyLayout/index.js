import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import {paths} from '../../Menu';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import smallLogo from '../../assets/4.png';
import defaultLogo from '../../assets/4rticles.png';

const {Sider, Header, Content} = Layout;

const MyLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState(['1']);

  useEffect(() => {
    const menuPosition = getMenuPosition(window.location.pathname);
    if (menuPosition) {
      setSelectedMenuKey([menuPosition.position]);
    } else {
      setSelectedMenuKey([]);
    }
  }, [selectedMenuKey]);

  const getMenuPosition = (pathname) => {
    return paths.find((path) => path.path === pathname);
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme='light'
      >
        <div className='logo'>
          <img src={collapsed ? smallLogo : defaultLogo} alt='logo' />
        </div>
        <Menu
          mode='inline'
          items={paths.map((item) => {
            return (
              item.menu && {
                key: item.position,
                icon: React.createElement(item.icon),
                label: (
                  <Link to={item.path} pre>
                    {item.label}
                  </Link>
                ),
              }
            );
          })}
          selectedKeys={selectedMenuKey}
          onClick={(e) => {
            const menuPosition = getMenuPosition(window.location.pathname);
            setSelectedMenuKey([menuPosition.position]);
          }}
        />
      </Sider>
      <Layout
        className='site-layout'
        style={{marginLeft: collapsed ? 80 : 200}}
      >
        <Header className='site-layout-background' style={{padding: '0 24px'}}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
