import React from 'react';
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
    clearFilters
  } = usePosts();

  // Update date filter
  const handleDateFilterChange = (dateRange: { startDate: string | null; endDate: string | null }) => {
    updateFilters({ dateRange });
  };

  // Update search query
  const handleSearchQueryChange = (searchQuery: string) => {
    updateFilters({ searchQuery });
  };

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
              onBack={returnToList} 
              darkMode={darkMode} 
            />
          ) : (
            // Post List View
            <PostList
              posts={posts}
              theme={theme}
              loading={loading && posts.length > 0}
              onPostClick={viewPost}
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
