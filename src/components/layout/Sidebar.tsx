import React from 'react';
import { Theme } from '../../hooks/useTheme';
import { Author } from '../../data/author';
import { GithubIcon, BlueskyIcon, LinkedInIcon, Mail } from '../ui/SocialIcons';

interface SidebarProps {
  theme: Theme;
  author: Author;
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  theme, 
  author, 
  availableTags,
  selectedTags,
  onToggleTag
}) => {
  return (
    <aside className="md:w-72 flex-shrink-0 mb-8 md:mb-0 md:sticky md:top-24 md:self-start">
      <div className={`rounded-xl overflow-hidden ${theme.cardBg} ${theme.cardShadow} transition-all duration-200 hover:shadow-xl`}>
        <div className={`${theme.accent} h-16 w-full`}></div>
        <div className="px-6 pb-6 pt-0 -mt-10">
          <div className="flex flex-col items-center mb-4">
            <img
              src={author.picture}
              alt={author.name}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 mb-4 object-cover"
            />
            <h2 className="text-xl font-bold">{author.name}</h2>
            <span className={`text-sm mt-1 ${theme.secondary}`}>{author.profession}</span>
          </div>
          <p className={`text-sm mb-6 ${theme.secondary} text-center italic`}>
            {author.bio}
          </p>
          <div className="flex justify-center space-x-3 mb-6">
            <a 
              href={`https://${author.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200 hover:scale-105`}
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a 
              href="https://bsky.app/profile/dblnz.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200 hover:scale-105`}
              aria-label="Bluesky"
            >
              <BlueskyIcon />
            </a>
            <a 
              href={`https://${author.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200 hover:scale-105`}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a 
              href={`mailto:${author.email}`}
              className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200 hover:scale-105`}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
          
          {availableTags.length > 0 && (
            <div className={`border-t ${theme.border} pt-4`}>
              <h3 className="font-medium mb-2">Filter by topic</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => onToggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                      selectedTags.includes(tag) 
                        ? theme.buttonFilled
                        : theme.buttonOutline
                    }`}
                    aria-pressed={selectedTags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;