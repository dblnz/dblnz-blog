import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Post } from '../../hooks/usePosts';
import { Theme } from '../../hooks/useTheme';

interface PostCardProps {
  post: Post;
  theme: Theme;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, theme, onClick }) => {
  return (
    <Link
      to={`/post/${post.id}`}
      className={`block p-6 rounded-xl ${theme.cardBg} ${theme.cardShadow} transition-all transform hover:scale-[1.01] duration-200`}
      onClick={(e) => {
        // Prevent default behavior to let the onClick handler manage navigation
        // This ensures our viewPost logic runs while still using the Link component
        e.preventDefault();
        onClick();
      }}
      role="article"
    >
      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className={`px-2 py-1 rounded-full text-xs ${theme.buttonOutline}`}>
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className={`px-2 py-1 rounded-full text-xs ${theme.muted}`}>
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      )}

      <h3 className="text-xl font-bold mb-2 leading-snug">{post.title}</h3>
      
      {post.comingSoon && (
        <div className="text-amber-500 dark:text-amber-400 font-medium text-sm mb-2">
          Coming Soon
        </div>
      )}

      {!post.comingSoon && (
        <div className="flex items-center mb-3">
          <div className={`text-sm ${theme.muted}`}>{post.date}</div>
          {post.readTime && (
            <>
              <span className="mx-2 text-gray-400">•</span>
              <div className={`text-sm ${theme.muted}`}>{post.readTime}</div>
            </>
          )}
        </div>
      )}

      <p className={`mb-4 ${theme.secondary}`}>{post.description}</p>

      <div className={`mt-2 text-sm font-medium ${theme.primary} flex items-center group`}>
        Read article <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
};

export default PostCard;