import "../style/lighttheme.css"

import React, { useEffect, useState, memo } from 'react';
import { Button, Layout, Menu, theme, Card, Switch, Space, Typography } from 'antd';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, IPublicClientApplication } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { protectedResources } from "../authConfig";
import { USER_THEMES, BASE_URI , PAGE_PATHS, API_URI } from "../config";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FormOutlined,
    PhoneOutlined,
    UserOutlined,
    LoginOutlined,
    PoweroffOutlined,
    SettingOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Footer, Content } = Layout;



const getMenuItems = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const handleLogin = (instance) => {
    instance.loginPopup({
        ...loginRequest,
        redirectUri: '/redirect'
    }).catch((error) => console.log(error));
}
const handleLogOutRedirect = (instance) => {
    instance.logoutRedirect({
        account: instance.getActiveAccount(),
    });
}

const getMenu = (response) => {
    let items = [];
    if (!!response) {
        let data = Array.from(response?.payload);
        if (!!data && data.length > 0) {
            data.forEach((group, idx) => {
                let mItem = Array.from(group.menuItems);
                let sumMenuItems = [];
                if (!!mItem && mItem.length > 0) {
                    sumMenuItems = mItem.map((itm, idx) => {
                        return getMenuItems(itm.menuItem, itm.menuItem.toLowerCase());
                    });
                }
                items.push(getMenuItems(group.appMenuGroupName, group.appMenuGroupName.toLowerCase(), null, sumMenuItems));
            });
        }
    }
    return items;
}

export const PageLayout = (props) => {
    
    const { IsDarkTheme, setIsDarkTheme } = props;

    const [AppMenu, setAppMenu] = useState([]);

    const { instance } = useMsal();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, colorBgLayout, colorBgHeader, headerTextColor } } = theme.useToken();

    const navigate = useNavigate();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const { isLoading, error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiTodoList.scopes.read,
    });

    

    useEffect(() => {
        let isCancelled = false;
        let endpoint = BASE_URI + API_URI.AppMenu;
        execute("GET", endpoint).then(response => {
            let menuArr = getMenu(response);
            setAppMenu(menuArr);
        });
        
      return () => {
          isCancelled = true;
      }
    }, [execute, getMenu])
    

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} theme={IsDarkTheme ? 'dark' : 'light'}>
                <div className="logo">
                    <img src={window.location.origin + '/logo512.png'} alt="logo" />
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    items={AppMenu}
                    theme={IsDarkTheme ? 'dark' : 'light'}
                />
            </Sider>
            <Layout>
                <Typography>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgHeader
                        }}
                        className='header-content'
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: headerTextColor
                            }}
                        />

                        <div className="header-login-content">
                            <Space>
                                <Switch size="small" checked={IsDarkTheme} checkedChildren={USER_THEMES.Dark}
                                    unCheckedChildren={USER_THEMES.Light} onChange={(checked) => setIsDarkTheme(checked)} />
                                <Space>
                                    <AuthenticatedTemplate>
                                        <Space>
                                            <p style={{ color: headerTextColor }}>Hello, {activeAccount ? activeAccount.name : 'Unknown'}!</p>
                                            <Button
                                                type="text"
                                                icon={<PoweroffOutlined />}
                                                onClick={() => handleLogOutRedirect(instance)}
                                                style={{
                                                    fontSize: '16px',
                                                    width: 64,
                                                    height: 64,
                                                    color: 'red'
                                                }}
                                            />
                                        </Space>
                                    </AuthenticatedTemplate>
                                    <UnauthenticatedTemplate>
                                        <Space>
                                            {/* below tag is required for alignment issues in the header */}
                                            <p></p>
                                            <Button
                                                type="text"
                                                icon={<LoginOutlined />}
                                                onClick={() => handleLogin(instance)}
                                                style={{
                                                    fontSize: '16px',
                                                    width: 64,
                                                    height: 64,
                                                    float: 'right'
                                                }}
                                            />
                                        </Space>
                                    </UnauthenticatedTemplate>
                                </Space>
                            </Space>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 'Calc(100vh - 10em)',
                        }}
                    >
                        <AuthenticatedTemplate>
                            {props.children}
                        </AuthenticatedTemplate>
                        <UnauthenticatedTemplate>
                            <Card type="inner" title={<span style={{ color: 'red' }}>Please Login!</span>} style={{ width: '100%' }}>
                                <p>You have not logged in yet. Please <span onClick={() => handleLogin(instance)} style={{ color: 'blue', cursor: 'pointer' }}>login</span> to see your ideas.</p>
                            </Card>
                        </UnauthenticatedTemplate>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>&copy; Developed by Padmasekhar!</Footer>
                </Typography>

            </Layout>
        </Layout>
    )
}