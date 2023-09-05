import React from 'react';
import { Button, Layout, Menu, theme, Card, Switch, Space, Typography, Divider, Table } from 'antd';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PageLayout } from '../components/PageLayout';
import { MsalProvider } from "@azure/msal-react";
import ActivityDialogBox from '../components/DialogBoxActivityLog';
import { useState } from 'react';
import "../style/header.css"

// const columns = [
//     {
//       title: 'ID',
//       width: 100,
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//         title: 'EmployeeID',
//         width: 100,
//         dataIndex: 'empid',
//         key: 'empid',
//     },
//     {
//         title: 'Acivity Type',
//         width: 100,
//         dataIndex: 'acttype',
//         key: 'empid',
//     },
//     {
//     title: 'Activity Description',
//     width: 100,
//     dataIndex: 'actdesc',
//     key: 'actdesc',
//     },
//     {
//     title: 'Activity TimeStamp',
//     width: 100,
//     dataIndex: 'actts',
//     key: 'actts',
//     },
//     {
//       title: 'Detail',
//       key: 'detail',
//       width: 100,
//       render: () => <a>action</a>,
//     },
//   ];



  
const ActivityLog = () => {
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
          title: 'Activity Type',
          //width: 100,
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Activity Description',
          dataIndex: 'address',
          key: '1',
        },
        // {
        //   title: 'Column 2',
        //   dataIndex: 'address',
        //   key: '2',
        // },
        // {
        //   title: 'Column 3',
        //   dataIndex: 'address',
        //   key: '3',
        // },
        // {
        //   title: 'Column 4',
        //   dataIndex: 'address',
        //   key: '4',
        // },
        // {
        //   title: 'Column 5',
        //   dataIndex: 'address',
        //   key: '5',
        // },
        // {
        //   title: 'Column 6',
        //   dataIndex: 'address',
        //   key: '6',
        // },
        // {
        //   title: 'Column 7',
        //   dataIndex: 'address',
        //   key: '7',
        // },
        // {
        //   title: 'Column 8',
        //   dataIndex: 'address',
        //   key: '8',
        // },
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
    <div className='Title'> Acivity Log</div>
    <div className='table-container'>
    <Table
    columns={columns}
    dataSource={data}
  /> 
    </div>
  <ActivityDialogBox open={open} handleClose={handleClose}/>
  </>)
};
export default ActivityLog;