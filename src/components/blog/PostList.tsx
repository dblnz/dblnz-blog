import React, { useState } from 'react';
import { Post } from '../../hooks/usePosts';
import { Theme } from '../../hooks/useTheme';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';
import { X, Search, Calendar } from 'lucide-react';

interface DateFilter {
  startDate: string | null;
  endDate: string | null;
}

interface PostListProps {
  posts: Post[];
  theme: Theme;
  loading: boolean;
  onPostClick: (id: number) => void;
  dateFilter: DateFilter;
  searchQuery: string;
  onUpdateDateFilter: (filter: DateFilter) => void;
  onUpdateSearchQuery: (query: string) => void;
  onClearFilters: () => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  theme,
  loading,
  onPostClick,
  dateFilter,
  searchQuery,
  onUpdateDateFilter,
  onUpdateSearchQuery,
  onClearFilters
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const hasActiveFilters = searchQuery || dateFilter.startDate || dateFilter.endDate;

  return (
    <div>
      {/* Header with search and filter options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">Latest Posts</h2>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <div className={`flex-1 sm:w-64 flex items-center px-3 py-2 rounded-lg ${theme.surface} border ${theme.border} focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200`}>
            <Search size={18} className={theme.muted} />
            <input
              type="text"
              placeholder="Search posts"
              value={searchQuery}
              onChange={(e) => onUpdateSearchQuery(e.target.value)}
              className={`ml-2 bg-transparent outline-none w-full ${theme.text}`}
              aria-label="Search posts"
            />
            {searchQuery && (
              <button 
                onClick={() => onUpdateSearchQuery('')}
                className={`${theme.muted} hover:text-red-500 transition-colors duration-200`}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`px-3 py-2 rounded-lg ${theme.surface} border ${theme.border} flex items-center transition-colors duration-200 relative ${hasActiveFilters ? 'border-blue-500' : ''}`}
            aria-expanded={showFilterMenu}
            aria-label="Filter posts by date"
          >
            <Calendar size={18} className={hasActiveFilters ? theme.primary : theme.muted} />
            
            {/* Filter indicator */}
            {hasActiveFilters && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></span>
            )}
          </button>

          {/* Clear filters button (only show when filters are active) */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className={`px-3 py-2 rounded-lg ${theme.buttonOutline} transition-colors duration-200`}
              aria-label="Clear all filters"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Date filter popup */}
      {showFilterMenu && (
        <div className={`p-4 mb-6 rounded-lg ${theme.surface} border ${theme.border} animate-fadeIn`}>
          <h3 className="text-lg font-medium mb-3">Filter by date</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className={`block mb-1 text-sm ${theme.secondary}`}>From</label>
              <input
                id="start-date"
                type="date"
                value={dateFilter.startDate || ''}
                onChange={(e) => onUpdateDateFilter({...dateFilter, startDate: e.target.value || null})}
                className={`w-full p-2 rounded border ${theme.border} ${theme.surface} ${theme.text}`}
              />
            </div>
            <div>
              <label htmlFor="end-date" className={`block mb-1 text-sm ${theme.secondary}`}>To</label>
              <input
                id="end-date"
                type="date"
                value={dateFilter.endDate || ''}
                onChange={(e) => onUpdateDateFilter({...dateFilter, endDate: e.target.value || null})}
                className={`w-full p-2 rounded border ${theme.border} ${theme.surface} ${theme.text}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Posts list with loading state */}
      <div className="space-y-6">
        {loading ? (
          // Show skeletons when loading
          Array(4).fill(0).map((_, i) => <PostSkeleton key={i} theme={theme} />)
        ) : posts.length === 0 ? (
          // No results
          <div className={`p-8 text-center rounded-xl ${theme.surface} ${theme.border} border`}>
            <h3 className="text-xl font-medium mb-2">No posts found</h3>
            <p className={theme.muted}>
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        ) : (
          // Display posts
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              theme={theme}
              onClick={() => onPostClick(post.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;