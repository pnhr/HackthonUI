import { ConfigProvider, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
const { Search } = Input;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "AppConfig Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "AppConfig Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Update Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Update User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => (
      <>
        <a>Edit &nbsp;</a>
        <a>Delete</a>
      </>
    ),
  },
];

const data = [
  {
    key: 1,
    id: 1,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
  {
    key: 2,
    id: 2,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
  {
    key: 3,
    id: 3,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
  {
    key: 4,
    id: 4,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
  {
    key: 5,
    id: 5,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
  {
    key: 6,
    id: 6,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
  {
    key: 7,
    id: 7,
    name: "TeamMailID",
    value: "skillCentralPortalTeam@StateStreet.com",
    desc: "Email Id for development team",
    date: "07/05/2001",
    user: "Jha, Ayush",
  },
];

function AppConfig() {
  return (
    <ConfigProvider>
      <div style={{display:"inline-flex", width:"100%"}}>
        <h2>App Config</h2>
        <Search
          placeholder="input search text"
          allowClear
          style={{ width: "15vw", marginTop: "2vh", marginLeft: "54vw",float: "right"}}
        />
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 1,
              }}
            >
              Value: {record.value}
              &nbsp; Description: {record.desc}
            </p>
          ),
          rowExpandable: (record) =>
            record.desc.length || record.value.length > 30,
        }}
        dataSource={data}
      />
    </ConfigProvider>
  );
}

export default AppConfig;
