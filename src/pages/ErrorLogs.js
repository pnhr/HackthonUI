import React, { useEffect, useState } from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { protectedResources } from "../authConfig";
import { BASE_URI, API_URI } from '../config';
import { Drawer, List } from 'antd';

import { FullscreenOutlined } from '@ant-design/icons';


export const ErrorLogs = () => {
  const [Data, setData] = useState([]);
  const [DrawerData, setDrawerData] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isLoading, error, execute } = useFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const showDrawer = (item) => {
    setOpenDrawer(true);
    console.log("item : ", item);
    setDrawerData(item);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    let isCancelled = false;
    let endpoint = BASE_URI + API_URI.ErrorLogs;
    execute("GET", endpoint).then((response) => {
      setData(response?.payload);
    });

    return () => {
      isCancelled = true;
    }
  }, [execute])
  

  const getListItems = (item, index) => {
    return <List.Item key={item.errorId} actions={[
      <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
        <FullscreenOutlined />
      </a>,
    ]}>
      <List.Item.Meta
        title={<a href="https://ant.design">{item.errorType}</a>}
        description={`Employee : ${item.employeeName}; Error Message : ${item.errorMessage}`}
      />
    </List.Item>
  }

  return (
    <>
      <List pagination={
        {
          position: "bottom",
          align: "end"
        }
      }
        dataSource={Data}
        renderItem={(item, index) => getListItems(item, index)}
      />
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openDrawer}>
        <p>{DrawerData?.stackTrace}</p>
      </Drawer>
    </>
  )
}
