import { useState, useEffect, useMemo } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { posts as staticPosts } from '../posts';

// Define TypeScript interfaces for our data models
export interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  content: string;
  readTime?: string;
  tags?: string[];
}

interface DateFilter {
  startDate: string | null;
  endDate: string | null;
}

interface PostsFilter {
  tags: string[];
  dateRange: DateFilter;
  searchQuery: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { addNotification } = useNotifications();
  
  // Filter states
  const [filters, setFilters] = useState<PostsFilter>({
    tags: [],
    dateRange: { startDate: null, endDate: null },
    searchQuery: '',
  });

  // Get all unique tags from posts
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [posts]);

  // Apply filters to posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Filter by tags
      if (filters.tags.length > 0 && post.tags) {
        const hasMatchingTag = post.tags.some(tag => filters.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      
      // Filter by date range
      if (filters.dateRange.startDate || filters.dateRange.endDate) {
        const postDate = new Date(post.date);
        
        if (filters.dateRange.startDate) {
          const startDate = new Date(filters.dateRange.startDate);
          if (postDate < startDate) return false;
        }
        
        if (filters.dateRange.endDate) {
          const endDate = new Date(filters.dateRange.endDate);
          if (postDate > endDate) return false;
        }
      }
      
      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDescription = post.description.toLowerCase().includes(query);
        const matchesTags = post.tags?.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesTitle && !matchesDescription && !matchesTags) return false;
      }
      
      return true;
    });
  }, [posts, filters]);

  // Fetch posts (now using static markdown files)
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate a small delay to show loading state (optional)
      setTimeout(() => {
        setPosts(staticPosts);
        setLoading(false);
        addNotification('success', 'Blog posts loaded successfully', 3000);
      }, 300);

    } catch (err) {
      const errorMessage = 'Failed to load blog posts';
      setError(errorMessage);
      addNotification('error', errorMessage, 0);
      setLoading(false);
      console.error(err);
    }
  };

  // Initialize by fetching posts
  useEffect(() => {
    fetchPosts();
  }, [addNotification]);

  // Function to get post by ID
  const getPostById = (id: number): Post | undefined => {
    return posts.find(post => post.id === id);
  };

  // View a specific post
  const viewPost = (id: number): void => {
    const post = getPostById(id);
    if (post) {
      setSelectedPost(post);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      addNotification('error', `Post with ID ${id} not found`, 3000);
    }
  };

  // Return to post list
  const returnToList = (): void => {
    setSelectedPost(null);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<PostsFilter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Toggle a tag filter
  const toggleTagFilter = (tag: string) => {
    setFilters(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      tags: [],
      dateRange: { startDate: null, endDate: null },
      searchQuery: '',
    });
    addNotification('info', 'Filters cleared', 2000);
  };

  return {
    posts: filteredPosts,
    loading,
    error,
    selectedPost,
    availableTags,
    filters,
    fetchPosts,
    viewPost,
    returnToList,
    updateFilters,
    toggleTagFilter,
    clearFilters
  };
};