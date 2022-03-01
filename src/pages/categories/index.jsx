import { useState } from 'react';
import { Button, Col, Row, Input, Modal, Table, Form } from 'antd';
import { format } from 'date-fns';

import { DashboardContent } from '../../components';

import { useCategories } from '../../libs/hooks/categories';

const Categories = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setModalVisibility] = useState(false);
  const {
    data: categories,
    loading,
    onSearch,
    onChangePage,
    pagination,
    onCreate,
  } = useCategories();

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
      title: 'Description',
      dataIndex: 'description',
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
            Add Category
          </Button>
        </div>
        {loading ? <div>Loading...</div> : null}
        <div
          style={{
            margin: '0 16px',
          }}
        >
          <Input.Search
            onChange={(event) => {
              onSearch(event.target.value);
            }}
          />
        </div>
        <>
          <Modal
            title="Add New Customer"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setModalVisibility(false)}
          >
            <Form name="basic" form={form}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'Please input category name.' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input category description.',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Picture"
                name="picture"
                rules={[
                  { required: true, message: 'Please input your password.' },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </Row>
      <Row>
        <Col md={18}>
          {loading ? 'Loading...' : null}
          {categories ? (
            <div>
              <Table
                columns={columns}
                dataSource={categories}
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

export default Categories;
