import { Button, Form, Modal, Input, Card, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';

import { useUsers } from '../../../libs/hooks/users';

import { columns } from '../utils';

const User = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setModalVisibility] = useState(false);
  const { data: loading, onCreate } = useUsers();

  const handleOk = async () => {
    const values = await form.validateFields();
    onCreate(values);
  };

  return (
    <Content>
      <div>
        <Button onClick={() => setModalVisibility(true)}>Add User</Button>
      </div>
      {loading ? <div>Loading...</div> : null}
      <>
        <Modal
          title="Add New User"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setModalVisibility(false)}
        >
          <Form name="basic" form={form}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password.' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
        <Card style={{ marginTop: 16 }}>
          <Table
            rowKey="id"
            columns={columns}
            loading={loading}
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectRow,
            }}
            dataSource={staffs?.data || []}
            onRow={(record) => ({
              onClick: () => {
                history.push(`/d/staffs/${record.id}`);
              },
            })}
            pagination={{
              current: staffs?.pagination?.page || 1,
              pageSize: staffs?.pagination?.pageSize || 10,
              total: staffs?.pagination?.total || 1,
              onChange: (sltPage, sltPageSize) => {
                query.set('page', sltPage);
                query.set('pageSize', sltPageSize);
                history.push(`/d/staffs?${query.toString()}`);
              },
            }}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </>
    </Content>
  );
};

export default User;
