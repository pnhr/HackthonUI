import React from 'react';
import { Button, Layout, Menu, theme, Card, Switch, Space, Typography, Divider } from 'antd';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PageLayout } from '../components/PageLayout';

const HomePage = () => (
    <Typography>
    {/* <AuthenticatedTemplate>
        {props.children}
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
        <Card type="inner" title={<span style={{ color: 'red' }}>Please Login!</span>} style={{ width: '100%' }}>
            <p>You have not logged in yet. Please <span onClick={handleLogin} style={{ color: 'blue', cursor: 'pointer' }}>login</span> to see your ideas.</p>
        </Card>
    </UnauthenticatedTemplate> */}
    This is landing page
</Typography>
);
export default HomePage;