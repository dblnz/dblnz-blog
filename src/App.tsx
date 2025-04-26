import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TechBlog from './components/TechBlog';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import ToastContainer from './components/ui/ToastContainer';

// Component to handle notifications based on URL parameters
const NotificationHandler = () => {
  const location = useLocation();
  const { addNotification } = useNotifications();
  
  useEffect(() => {
    // Check for notFound parameter in URL, which indicates a 404 redirect
    const params = new URLSearchParams(location.search);
    const notFoundPath = params.get('notFound');
    
    if (notFoundPath) {
      // If notFound parameter exists, show error notification
      addNotification(
        'error', 
        `The page "${decodeURIComponent(notFoundPath)}" was not found.`,
        6000
      );
      
      // Clean up the URL by removing the notFound parameter
      // This prevents the notification from showing again on refresh
      const newParams = new URLSearchParams(location.search);
      newParams.delete('notFound');
      
      const newSearch = newParams.toString();
      const newPath = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${location.hash}`;
      
      // Replace the current URL without the notFound parameter
      window.history.replaceState({}, '', newPath);
    }
  }, [location, addNotification]);
  
  return null; // This component doesn't render anything
};

function App() {
  return (
    <NotificationProvider>
      <Router>
        <NotificationHandler />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<TechBlog />} />
          
          {/* Post route with ID parameter */}
          <Route path="/post/:postId" element={<TechBlog />} />
          
          {/* Fallback route for any other paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </NotificationProvider>
  );
}

export default App;
