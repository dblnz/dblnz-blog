import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Post } from '../../hooks/usePosts';
import { Theme } from '../../hooks/useTheme';

interface PostViewProps {
  post: Post;
  theme: Theme;
  onBack: () => void;
  darkMode: boolean;
}

const PostView: React.FC<PostViewProps> = ({ post, theme, onBack, darkMode }) => {
  return (
    <div className={`p-8 rounded-xl ${theme.cardBg} ${theme.cardShadow} transition-all duration-300 animate-fadeIn`}>
      <button
        onClick={onBack}
        className={`mb-6 flex items-center ${theme.link} font-medium transition-colors duration-200 focus:outline-none focus:underline`}
        aria-label="Back to posts"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to all posts
      </button>

      <article>
        <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight`}>
          {post.title}
        </h1>

        {post.comingSoon && (
          <div className="text-amber-500 dark:text-amber-400 font-medium text-sm mb-4">
            Coming Soon
          </div>
        )}

        {!post.comingSoon && (
          <div className="flex items-center mb-6">
            <div className={`mr-6 ${theme.muted}`}>
              {post.date}
            </div>
            {post.readTime && (
              <div className={`${theme.muted}`}>
                {post.readTime}
              </div>
            )}
          </div>
        )}

        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className={`px-3 py-1 rounded-full text-xs ${theme.buttonOutline}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={`text-lg mb-8 ${theme.secondary}`}>
          {post.description}
        </div>

        <div className={`prose prose-lg ${darkMode ? 'prose-invert' : ''} max-w-none`}>
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default PostView;