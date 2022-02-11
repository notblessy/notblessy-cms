import { useState } from 'react';
import { Button, Col, Row, Input, Modal, Table, Form, Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { DashboardContent } from '../../components';

import { useCustomers } from '../../libs/hooks/customer';

const Customers = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setModalVisibility] = useState(false);
  const {
    data: customer,
    loading,
    onChangePage,
    pagination,
    onCreate,
  } = useCustomers();

  const handleOk = async () => {
    const values = await form.validateFields();
    onCreate(values).finally(() => setModalVisibility(false));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) =>
        value ? format(new Date(value), 'dd MMM yyyy HH:mm') : '-',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
          children: [
            {
              text: 'Yellow',
              value: 'Yellow',
            },
            {
              text: 'Pink',
              value: 'Pink',
            },
          ],
        },
        {
          text: 'Category 2',
          value: 'Category 2',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: '30%',
    },
  ];

  return (
    <DashboardContent>
      <Row>
        <div>
          <Button
            onClick={() => setModalVisibility(true)}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Add Customer
          </Button>
        </div>
        {loading ? <div>Loading...</div> : null}
        <>
          <Modal
            title="Add New Customer"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setModalVisibility(false)}
          >
            <Form name="basic" form={form}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email.' },
                ]}
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
        </>
      </Row>
      <Row>
        <Col md={18}>
          {loading ? 'Loading...' : null}
          {customer ? (
            <div>
              <Table
                columns={columns}
                dataSource={customer}
                pagination={{
                  current: pagination?.page || 1,
                  pageSize: pagination?.pageSize || 10,
                  total: pagination?.total,
                  onChange: (page, pageSize) => onChangePage(page, pageSize),
                }}
              />
            </div>
          ) : null}
        </Col>
      </Row>
    </DashboardContent>
  );
};

export default Customers;
