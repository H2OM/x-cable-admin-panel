import {useState} from 'react';
import {Layout, Menu, Avatar, Dropdown, Space, Button} from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    DashboardOutlined,
    ShoppingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {Link, Outlet, useLocation} from 'react-router-dom';
import useAuth from "@hooks/useAuth.tsx";

const {Header, Sider, Content, Footer} = Layout;

export default function MainLayout() {
    const {user, logout} = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const profileMenu = {
        items: [
            {
                key: 'email',
                label: <span style={{color: '#8c8c8c'}}>{user?.email}</span>,
                disabled: true,
            },
            {
                key: 'logout',
                label: 'Выйти',
                icon: <LogoutOutlined/>,
                danger: true,
                onClick: logout,
            },
        ],
    };

    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined/>,
            label: <Link to="/dashboard">Главная панель</Link>,
        },
        {
            key: '/products',
            icon: <ShoppingOutlined/>,
            label: <Link to="/products">Товары</Link>,
        },
    ];

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light"
                   style={{boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)'}}>
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    padding: '0 24px',
                    borderBottom: '1px solid #f0f0f0',
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'var(--main-color)',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}>
                    {collapsed ? 'X_C' : 'X_CABLE.PANEL'}
                </div>

                <Menu theme="light"
                      mode="inline"
                      selectedKeys={[location.pathname]}
                      items={menuItems}
                      style={{borderRight: 0, marginTop: 16}}
                />
            </Sider>

            <Layout>
                <Header style={{
                    padding: '0 24px',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--base-shadow)',
                    zIndex: 1
                }}>
                    <Button type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{fontSize: '16px', width: 64, height: 64}}
                    />
                    <Dropdown menu={profileMenu} placement="bottomRight" trigger={['click']}>
                        <Space style={{cursor: 'pointer', padding: '0 8px'}}>
                            <Avatar icon={<UserOutlined/>} style={{backgroundColor: 'var(--main-color)'}}/>
                            <span style={{fontWeight: 500}}>{user?.name}</span>
                        </Space>
                    </Dropdown>
                </Header>

                <Content
                    style={{margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, minHeight: 280}}>
                    <Outlet/>
                </Content>

                <Footer style={{
                    textAlign: 'center',
                    background: '#fff',
                    boxShadow: 'var(--base-shadow)',
                    padding: '16px 50px'
                }}>
                    X_Cable Админ Панель ©{new Date().getFullYear()} Разработана для дипломной работы
                </Footer>
            </Layout>
        </Layout>
    );
}
