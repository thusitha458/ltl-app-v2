import React, { FC, useState } from "react";
import { Layout, Menu, Grid, Drawer, Card, Badge, Row, Col, Tag, Dropdown } from 'antd';
import { DownOutlined } from "@ant-design/icons";

export interface ActionPlanItem {
  id: number;
  innerFields: {
    id: number;
    name: string;
    type: 'String' | 'Date' | 'Enum';
    defaultValue?: string;
    editable: boolean;
    editableRoles?: string[];
    enum?: string[];
    autoSetFromEnum?: {
      enumId: number;
      value: string;
    };
    value?: string;
  }[];    
}

export interface Project {
  ct: string;
  customer: { name: string; };
  items?: string[];
  actionPlan?: ActionPlanItem[];
}

interface ProjectCardProps {
  project: Project;
}

const CardTitle: FC<{ project: Project; }> = ({ project }) => {
  let totalStatus = 0;
  let totalCompletedStatus = 0;

  (project?.actionPlan || []).forEach((field) => {
    totalStatus += 1;
    (field?.innerFields || []).forEach(innerField => {
      if (innerField.name === 'Status' && innerField.value === 'Completed') {
        totalCompletedStatus += 1;
      }
    });
  });

  const completedPercentage = totalStatus > 0 ? Math.ceil(totalCompletedStatus / totalStatus * 100) : 0;

  let statusMessage = 'COMPLETED';
  let statusColor = 'blue';

  if (completedPercentage < 100) {
    statusMessage = `ON-GOING (${completedPercentage}%)`;
  }

  if (completedPercentage < 20) {
    statusColor = 'red';
  } else if (completedPercentage < 50) {
    statusColor = 'pink';
  } else if (completedPercentage < 80) {
    statusColor = 'orange';
  } else if (completedPercentage < 100) {
    statusColor = 'green';
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
        <span style={{ fontWeight: 600 }}>
          {project.ct}{" "}
          <Dropdown trigger={['click']} overlay={
            <Menu>
              <Menu.Item key="0" onClick={() => {}}>
                Edit
              </Menu.Item>
              <Menu.Item key="1" onClick={() => {}}>
                Delete
              </Menu.Item>
            </Menu>
          }>
            <DownOutlined />
          </Dropdown>
        </span>
      <Tag color={statusColor}>{statusMessage}</Tag>
    </div>
  );
};

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const [mouseInside, setMouseInside] = useState<boolean>(false);

  const statusArray: boolean[] = [];
  (project?.actionPlan || []).sort((a, b) => a.id - b.id).forEach((field) => {
    let isCompleted = false;
    (field?.innerFields || []).forEach(innerField => {
      if (innerField.name === 'Status' && innerField.value === 'Completed') {
        isCompleted = true;
      }
    });
    statusArray.push(isCompleted);
  });

  return (
    <Card
      hoverable
      // style={{ width: 300 }}
      title={<CardTitle project={project} />}
      headStyle={{ borderBottom: 'none', paddingRight: 10 }}
      // bodyStyle={{ padding: 0 }}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
      // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      {/** CT1974
       *   CEB Transmission Construction Project 
       *   800 A 30 Sec Earthing Tfs - 02 Nos. & 160kVA 33kV Auxillairy Tfs- 02 Nos.
       * **/}
      {/* <Meta title="MAHAWA SOLAR (PVT) LTD" description="800 A 30 Sec Earthing Tfs - 02 Nos. & 160kVA 33kV Auxillairy Tfs- 02 Nos." /> */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          height: 30,
          // paddingLeft: 24,
          // paddingRight: 24,
          // textAlign: 'center',
        }}
      >{project.customer?.name}</div>
      <div
        style={{
          height: 60,
          fontSize: 14,
          color: 'rgba(0, 0, 0, 0.45)',
          overflow: 'hidden',
          // paddingLeft: 24,
          // paddingRight: 24,
          paddingBottom: 24,
        }}
      >
        {(project?.items || []).join(', ')}
      </div>
      {statusArray.length === 11 && <Row gutter={0} justify={"space-between"} style={{ opacity: mouseInside ? 0.6 : 0, marginTop: 20 }}>
        <Col span={2} style={{ backgroundColor: statusArray[0] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[1] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[2] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[3] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[4] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[5] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[6] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[7] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[8] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[9] ? 'green' : '#D3D3D3', height: 4 }} />
        <Col span={2} style={{ backgroundColor: statusArray[10] ? 'green' : '#D3D3D3', height: 4 }} />
      </Row>}
    </Card>
  );
};

export default ProjectCard;