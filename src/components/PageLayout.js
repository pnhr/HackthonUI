import "../style/lighttheme.css"
import menu from "./menu";
import React, { useState } from 'react';
import { Button, Layout, Menu, theme, Card, Switch, Space, Typography, Divider } from 'antd';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { createFromIconfontCN} from "@ant-design/icons";
import { USER_THEMES } from "../config";
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
import { Link } from 'react-router-dom';
import { Pages } from "../App";
const { Header, Sider, Content } = Layout;


const getMenu = () => {
    let items = [];
    items.push(getMenuItems('User', "/", <UserOutlined /> , [
        getMenuItems('Profile', "/profile", <UserOutlined /> )
    ]));
    items.push(getMenuItems('Admin', "/admin", <FormOutlined />, [
        getMenuItems('App Config', "/appconfig", <SettingOutlined />)
    ]));
    items.push(getMenuItems('Support', "/support", <PhoneOutlined />, [
        getMenuItems('Activity Logs', "/activitylogs", <ClockCircleOutlined />),
        getMenuItems('Error Logs', "/errorlogs", <ExclamationCircleOutlined />)
    ]));
    return items;
}

const getMenuItems = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const PageLayout = (props) => {
    const { IsDarkTheme, setIsDarkTheme } = props;
    const { instance } = useMsal();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, logoBackground, headerbgc, contentbgc } } = theme.useToken();

    const navigate = useNavigate();

    const handleLogin = () => {
        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/redirect'
        }).catch((error) => console.log(error));
    }
    const handleLogOutRedirect = () => {
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    }

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    return (
        <Layout>
                <Header
                    style={{
                        padding: 10,
                        background: headerbgc,
                    }}
                    className='header-content'
                >
                     <div className="logo">
                    <img src={window.location.origin + '/logo512.png'} alt="logo" />
                </div>
                <Divider className= '' type="vertical" style={{height: '20px', borderWidth: '1px', margin: '10px 10px', borderColor: '#FFFFFF'}}/>
                
                    <div className="header-login-content">
                        <Space>
                            <Switch checked={IsDarkTheme} checkedChildren={USER_THEMES.Dark}
                                unCheckedChildren={USER_THEMES.Light} onChange={(checked) => setIsDarkTheme(checked)} />
                            <AuthenticatedTemplate>
                                <Space>
                                    <p>Hello, {activeAccount ? activeAccount.name : 'Unknown'}!</p>
                                    <Button
                                        type="text"
                                        icon={<PoweroffOutlined />}
                                        onClick={handleLogOutRedirect}
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
                                <Button
                                    type="text"
                                    icon={<LoginOutlined />}
                                    onClick={handleLogin}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                        float: 'right'
                                    }}
                                />
                            </UnauthenticatedTemplate>
                        </Space>
                    </div>
                </Header>
                <Layout>
                <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            position:"absolute", zIndex:"2"
                        }}
                    />
                <Sider style={{position:"relative", zIndex:"1"}} collapsedWidth = {0} trigger={null} collapsible collapsed={collapsed} theme={IsDarkTheme ? 'dark' : 'light'}>
                <Menu
                style={{marginTop: '10vh'}}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    items={getMenu()}
                    theme={IsDarkTheme ? 'dark' : 'light'}
                />
                </Sider>
                <Content
                    style={{
                        margin: '50px 100px',
                        padding: 24,
                        minHeight: 'Calc(100vh - 10em)',
                        //background: colorBgContainer,
                        background: contentbgc
                    }}
                >
                    <Pages/>
                    <Typography>
                    <AuthenticatedTemplate>
                    {props.children}
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                    <Card type="inner" title={<span style={{ color: 'red' }}>Please Login!</span>} style={{ width: '100%' }}>
                    <p>You have not logged in yet. Please <span onClick={handleLogin} style={{ color: 'blue', cursor: 'pointer' }}>login</span> to see your ideas.</p>
                    </Card>
                    </UnauthenticatedTemplate>
                    </Typography>
                </Content>
                <footer
                style={{
                position: "fixed",
                bottom: "0",
                width: "100vw",
                backgroundColor: "#ececec",
                alignContent: "space-evenly",
                paddingLeft: "46vw",
                paddingRight: "40vw",
                paddingBottom: "1vh",
                paddingTop: "1vh",
                marginTop: "1vh",
                }}
                >
          &#169; UI Template
        </footer>
            </Layout>
            </Layout>
    )
}
