import React from 'react';
import Toast from './Toast';
import { useNotifications } from '../../contexts/NotificationContext';
import { useTheme } from '../../hooks/useTheme';

const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const { theme } = useTheme();
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={removeNotification}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ToastContainer;