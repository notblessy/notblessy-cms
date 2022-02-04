import { Avatar } from 'antd';
import { format } from 'date-fns';

export const columns = [
  {
    title: '#',
    dataIndex: 'picture',
    key: 'picture',
    render: (src) => <Avatar src={src} />,
  },
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'No Telp/WA',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Alamat',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Bergabung',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (value) =>
      value ? format(new Date(value), 'dd MMM yyyy HH:mm') : '-',
  },
];
