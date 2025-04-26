import React from 'react';
import Toast from './Toast';
import { useNotifications } from '../../contexts/NotificationContext';
import { useTheme } from '../../hooks/useTheme';

const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const { theme } = useTheme();
  
  // Group notifications by type for proper positioning
  const errorNotifications = notifications.filter(n => n.type === 'error');
  const nonErrorNotifications = notifications.filter(n => n.type !== 'error');
  
  return (
    <>
      {/* Error notifications go at the top center with padding to avoid overlapping content */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-3">
        {errorNotifications.map((notification) => (
          <Toast
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={removeNotification}
            theme={theme}
            duration={notification.duration}
          />
        ))}
      </div>
      
      {/* Other notifications go at the bottom right */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
        {nonErrorNotifications.map((notification) => (
          <Toast
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={removeNotification}
            theme={theme}
            duration={notification.duration}
          />
        ))}
      </div>
    </>
  );
};

export default ToastContainer;