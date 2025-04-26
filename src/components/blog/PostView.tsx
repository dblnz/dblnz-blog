import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Post } from '../../hooks/usePosts';
import { Theme } from '../../hooks/useTheme';
import { FacebookIcon, LinkedInIcon, BlueskyIcon } from '../ui/SocialIcons';

interface PostViewProps {
  post: Post;
  theme: Theme;
  onBack: () => void;
  darkMode: boolean;
}

const PostView: React.FC<PostViewProps> = ({ post, theme, onBack, darkMode }) => {
  // Function to generate share URLs for different platforms
  const getShareUrl = (platform: string) => {
    // Get the current URL of the post
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post.title);
    
    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
      case 'bluesky':
        return `https://bsky.app/intent/compose?text=${postTitle}%20${postUrl}`;
      default:
        return '#';
    }
  };

  // Function to handle share button clicks
  const handleShare = (platform: string) => {
    const shareUrl = getShareUrl(platform);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="animate-fadeIn transition-all duration-300">
      <button
        onClick={onBack}
        className={`mb-6 flex items-center ${theme.link} font-medium transition-colors duration-200 focus:outline-none focus:underline`}
        aria-label="Back to posts"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to all posts
      </button>

      <article className="prose-headings:scroll-mt-20">
        <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight`}>
          {post.title}
        </h1>

        {post.comingSoon && (
          <div className="text-amber-500 dark:text-amber-400 font-medium text-sm mb-4">
            Coming Soon
          </div>
        )}

        {!post.comingSoon && (
          <div className="flex items-center mb-6 text-sm">
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

        <div className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''}`}>
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Social Media Sharing Section - Fixed alignment */}
        {!post.comingSoon && (
          <div className={`flex flex-col mt-12 mb-8 p-4 rounded-lg ${theme.surface} border ${theme.border} w-full mx-auto`}>
            <p className={`text-sm mb-3 ${theme.secondary} font-medium`}>
              Enjoyed this article? Share it with your network:
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleShare('bluesky')}
                className={`p-2 rounded-full ${theme.iconBg} transition-colors duration-200 hover:bg-sky-100 dark:hover:bg-sky-900 group`}
                aria-label="Share on Bluesky"
              >
                <BlueskyIcon />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className={`p-2 rounded-full ${theme.iconBg} transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 group`}
                aria-label="Share on Facebook"
              >
                <FacebookIcon />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className={`p-2 rounded-full ${theme.iconBg} transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 group`}
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon />
              </button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default PostView;