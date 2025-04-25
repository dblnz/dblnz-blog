import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNotifications } from '../contexts/NotificationContext';

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

// Sample blog data - will be replaced with real data from backend
const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    title: "Building a Scalable Microservice Architecture",
    date: "April 12, 2025",
    description: "How I redesigned our monolith into microservices and what I learned along the way.",
    readTime: "8 min read",
    tags: ["Architecture", "Microservices", "DevOps"],
    content: `# Building a Scalable Microservice Architecture

## The Challenge

Our team was facing increasing difficulty maintaining our monolithic application. As the codebase grew, deployments became riskier, development velocity slowed, and scaling specific components was impossible without scaling the entire application.

## The Journey

### Step 1: Domain Analysis

The first step was to identify bounded contexts within our application. We conducted several workshops to map out the different domains and their interactions.

### Step 2: Service Boundaries

After identifying the domains, we defined service boundaries. Each service needed to:
- Be independently deployable
- Have its own database
- Handle a specific business capability

### Step 3: Migration Strategy

We adopted the strangler pattern, gradually moving functionality from the monolith to new services while maintaining full functionality.

## Lessons Learned

1. Start with a clear understanding of your domain
2. Invest in good CI/CD from the beginning
3. Implement thorough monitoring and observability
4. Establish clear team ownership for services
5. Don't break services down too small too early

## Results

Six months after beginning our migration, we had:
- Improved deployment frequency by 400%
- Reduced mean time to recovery by 70%
- Enabled independent scaling of high-load services
- Allowed teams to adopt different tech stacks where appropriate

The journey wasn't without challenges, but the resulting architecture has significantly improved our ability to innovate and scale.`
  },
  {
    id: 2,
    title: "Optimizing React Performance: A Case Study",
    date: "April 5, 2025",
    description: "How I improved our application's performance by 300% through React optimization techniques.",
    readTime: "6 min read",
    tags: ["React", "Performance", "Frontend"],
    content: "# Optimizing React Performance\n\nThis is a sample post content using Markdown.\n\n## Problem Statement\n\nOur React application was suffering from performance issues...\n\n## Solutions Applied\n\n1. Implemented React.memo for component memoization\n2. Used useCallback and useMemo hooks\n3. Virtualized long lists\n\n## Results\n\nPerformance improved by 300%!"
  },
  {
    id: 3,
    title: "My Journey Learning Rust for Systems Programming",
    date: "March 28, 2025",
    description: "The challenges and rewards of picking up Rust after years of JavaScript development.",
    readTime: "5 min read",
    tags: ["Rust", "Systems Programming", "Learning"],
    content: "# Learning Rust\n\nThis is a sample post content using Markdown."
  },
  {
    id: 4,
    title: "Implementing Event Sourcing in a Node.js Application",
    date: "March 20, 2025",
    description: "How I implemented event sourcing to improve our application's auditability and reliability.",
    readTime: "7 min read",
    tags: ["Node.js", "Event Sourcing", "Backend"],
    content: "# Event Sourcing in Node.js\n\nThis is a sample post content using Markdown."
  }
];

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

  // Fetch posts from API (currently using sample data)
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, we'd fetch from API
      // const response = await axios.get('/api/posts');
      // setPosts(response.data);
      
      // Using sample data for now with simulated API delay
      setTimeout(() => {
        setPosts(SAMPLE_POSTS);
        setLoading(false);
        addNotification('success', 'Blog posts loaded successfully', 3000);
      }, 1000);

    } catch (err) {
      const errorMessage = 'Failed to fetch blog posts';
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