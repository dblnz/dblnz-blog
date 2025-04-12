import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Twitter, Linkedin, Mail, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Define TypeScript interfaces for our data models
interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  content: string;
  readTime?: string;
  tags?: string[];
}

interface Author {
  name: string;
  picture: string;
  bio: string;
  github: string;
  x: string;
  linkedin: string;
  email: string;
}

// Sample blog data - would be replaced with real data from backend
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

// Author information
const AUTHOR: Author = {
  name: "Doru Blanzeanu",
  picture: "/api/placeholder/150/150",
  bio: "Software Engineer with 6+ years of experience. Passionate about systems, Rust, and clean code. Currently exploring WebAssembly.",
  github: "github.com/dblnz",
  x: "x.com/dblnz",
  linkedin: "linkedin.com/in/dblnz",
  email: "dblnz@pm.me"
};

// Styles for light and dark mode
const lightTheme = {
  background: "bg-gray-50",
  text: "text-gray-900",
  primary: "text-blue-600",
  primaryHover: "text-blue-800",
  secondary: "text-gray-700",
  accent: "bg-blue-600",
  accentHover: "bg-blue-700",
  surface: "bg-white",
  surfaceHover: "bg-gray-100",
  border: "border-gray-200",
  muted: "text-gray-500",
  link: "text-blue-600 hover:text-blue-800",
  cardBg: "bg-white",
  cardShadow: "shadow-lg",
  buttonFilled: "bg-blue-600 hover:bg-blue-700 text-white",
  buttonOutline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  headerBg: "bg-white border-b border-gray-200",
  footerBg: "bg-gray-100",
  iconBg: "bg-gray-100 hover:bg-gray-200",
  iconColor: "text-gray-700",
  themeToggleBg: "bg-gray-200",
  themeToggleColor: "text-gray-700",
};

const darkTheme = {
  background: "bg-gray-900",
  text: "text-gray-100",
  primary: "text-blue-400",
  primaryHover: "text-blue-300",
  secondary: "text-gray-300",
  accent: "bg-blue-500",
  accentHover: "bg-blue-600",
  surface: "bg-gray-800",
  surfaceHover: "bg-gray-700",
  border: "border-gray-700",
  muted: "text-gray-400",
  link: "text-blue-400 hover:text-blue-300",
  cardBg: "bg-gray-800",
  cardShadow: "shadow-xl shadow-gray-900",
  buttonFilled: "bg-blue-500 hover:bg-blue-600 text-white",
  buttonOutline: "border border-blue-500 text-blue-400 hover:bg-gray-700",
  headerBg: "bg-gray-800 border-b border-gray-700",
  footerBg: "bg-gray-800",
  iconBg: "bg-gray-700 hover:bg-gray-600",
  iconColor: "text-gray-300",
  themeToggleBg: "bg-gray-700",
  themeToggleColor: "text-yellow-300",
};

const TechBlog: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Get active theme
  const theme = darkMode ? darkTheme : lightTheme;

  // Toggle dark/light mode
  const toggleTheme = (): void => {
    setDarkMode(!darkMode);
  };

  // Find post by ID
  const getPostById = (id: number): Post | undefined => {
    return SAMPLE_POSTS.find(post => post.id === id);
  };

  // View a specific post
  const viewPost = (id: number): void => {
    const post = getPostById(id);
    if (post) {
      setSelectedPost(post);
      window.scrollTo(0, 0);
    }
  };

  // Return to post list
  const returnToList = (): void => {
    setSelectedPost(null);
  };

  // Apply theme to body
  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${theme.background} ${theme.text} font-sans transition-colors duration-200`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${theme.headerBg} ${theme.cardShadow} transition-colors duration-200`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${theme.accent} rounded-full flex items-center justify-center text-white font-bold text-xl`}>C</div>
            <h1 className="text-2xl font-bold tracking-tight">CodeChronicles</h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme.themeToggleBg} ${theme.themeToggleColor} transition-colors duration-200`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:flex md:gap-8">
        {/* Left Sidebar */}
        <aside className="md:w-72 flex-shrink-0 mb-8 md:mb-0 md:sticky md:top-24 md:self-start">
          <div className={`rounded-xl overflow-hidden ${theme.cardBg} ${theme.cardShadow} transition-colors duration-200`}>
            <div className={`${theme.accent} h-16 w-full`}></div>
            <div className="px-6 pb-6 pt-0 -mt-10">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={AUTHOR.picture}
                  alt={AUTHOR.name}
                  className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 mb-4 object-cover"
                />
                <h2 className="text-xl font-bold">{AUTHOR.name}</h2>
              </div>
              <p className={`text-sm mb-6 ${theme.secondary} text-center`}>
                {AUTHOR.bio}
              </p>
              <div className="flex justify-center space-x-3 mb-6">
                <a href={`https://${AUTHOR.github}`} target="_blank" rel="noopener noreferrer"
                  className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200`}
                  aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href={`https://${AUTHOR.x}`} target="_blank" rel="noopener noreferrer"
                  className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200`}
                  aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href={`https://${AUTHOR.linkedin}`} target="_blank" rel="noopener noreferrer"
                  className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200`}
                  aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${AUTHOR.email}`}
                  className={`p-2 rounded-full ${theme.iconBg} ${theme.iconColor} transition-colors duration-200`}
                  aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${theme.buttonOutline}`}>Architecture</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${theme.buttonOutline}`}>React</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${theme.buttonOutline}`}>TypeScript</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${theme.buttonOutline}`}>DevOps</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="md:flex-grow">
          {selectedPost ? (
            // Single Post View
            <div className={`p-8 rounded-xl ${theme.cardBg} ${theme.cardShadow} transition-colors duration-200`}>
              <button
                onClick={returnToList}
                className={`mb-6 flex items-center ${theme.link} font-medium transition-colors duration-200`}
              >
                <ArrowLeft size={16} className="mr-2" /> Back to all posts
              </button>

              <article>
                <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight`}>
                  {selectedPost.title}
                </h1>

                <div className="flex items-center mb-6">
                  <div className={`mr-6 ${theme.muted}`}>
                    {selectedPost.date}
                  </div>
                  {selectedPost.readTime && (
                    <div className={`${theme.muted}`}>
                      {selectedPost.readTime}
                    </div>
                  )}
                </div>

                {selectedPost.tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedPost.tags.map((tag, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-xs ${theme.buttonOutline}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className={`text-lg mb-8 ${theme.secondary}`}>
                  {selectedPost.description}
                </div>

                <div className={`prose prose-lg ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                  <ReactMarkdown>
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>
              </article>
            </div>
          ) : (
            // Post List View
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest Posts</h2>
                <div className={`px-4 py-2 rounded-lg ${theme.buttonFilled} font-medium transition-colors duration-200`}>
                  Subscribe
                </div>
              </div>

              <div className="space-y-6">
                {SAMPLE_POSTS.map(post => (
                  <div
                    key={post.id}
                    className={`p-6 rounded-xl ${theme.cardBg} ${theme.cardShadow} cursor-pointer transition transform hover:scale-[1.01] duration-200`}
                    onClick={() => viewPost(post.id)}
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

                    <div className="flex items-center mb-3">
                      <div className={`text-sm ${theme.muted}`}>{post.date}</div>
                      {post.readTime && (
                        <>
                          <span className="mx-2 text-gray-400">•</span>
                          <div className={`text-sm ${theme.muted}`}>{post.readTime}</div>
                        </>
                      )}
                    </div>

                    <p className={`mb-4 ${theme.secondary}`}>{post.description}</p>

                    <div className={`mt-2 text-sm font-medium ${theme.primary} flex items-center`}>
                      Read article <ArrowLeft size={14} className="ml-1 rotate-180" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-8 ${theme.footerBg} mt-16 transition-colors duration-200`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`w-8 h-8 ${theme.accent} rounded-full flex items-center justify-center text-white font-bold text-sm mr-2`}>C</div>
              <span className="font-medium">CodeChronicles</span>
            </div>
            <div className={theme.muted}>
              © 2025 CodeChronicles. All rights reserved.
            </div>
            <div className={`mt-4 md:mt-0 text-sm ${theme.muted}`}>
              Built with React, TypeScript, and a passion for clean code.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechBlog;
