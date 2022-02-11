import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';

import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useAuth } from '../../libs/contexts/auth';

const { Text, Title, Link: AntLink } = Typography;

const Login = () => {
  const [searchParams] = useSearchParams();
  const { authenticate, loading } = useAuth();

  const onFinish = (values) => {
    authenticate(values);
  };

  return (
    <>
      <div className="layout-auth-form login">
        <Title level={1} className="layout-auth-form-heading">
          Welcome to
          <br />
          notblessy
        </Title>
        <Text className="layout-auth-form-description">
          Please enter your email address and password to login to your support
          dashboard.
        </Text>
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="vd-form auth-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
            initialValue={searchParams.get('email')}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Link to="/forgot-password">
                <Button type="link" style={{ padding: '0' }}>
                  Forgot password?
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
        <AntLink
          className="layout-auth-form-back"
          href="https://vincere.support"
          target="_blank"
        >
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            style={{ padding: '0' }}
          >
            Back to the main site
          </Button>
        </AntLink>
      </div>
      <Helmet>
        <title>Login</title>
      </Helmet>
    </>
  );
};

export default Login;
