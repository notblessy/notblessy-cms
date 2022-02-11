import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';

const CustomerCard = ({ customer }) => {
  const navigate = useNavigate();
  return (
    <Table
      className="customer-table"
      bordered={false}
      hoverable
      onClick={() => navigate(`/customers/${customer.id}`)}
      cover={<img alt={customer.name} src={customer.email} />}
    >
      <Table.Meta
        alt={customer.id}
        title={customer.name}
        description={
          <>
            <span>Maintenance</span>
            <span>Domain</span>
            <span>Hosting</span>
          </>
        }
      />
    </Table>
  );
};

export default CustomerCard;
