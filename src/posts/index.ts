import { Post } from '../hooks/usePosts';
import { loadMarkdownPost } from '../utils/markdownUtils';

// Use dynamic imports for markdown files - this is natively supported by Vite
const postFiles = import.meta.glob<string>('./**.md', { query: '?raw', import: 'default', eager: true });

// Convert the imported markdown contents to Post objects
export const posts: Post[] = Object.entries(postFiles).map(([path, content]) => {
  // Extract the filename without path or extension
  const fileName = path.split('/').pop()?.replace(/\.md$/, '') || '';
  return loadMarkdownPost(content, fileName);
}).sort((a, b) => {
  // Sort by date, newest first
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});