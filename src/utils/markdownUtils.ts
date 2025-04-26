import matter from 'gray-matter';
import { Post } from '../hooks/usePosts';

// Helper function to load markdown files from raw content
export const loadMarkdownPost = (content: string, filename: string): Post => {
  // Parse the markdown content with gray-matter
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  // Extract ID from filename if not present in frontmatter
  const id = frontmatter.id || parseInt(filename.replace(/\D/g, '')) || 0;
  
  // Ensure the post has all required properties
  return {
    id,
    title: frontmatter.title || 'Untitled Post',
    date: frontmatter.date || new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    description: frontmatter.description || '',
    content: markdownContent,
    readTime: frontmatter.readTime || calculateReadTime(markdownContent),
    tags: frontmatter.tags || [],
    comingSoon: frontmatter.comingSoon || false,
  };
};

// Function to calculate estimated read time based on content
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};