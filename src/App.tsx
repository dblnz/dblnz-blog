import React from 'react';
import TechBlog from './components/TechBlog';
import { NotificationProvider } from './contexts/NotificationContext';
import ToastContainer from './components/ui/ToastContainer';

function App() {
  return (
    <NotificationProvider>
      <TechBlog />
      <ToastContainer />
    </NotificationProvider>
  );
}

export default App;
