import React, { useEffect, useState } from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { protectedResources } from "../authConfig";
import { Avatar, List, Spin, Breadcrumb } from 'antd';
import { LineChartOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import { API_URI, BASE_URI, QUERY_STRINGS } from '../config';

const getAvatarIcon = (status) => {
    let defaultIcon = <LineChartOutlined style={{ color: '#FFFFFF' }} />;
    if (status % 2 === 0) {
        defaultIcon = <FallOutlined style={{ back: '#FFFFFF' }} />
    }
    else {
        defaultIcon = <RiseOutlined style={{ color: '#FFFFFF' }} />
    }
    return defaultIcon
}

const getAvatarBackground = (status) => {
    let defaultIcon = { backgroundColor: 'blue' };
    if (status % 2 === 0) {
        defaultIcon = { backgroundColor: 'blue' };
    }
    else {
        defaultIcon = { backgroundColor: 'red' };
    }
    return defaultIcon
}

const breadcrumbNameMap = {
    '/errorlogs': 'Error Logs',
    '/activitylogs': 'Activity Logs',
    '/details/*': 'User Details',
    '/': 'User List'
};

export const UserList = () => {

    const [Ideas, setIdeas] = useState([]);

    const { isLoading, error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiTodoList.scopes.read,
    });

    useEffect(() => {
        let isCancelled = false;
        let endpoint = BASE_URI + API_URI.Employee;

        execute("GET", endpoint).then((response) => {
            setIdeas(response?.payload);
            console.log("User List Page execute method");
        });

        return () => {
            isCancelled = true;
        }
    }, [execute]);

    return (
        <>
            {!isLoading && Ideas && Ideas.length > 0 &&
                <List
                    pagination={{ position: 'bottom', align: 'end', pageSize: 5 }}
                    dataSource={Ideas}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar shape="square" style={getAvatarBackground(item.userId)} icon={getAvatarIcon(item.userId)} />
                                }
                                title={<a href={`/details?${QUERY_STRINGS.userId}=${item.userId}`}>{item.firstName} {item.lastName}</a>}
                                description={item.email}
                            />
                        </List.Item>
                    )}
                />
            }
            {isLoading &&
                <Spin tip="Loading" size="default">
                    <div className="content" />
                </Spin>
                }
        </>
    )
}
