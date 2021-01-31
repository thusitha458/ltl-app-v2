import { CheckCircleTwoTone } from "@ant-design/icons";
import { Avatar, Grid, Breadcrumb, Button, Col, Descriptions, PageHeader, Row, Tag, Typography, List, Skeleton, Collapse } from "antd";
import React, { FC, useState } from "react";
import { Project as ProjectType, ActionPlanItem as ActionPlanItemType } from "./ProjectCard";
import UpdateActionPlanItemModal from "./UpdateActionPlanItemModal";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CollapsedActionPlanItem: FC<{ item: ActionPlanItemType, selected: boolean }> = ({ item, selected }) => {
  const sortedInnerFields = (item?.innerFields || []).sort((a, b) => a.id - b.id);

  const title = sortedInnerFields.find(innerField => innerField.name === 'Activity')?.defaultValue || 'Activity';
  const status = sortedInnerFields.find(innerField => innerField.name === 'Status')?.value || 'Not yet started';
  const responsibility = sortedInnerFields.find(innerField => innerField.name === 'Responsibility')?.defaultValue || [];
  const targetDate = sortedInnerFields.find(innerField => innerField.name === 'Target date')?.value || '';
  const targetDateRevised = sortedInnerFields.find(innerField => innerField.name === 'Target date(Rev.)')?.value || '';
  const completedDate = sortedInnerFields.find(innerField => innerField.name === 'Date completed')?.value || '';

  let statusColor = 'green';
  if (status === 'Not yet started') {
    statusColor = 'red';
  } else if (status === 'Started') {
    statusColor = 'pink';
  } else if (status === 'In progress') {
    statusColor = 'orange';
  } else if (status === 'Completed') {
    statusColor = 'green';
  }

  let completedOnTime = false;
  if ((targetDate || targetDateRevised) && completedDate) {
    const target = new Date(targetDateRevised ? targetDateRevised : targetDate);
    const completed = new Date(completedDate);

    completedOnTime = completed.getTime() <= target.getTime();
  }

  return (
    <Row align="middle">
      <Col span={8}>{title}</Col>
      <Col span={3} style={selected ? { visibility : 'hidden' } : undefined}><Text keyboard>{responsibility}</Text></Col>
      <Col span={5} style={selected ? { visibility : 'hidden' } : undefined}><Tag color={statusColor} style={{ textTransform: 'uppercase', cursor: 'pointer', transition: selected ? 'none' : undefined }}>{status}</Tag></Col>
      <Col span={4} style={selected ? { visibility : 'hidden' } : undefined}>
        <div style={!targetDate && !targetDateRevised ? { display: 'none' } : undefined}><Text underline>Target</Text></div>
        <div>{targetDateRevised ? targetDateRevised : (targetDate || '-')}</div>
      </Col>
      <Col span={4} style={selected ? { visibility : 'hidden' } : undefined}>
        <div style={!completedDate ? { display: 'none' } : undefined}><Text underline>Completed</Text></div>
        <div>{completedDate || '-'}{completedOnTime ? ' ' : ''}{completedOnTime ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : ''}</div>
      </Col>
    </Row>
  );
};

const ActionPlanItem: FC<{ item: ActionPlanItemType; bottomBorder?: boolean; onUpdate: () => any; }> = ({ item, bottomBorder, onUpdate }) => {
  const breakpoints = useBreakpoint();

  const sortedInnerFields = (item?.innerFields || []).sort((a, b) => a.id - b.id);

  const title = sortedInnerFields.find(innerField => innerField.name === 'Activity')?.defaultValue || 'Activity';
  const status = sortedInnerFields.find(innerField => innerField.name === 'Status')?.value || 'Not yet started';
  const responsibility = sortedInnerFields.find(innerField => innerField.name === 'Responsibility')?.defaultValue || [];
  const targetDate = sortedInnerFields.find(innerField => innerField.name === 'Target date')?.value || '';
  const targetDateRevised = sortedInnerFields.find(innerField => innerField.name === 'Target date(Rev.)')?.value || '';
  const completedDate = sortedInnerFields.find(innerField => innerField.name === 'Date completed')?.value || '';
  const remarks = sortedInnerFields.find(innerField => innerField.name === 'Remarks')?.value || '';

  let statusColor = 'green';
  if (status === 'Not yet started') {
    statusColor = 'red';
  } else if (status === 'Started') {
    statusColor = 'pink';
  } else if (status === 'In progress') {
    statusColor = 'orange';
  } else if (status === 'Completed') {
    statusColor = 'green';
  }

  let completedOnTime = false;
  if ((targetDate || targetDateRevised) && completedDate) {
    const target = new Date(targetDateRevised ? targetDateRevised : targetDate);
    const completed = new Date(completedDate);

    completedOnTime = completed.getTime() <= target.getTime();
  }

  return (
    <div 
      style={{ 
        padding: 24, 
        backgroundColor: '#fff', 
        width: '100%',
        borderBottom: bottomBorder ? '1px solid #d4d4d4' : undefined,
      }}
    >
      <div 
        style={{ 
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: breakpoints.lg ? 'row' : 'column',
        }}
      >
        <Title level={5}>{title}</Title>
        <Tag color={statusColor} style={breakpoints.lg ? { marginLeft: 10, textTransform: 'uppercase' } : { textTransform: 'uppercase' }}>{status}</Tag>
      </div>
      {breakpoints.lg && <Row style={{ marginTop: 24 }}>
        <Col flex="150px">
          <div>Responsibility:</div>
          <div>Target Date:</div>
          <div>Target Date (Rev.):</div>
          <div>Completed Date:</div>
          <div>Remarks:</div>
        </Col>
        <Col flex="auto">
          <div><Text keyboard>{responsibility || ''}</Text></div>
          <div>{targetDate || '-'}</div>
          <div>{targetDateRevised || '-'}</div>
          <div>{completedDate || '-'}{completedOnTime ? ' ' : ''}{completedOnTime ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : ''}</div>
          <div>{remarks || '-'}</div>
        </Col>
      </Row>}
      {!breakpoints.lg && <div style={{ marginTop: 24, width: '100%' }}>
        <div style={{ paddingBottom: 10 }}>
          <div><Text strong underline>Responsibility</Text></div>
          <div>{responsibility || ''}</div>
        </div>
        <div style={{ paddingBottom: 10 }}>
          <div><Text strong underline>Target Date</Text></div>
          <div>{targetDate || '-'}</div>
        </div>
        <div style={{ paddingBottom: 10 }}>
          <div><Text strong underline>Target Date (Rev.)</Text></div>
          <div>{targetDateRevised || '-'}</div>
        </div>
        <div style={{ paddingBottom: 10 }}>
          <div><Text strong underline>Completed Date</Text></div>
          <div>{completedDate || '-'}{completedOnTime ? ' ' : ''}{completedOnTime ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : ''}</div>
        </div>
        <div>
          <div><Text strong underline>Remarks</Text></div>
          <div>{remarks || '-'}</div>
        </div>
      </div>}
      <div style={{ marginTop: 24 }}>
        <Button onClick={onUpdate}>Update</Button>
      </div>
    </div>
  );
}

const Project: FC<{ project: ProjectType }> = ({ project }) => {
  const breakpoints = useBreakpoint();
  const [selectedCollapsedItems, setSelectedCollapsedItems] = useState<string[]>([]);

  // const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const [updatingPlanItem, setUpdatingPlanItem] = useState<ActionPlanItemType | null>(null);

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
    <>
    <div
      style={{
        paddingBottom: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Projects</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{project.ct}</Breadcrumb.Item>
      </Breadcrumb>
      <Button>Export PDF</Button>
    </div>
    <Row
      style={{
        backgroundColor: '#fff',
        padding: 24,
        boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
        border: '1px solid #d4d4d4',
        borderRadius: 2,
      }}
    >
      <Col 
        span={24} 
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: 10,
        }}
      >
        <Title level={3} style={{ marginBottom: 0 }}>{project.ct}</Title>
        <Tag color={statusColor} style={{ marginLeft: 10 }}>{statusMessage}</Tag>
      </Col>
      <Col span={24} style={{ paddingBottom: 10 }}>
        <Title level={5} style={{ marginBottom: 0 }}>{project?.customer?.name || ''}</Title>
      </Col>
      {(project?.items || []).length > 0 && <Col span={24}>
        <div><Text underline>ITEMS: </Text></div>
        <ul>
        {(project?.items || []).map(item => <li key={item}><Text keyboard>{item}</Text></li>)}
        </ul>
      </Col>}
    </Row>
    {breakpoints.lg && <Row 
      style={{ 
        margin: '24px 0', 
        boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
        border: '1px solid #d4d4d4',
      }}
    >
      <Collapse 
        onChange={(key) => setSelectedCollapsedItems(Array.isArray(key) ? key : (key ? [key] : []))} 
        style={{ width: '100%', border: 'none' }} 
        expandIconPosition="right"
      >
        {
          (project.actionPlan || [])
            .sort((a, b) => a.id - b.id)
            .map((item, index, array) => (
              <Collapse.Panel 
                header={<CollapsedActionPlanItem item={item} selected={selectedCollapsedItems.includes(item.id.toString())} />}  
                key={item.id}
                style={{ 
                  backgroundColor: selectedCollapsedItems.includes(item.id.toString()) ? '#fafafa' : '#fff', 
                  borderBottom: index === array.length - 1 ? 'none' : undefined, 
                }}
              >
                <ActionPlanItem 
                  item={item} 
                  bottomBorder={false}
                  onUpdate={() => setUpdatingPlanItem(item)}
                />
              </Collapse.Panel>
            ))
        }
      </Collapse>
    </Row>}
    {!breakpoints.lg && <Row 
      style={{ 
        margin: '24px 0', 
        boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
        border: '1px solid #d4d4d4',
      }}
    >
      {
        (project.actionPlan || [])
          .sort((a, b) => a.id - b.id)
          .map((item, index, array) => (
            <ActionPlanItem 
              key={item.id} 
              item={item} 
              bottomBorder={index !== array.length - 1} 
              onUpdate={() => setUpdatingPlanItem(item)}
            />
          ))
      }
    </Row>}
    <UpdateActionPlanItemModal 
      // visible={updateFormVisible} 
      onCancel={() => setUpdatingPlanItem(null)} 
      item={updatingPlanItem}
    />
    </>
  );
};

export default Project;