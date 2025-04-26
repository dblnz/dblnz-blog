import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import PostList from './blog/PostList';
import PostView from './blog/PostView';
import SkipLink from './ui/SkipLink';
import LoadingOverlay from './ui/LoadingOverlay';
import { useTheme } from '../hooks/useTheme';
import { usePosts } from '../hooks/usePosts';
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
  
  // React Router hooks
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

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
    navigate(`/post/${id}`);
    viewPost(id);
  };
  
  // Handle returning to the list view
  const handleReturnToList = () => {
    navigate('/');
    returnToList();
  };
  
  // Create a stable reference to the post loading function
  const loadPostFromUrl = useCallback(() => {
    if (postId) {
      const id = parseInt(postId, 10);
      if (!isNaN(id)) {
        // If the post doesn't exist, redirect to home page after showing the error
        const postFound = viewPost(id);
        if (!postFound) {
          // Wait a moment to allow the error notification to be seen
          setTimeout(() => {
            navigate('/');
            returnToList();
          }, 1500);
        }
        // No else block needed - if post is found, viewPost already sets selectedPost
      } else {
        // If postId isn't a valid number, redirect to home
        navigate('/');
      }
    }
  }, [postId, viewPost, navigate, returnToList]);
  
  // Effect to load the correct post from the URL when the component mounts or URL changes
  useEffect(() => {
    loadPostFromUrl();
  }, [loadPostFromUrl]);

  return (
    <div className={`min-h-screen flex flex-col ${theme.background} ${theme.text} font-sans transition-theme`}>
      {/* Application-wide loading overlay */}
      <LoadingOverlay theme={theme} isLoading={loading && posts.length === 0} message="Loading blog posts..." />
      
      {/* Skip link for keyboard navigation */}
      <SkipLink theme={theme} />
      
      {/* Header */}
      <Header theme={theme} darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8 md:flex md:gap-8 animate-fadeIn">
        {/* Left Sidebar */}
        <Sidebar
          theme={theme}
          author={AUTHOR}
          availableTags={availableTags}
          selectedTags={filters.tags}
          onToggleTag={toggleTagFilter}
        />

        {/* Right Content Area */}
        <div className="md:flex-grow">
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
