import React from 'react';
import { Card, Space, Table, Divider } from 'antd';
import '../style/App.css'

const { Meta } = Card;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    // sorter: {
    //   compare: (a, b) => a.chinese - b.chinese,
    //   multiple: 3,
    // },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    // sorter: {
    //   compare: (a, b) => a.math - b.math,
    //   multiple: 2,
    // },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    // sorter: {
    //   compare: (a, b) => a.english - b.english,
    //   multiple: 1,
    // },
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Profile = () => (
<>
  <div className='Title'>Employee Details</div>
    <Card
      style={{
        width: '100%',
        height: '30vh',
        marginBottom: '10vh'
      }}
    >
      <div style={{display: 'flex'}}>
      <div>
      <Card
      hoverable
      style={{
      width: 100,
      height: 50
      }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
    <Meta/>
    </Card>
    </div>
    <div className='ProfileDetailContainer' style={{marginLeft: '5vh'}}>
      <div className='ProfileDetailContainerChild'>
        <div style={{marginBottom: '2vh'}}>
        <div className='ProfileTitleLabelName'>Field 1</div>
        <div className='ProfileTitleLabelValue'>Value 1</div>
      </div>
      </div>

      <div style={{marginBottom: '2vh'}}>
        <div className='ProfileTitleLabelName'>Field 1</div>
        <div className='ProfileTitleLabelValue'>Value 1</div>
      </div>

      <div style={{marginBottom: '2vh'}}>
        <div className='ProfileTitleLabelName'>Field 1</div>
        <div className='ProfileTitleLabelValue'>Value 1</div>
      </div>
    </div>
    <Divider type="vertical" style={{height: '20vh', borderWidth: '1px', marginTop: '10px', marginLeft: '49px', borderColor: '#FFFFFF'}}/>
    <div className='ProfileDetailContainer' style={{marginLeft: '5vh'}}>
      <div className='ProfileDetailContainerChild'>
        <div style={{marginBottom: '2vh'}}>
        <div className='ProfileTitleLabelName'>Field 1</div>
        <div className='ProfileTitleLabelValue'>Value 1</div>
      </div>
      </div>

      <div style={{marginBottom: '2vh'}}>
        <div className='ProfileTitleLabelName'>Field 1</div>
        <div className='ProfileTitleLabelValue'>Value 1</div>
      </div>

      <div style={{marginBottom: '2vh'}}>
        <div className='ProfileTitleLabelName'>Field 1</div>
        <div className='ProfileTitleLabelValue'>Value 1</div>
      </div>
    </div>
    <div>
    </div>
    </div>
    </Card>
    <div className='Title'>Summary</div>
    <Card
      style={{
        width: '100%',
        height: '30vh',
        marginBottom: '10vh'
      }}
    >
      <p>Card content</p>
    </Card>
    <div className='Title'>Skills</div>
    <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} style={{marginBottom: '10vh'}} /> </>
);
export default Profile;