import { Breadcrumb } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DashboardContent = ({ breadcrumb, headContent, children }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">
      <div className="dashboard-content-head">
        {breadcrumb ? (
          <Breadcrumb
            className="dashboard-content-breadcrumb"
            separator={<RightOutlined />}
          >
            {breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.label}
                className={!item.href ? 'nohref' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                href={item?.href}
              >
                {item.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        ) : null}
        {headContent ? (
          <div className="dashboard-content-head-right">{headContent}</div>
        ) : null}
      </div>
      <div className="dashboard-content-body">{children}</div>
    </div>
  );
};

export default DashboardContent;
