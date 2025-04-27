import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import PostList from './blog/PostList';
import PostView from './blog/PostView';
import SkipLink from './ui/SkipLink';
import LoadingOverlay from './ui/LoadingOverlay';
import { useTheme } from '../hooks/useTheme';
import { usePosts } from '../hooks/usePosts';
import { useNotifications } from '../contexts/NotificationContext';
import { AUTHOR } from '../data/author';

const TechBlog: React.FC = () => {
  // Use our custom hooks
  const { theme, darkMode, toggleTheme } = useTheme();
  const {
    posts,
    loading,
    selectedPost,
    availableTags,
    filters,
    viewPost,
    returnToList,
    toggleTagFilter,
    updateFilters,
    clearFilters,
    getPostById
  } = usePosts();
  const { addNotification } = useNotifications();
  
  // State to control sidebar visibility with animation
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  // React Router hooks
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to extract post ID from GitHub Pages URL format if needed
  const getEffectivePostId = useCallback(() => {
    // First check if we have a postId from useParams (normal URL)
    if (postId) {
      return postId;
    }
    
    // Check if this is a GitHub Pages URL format (/?/post/1)
    if (location.pathname === '/' && location.search.startsWith('?/post/')) {
      const match = location.search.match(/^\?\/post\/(\d+)/);
      return match ? match[1] : null;
    }
    
    return null;
  }, [postId, location.pathname, location.search]);
  
  // Update date filter
  const handleDateFilterChange = (dateRange: { startDate: string | null; endDate: string | null }) => {
    updateFilters({ dateRange });
  };

  // Update search query
  const handleSearchQueryChange = (searchQuery: string) => {
    updateFilters({ searchQuery });
  };
  
  // Handle navigation to a post
  const handleViewPost = (id: number) => {
    // Hide sidebar with animation
    setSidebarVisible(false);
    // Small delay to allow the animation to play before navigation
    setTimeout(() => {
      navigate(`/post/${id}`);
      viewPost(id);
    }, 200);
  };
  
  // Handle returning to the list view
  const handleReturnToList = () => {
    navigate('/', { state: { navigatedBack: true } });
    returnToList();
    // Show sidebar again after returning to list
    setSidebarVisible(true);
  };
  
  // Create a stable reference to the post loading function
  const loadPostFromUrl = useCallback(() => {
    const effectivePostId = getEffectivePostId();
    
    if (effectivePostId) {
      const id = parseInt(effectivePostId, 10);
      if (!isNaN(id)) {
        // Skip trying to view the post if posts are still loading
        if (loading) {
          return;
        }
        
        // If the post doesn't exist, redirect to home page after showing the error
        const postFound = viewPost(id);
        if (!postFound) {
          // Show error notification immediately
          addNotification(
            'error', 
            `Post with ID ${id} not found.`,
            6000
          );
          
          // Immediately navigate back to home to avoid blank page
          navigate('/', { replace: true });
          returnToList();
          setSidebarVisible(true);
        } else {
          // When viewing a post from URL, ensure sidebar is hidden
          setSidebarVisible(false);
        }
      } else {
        // If postId isn't a valid number, redirect to home immediately
        navigate('/', { replace: true });
        returnToList();
        setSidebarVisible(true);
      }
    } else {
      // If no postId in URL, make sure we're in list view
      returnToList();
      setSidebarVisible(true);
    }
  }, [getEffectivePostId, loading, viewPost, navigate, returnToList, addNotification, setSidebarVisible]);
  
  // Effect to load the correct post from the URL when the component mounts or URL changes
  useEffect(() => {
    loadPostFromUrl();
  }, [loadPostFromUrl, location.pathname]); // Add location.pathname as a dependency
  
  // Additional effect to load post from URL when posts finish loading
  useEffect(() => {
    if (!loading && postId) {
      loadPostFromUrl();
    }
  }, [loading, postId, loadPostFromUrl]);

  return (
    <div className={`min-h-screen flex flex-col ${theme.background} ${theme.text} font-sans transition-theme`}>
      {/* Application-wide loading overlay */}
      <LoadingOverlay theme={theme} isLoading={loading && posts.length === 0} message="Loading blog posts..." />
      
      {/* Skip link for keyboard navigation */}
      <SkipLink theme={theme} />
      
      {/* Header */}
      <Header theme={theme} darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main id="main-content" className={`flex-grow container mx-auto px-4 py-8 md:flex md:gap-8 ${selectedPost ? 'justify-center' : ''} animate-fadeIn`}>
        {/* Left Sidebar - only visible on list view or animating out */}
        <div className={`transition-all duration-300 ease-in-out ${
          sidebarVisible 
            ? 'md:w-72 opacity-100' 
            : 'md:w-0 md:opacity-0 md:overflow-hidden hidden md:block'
        } flex-shrink-0 mb-8 md:mb-0`}>
          <Sidebar
            theme={theme}
            author={AUTHOR}
            availableTags={availableTags}
            selectedTags={filters.tags}
            onToggleTag={toggleTagFilter}
          />
        </div>

        {/* Right Content Area */}
        <div className={`md:flex-grow ${selectedPost ? 'max-w-3xl mx-auto' : ''}`}>
          {selectedPost ? (
            // Single Post View
            <PostView 
              post={selectedPost} 
              theme={theme} 
              onBack={handleReturnToList} 
              darkMode={darkMode} 
            />
          ) : (
            // Post List View
            <PostList
              posts={posts}
              theme={theme}
              loading={loading && posts.length > 0}
              onPostClick={handleViewPost}
              dateFilter={filters.dateRange}
              searchQuery={filters.searchQuery}
              onUpdateDateFilter={handleDateFilterChange}
              onUpdateSearchQuery={handleSearchQueryChange}
              onClearFilters={clearFilters}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
};

export default TechBlog;
