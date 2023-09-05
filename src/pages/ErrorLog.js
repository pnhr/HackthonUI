import React from 'react';
import { Button, Layout, Menu, theme, Card, Switch, Space, Typography, Divider, Table } from 'antd';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PageLayout } from '../components/PageLayout';
import { MsalProvider } from "@azure/msal-react";
import ActivityDialogBox from '../components/DialogBoxActivityLog';
import { useState } from 'react';
import "../style/header.css";
  
const ErrorLog = () => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const columns = [
        {
          title: 'Employee Id',
          //width: 100,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Error Type',
          //width: 100,
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Error Description',
          dataIndex: 'address',
          key: '1',
        },
        {
          title: 'Action',
          key: 'operation',
          //width: 100,
          render: () => <button onClick={()=>setOpen(true)}>details</button>,
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 40,
          address: 'London Park',
        },
      ];
    return (<>
    <div className='Title'> Error Log</div>
    <div className='table-container'>
    <Table
    columns={columns}
    dataSource={data}
  /> 
    </div>
  <ActivityDialogBox open={open} handleClose={handleClose}/>
  </>)
};
export default ErrorLog;