import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import TechBlog from './components/TechBlog';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import ToastContainer from './components/ui/ToastContainer';

// Extract post ID from GitHub Pages URL format or normal URL format
const extractPostId = (pathname: string, search: string): string | null => {
  // Check if this is a GitHub Pages redirect URL format (/?/post/1)
  if (pathname === '/' && search.startsWith('?/post/')) {
    const match = search.match(/^\?\/post\/(\d+)/);
    return match ? match[1] : null;
  }
  
  // Check if this is a normal post URL (/post/1)
  const match = pathname.match(/^\/post\/(\d+)/);
  return match ? match[1] : null;
};

// Component to handle all routing logic
const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  useEffect(() => {
    // Handle GitHub Pages redirect format safely
    if (location.pathname === '/' && location.search.startsWith('?/post/')) {
      const postId = extractPostId(location.pathname, location.search);
      if (postId) {
        // Instead of using replaceState (which can cause security errors),
        // use navigate with replace option
        navigate(`/post/${postId}`, { replace: true });
        return; // Exit early as navigate will trigger this effect again
      }
    }
    
    // Check for notFound parameter in URL
    const params = new URLSearchParams(location.search);
    const notFoundPath = params.get('notFound');
    
    if (notFoundPath) {
      // Show error notification
      addNotification(
        'error', 
        `The page "${decodeURIComponent(notFoundPath)}" was not found.`,
        6000
      );
      
      // Clean up the URL safely using navigate instead of replaceState
      navigate(location.pathname, { replace: true });
    }
  }, [location, addNotification, navigate]);
  
  // Use the current location's pathname and search to determine if we should show a post
  const postId = extractPostId(location.pathname, location.search);
  
  // Always render TechBlog, but pass the postId as a URL parameter if we have one
  return (
    <Routes>
      {/* Always use TechBlog component, passing postId via URL parameter */}
      <Route path="/" element={<TechBlog />} />
      <Route path="/post/:postId" element={<TechBlog />} />
      
      {/* Fallback route to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <NotificationProvider>
      <Router>
        <AppRoutes />
        <ToastContainer />
      </Router>
    </NotificationProvider>
  );
}

export default App;
