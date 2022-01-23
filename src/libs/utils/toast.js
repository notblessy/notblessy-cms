import { notification } from 'antd';

const toast = (type = 'success', message) => {
  const title = {
    success: 'Success',
    error: 'Ooops',
  };

  notification[type]({
    message: title[type],
    description: message,
  });
};

export default toast;
