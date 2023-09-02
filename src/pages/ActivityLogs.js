import React, { useEffect, useState } from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { protectedResources } from "../authConfig";
import { BASE_URI, API_URI } from '../config';
import { List } from 'antd';

export const ActivityLogs = () => {

    const [Data, setData] = useState([]);

    const { isLoading, error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiTodoList.scopes.read,
    });

    useEffect(() => {
        let isCancelled = false;
        let endpoint = BASE_URI + API_URI.ActivityLogs;

        execute("GET", endpoint).then((response) => {
            setData(response?.payload);
            console.log("Data : ", response?.payload)
        });
    
      return () => {
          isCancelled = true;
      }
    }, [execute])
    
    const getListItems = (item, index) => {
        return <List.Item>
            <List.Item.Meta
                title={<a href="https://ant.design">{item.activityType}</a>}
                description={`Employee : ${item.employeeName}; activity Description : ${item.activityDesc}`}
            />
        </List.Item>
    }

    return (
        <div>
            <List pagination={
                {
                    position: "bottom",
                    align: "end"
                }
            }
                dataSource={Data} 
                renderItem={(item, index) => getListItems(item, index)}
                />

            
        </div>
    )
}
