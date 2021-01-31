
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio, Select, DatePicker } from 'antd';
import { ActionPlanItem } from './ProjectCard';
import moment from 'moment';

const { Option } = Select;

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface UpdateActionPlanItemModalProps {
  // visible: boolean;
  // onCreate: (values: Values) => void;
  onCancel: () => void;
  item: ActionPlanItem | null;
}

const UpdateActionPlanItemModal: React.FC<UpdateActionPlanItemModalProps> = ({
  // visible,
  // onCreate,
  onCancel,
  item,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [item, form]);

  const sortedInnerFields = (item?.innerFields || []).sort((a, b) => a.id - b.id);

  const title = sortedInnerFields.find(innerField => innerField.name === 'Activity')?.defaultValue || 'Activity';
  const status = sortedInnerFields.find(innerField => innerField.name === 'Status')?.value || 'Not yet started';
  // const responsibility = sortedInnerFields.find(innerField => innerField.name === 'Responsibility')?.defaultValue || [];
  const targetDate = sortedInnerFields.find(innerField => innerField.name === 'Target date')?.value || '';
  const targetDateRevised = sortedInnerFields.find(innerField => innerField.name === 'Target date(Rev.)')?.value || '';
  const completedDate = sortedInnerFields.find(innerField => innerField.name === 'Date completed')?.value || '';
  const remarks = sortedInnerFields.find(innerField => innerField.name === 'Remarks')?.value || '';

  return (
    <Modal
      visible={!!item}
      title={title}
      okText="Update"
      cancelText="Cancel"
      onCancel={() => onCancel()}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            // onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_update_action_plan_item_modal"
        initialValues={{ 
          status, 
          targetDate: targetDate ? moment(targetDate) : undefined,
          targetDateRevised: targetDateRevised ? moment(targetDateRevised) : undefined,
          completedDate: completedDate ? moment(completedDate) : undefined,
        }}
      >
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Select>
            <Option value="Not yet started" disabled={['Started', 'In progress', 'Completed'].includes(status)}>Not yet started</Option>
            <Option value="Started" disabled={['In progress', 'Completed'].includes(status)}>Started</Option>
            <Option value="In progress" disabled={['Completed'].includes(status)}>In progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="targetDate"
          label="Target Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="targetDateRevised"
          label="Target Date (Rev.)"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="completedDate"
          label="Completed Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        {/* <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default UpdateActionPlanItemModal;