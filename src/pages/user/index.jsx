import { Button, Form, Modal, Input } from 'antd';
import { useState } from 'react';

import { useUsers } from '../../libs/hooks/users';

const User = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setModalVisibility] = useState(false);
  const { data: loading, onCreate } = useUsers();

  const handleOk = async () => {
    const values = await form.validateFields();
    onCreate(values);
  };

  return (
    <div>
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
      </>
    </div>
  );
};

export default User;
