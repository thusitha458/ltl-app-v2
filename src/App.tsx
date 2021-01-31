import React, { useState } from 'react';
import './App.css';
import { Layout, Menu, Grid, Drawer, Card, Badge, Row, Col, Tag } from 'antd';
import { MenuOutlined, UserOutlined, ContactsOutlined, SnippetsOutlined, BuildOutlined } from '@ant-design/icons';
import ltlLogo from './assets/images/logo.jpg';
import Avatar from 'antd/lib/avatar/avatar';
import ProjectCard from './ProjectCard';
import Projects from './Projects';
import Project from './Project';

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;
const { Meta } = Card;

const projects: any[] = [{"customer":{"name":"CEB Transmission Construction Project"},"items":["800 A 30 Sec Earthing Tfs - 02 Nos. & 160kVA 33kV Auxillairy Tfs- 02 Nos."],"actionPlan":[{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Design work and provide documents for customer approval","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"EE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["EE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"}},{"editableRoles":["SPE","ADMIN","EE"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":0},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Inform the customer","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"SPE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["SPE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"}},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":1},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Obtain customer approval","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"SPE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-07-09"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["SPE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-09-02"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":2},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Provide BOM and purchasing specifications","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"EE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-07-11"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["EE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-07-11"},{"editableRoles":["SPE","ADMIN","EE"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":3},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Prepare manufacturing specifications and drawings","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"EE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-07-11"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["EE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-07-11"},{"editableRoles":["SPE","ADMIN","EE"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":4},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Distribute drawings","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"QA","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-07-12"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["QA","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-07-14"},{"editableRoles":["SPE","ADMIN","QA"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":5},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Run MRP and provide material requirements","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"PE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-07-20"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["PE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-09-02"},{"editableRoles":["SPE","ADMIN","PE"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":6},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Material ordering","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"AM C&P","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-07-26"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["AM C&P","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-09-22"},{"editableRoles":["SPE","ADMIN","AM C&P"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":7},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Receiving all materials","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"AM C&P","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-08-25"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["AM C&P","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true,"value":"Completed"},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"},"value":"2020-09-22"},{"editableRoles":["SPE","ADMIN","AM C&P"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":8},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Production","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"PE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-09-05"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["PE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"}},{"editableRoles":["SPE","ADMIN","PE"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":9},{"innerFields":[{"editableRoles":[],"enum":[],"id":0,"name":"Activity","type":"String","defaultValue":"Testing","editable":false},{"editableRoles":[],"enum":[],"id":1,"name":"Responsibility","type":"String","defaultValue":"TE","editable":false},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":2,"name":"Target date","type":"Date","defaultValue":"","editable":true,"value":"2020-09-07"},{"editableRoles":["SPE","ADMIN"],"enum":[],"id":3,"name":"Target date(Rev.)","type":"Date","defaultValue":"","editable":true},{"editableRoles":["TE","ADMIN"],"enum":["Not yet started","Started","In progress","Completed"],"id":4,"name":"Status","type":"Enum","defaultValue":"","editable":true},{"editableRoles":["ADMIN"],"enum":[],"id":5,"name":"Date completed","type":"Date","defaultValue":"","editable":true,"autoSetFromEnum":{"enumId":4,"value":"Completed"}},{"editableRoles":["SPE","ADMIN","TE"],"enum":[],"id":6,"name":"Remarks","type":"String","defaultValue":"","editable":true}],"id":10}],"_id":"5f0706a5af096a22158c3dae","ct":"CT1974","__v":0}];

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();
 
  const isLargeScreen = Object.entries(screens).filter(screen => !!screen[1]).map(screen => screen[0]).includes('lg');

  return (
    <Layout style={{ height: '100vh' }}>
    <Sider
      collapsedWidth="0"
      collapsed={!isLargeScreen}
      width={240}
      trigger={null}
      style={{ backgroundColor: '#003366', color: '#038fdd' }}
    >
      <div style={{ height: 64, backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center' }}>
        {/* <div style={{ padding: 12, overflow: 'hidden' }}> */}
          <img src={ltlLogo} style={{ height: 40, width: 40, overflow: 'hidden', marginLeft: 10, borderRadius: 5 }} alt="" />
        {/* </div> */}
        <div style={{ color: '#fff', fontSize: 20, marginLeft: 10, fontWeight: 600 }}>LTL HOLDINGS</div>
      </div>
      <Menu 
        theme="dark" mode="inline" defaultSelectedKeys={['1']}
        style={{ backgroundColor: '#003366', color: '#038fdd', paddingTop: 20 }}
        className="sidebar-menu"
      >
        <Menu.Item key="1" icon={<SnippetsOutlined />} style={{ color: '#038fdd' }}>
          Projects
        </Menu.Item>
        <Menu.Item key="2" icon={<ContactsOutlined />} style={{ color: '#038fdd' }}>
          Customers
        </Menu.Item>
        <Menu.Item key="3" icon={<BuildOutlined />} style={{ color: '#038fdd' }}>
          Items
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} style={{ color: '#038fdd' }}>
          Profile
        </Menu.Item>
      </Menu>
    </Sider>
    <Drawer
      title=""
      placement="left"
      closable={false}
      visible={!isLargeScreen && isDrawerOpen}
      onClose={() => setDrawerOpen(false)}
      bodyStyle={{ padding: 0, backgroundColor: '#003366', color: '#038fdd' }}
    >
      <div style={{ height: 64, backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center' }}>
        {/* <div style={{ padding: 12, overflow: 'hidden' }}> */}
          <img src={ltlLogo} style={{ height: 40, width: 40, overflow: 'hidden', marginLeft: 10, borderRadius: 5 }} alt="" />
        {/* </div> */}
        <div style={{ color: '#fff', fontSize: 20, marginLeft: 10, fontWeight: 600 }}>LTL HOLDINGS</div>
      </div>
      <Menu 
        theme="dark" mode="inline" defaultSelectedKeys={['1']}
        style={{ backgroundColor: '#003366', color: '#038fdd', paddingTop: 20 }}
        className="sidebar-menu"
      >
        <Menu.Item key="1" icon={<SnippetsOutlined />} style={{ color: '#038fdd' }}>
          Projects
        </Menu.Item>
        <Menu.Item key="2" icon={<ContactsOutlined />} style={{ color: '#038fdd' }}>
          Customers
        </Menu.Item>
        <Menu.Item key="3" icon={<BuildOutlined />} style={{ color: '#038fdd' }}>
          Items
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} style={{ color: '#038fdd' }}>
          Profile
        </Menu.Item>
      </Menu>
    </Drawer>
    <Layout>
      <Header 
        style={{ 
          padding: 0, 
          height: 64, 
          backgroundColor: '#fff', 
          boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.08)', 
          display: 'flex', 
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {
          !isLargeScreen 
          && 
          <div 
            style={{ marginLeft: 24, cursor: 'pointer' }}
            onClick={() => {
              setDrawerOpen(!isDrawerOpen);
            }}
          >
            <MenuOutlined />
          </div>
        }
        <Avatar style={{ backgroundColor: '#038fde', marginLeft: 'auto', marginRight: 24, cursor: 'pointer' }} size={40}>
          ADMIN
        </Avatar>
      </Header>
      <Content style={{ margin: 24 }}>
        {/* <Projects projects={projects} /> */}
        <Project project={projects[0]} />
      </Content>
    </Layout>
  </Layout>
  );
}

export default App;
