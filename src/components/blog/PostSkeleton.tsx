import React from 'react';
import { Theme } from '../../hooks/useTheme';

interface PostSkeletonProps {
  theme: Theme;
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ theme }) => {
  return (
    <div className={`p-6 rounded-xl ${theme.cardBg} ${theme.cardShadow} animate-pulse`}>
      {/* Tags skeleton */}
      <div className="flex gap-2 mb-3">
        <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
      
      {/* Meta info skeleton */}
      <div className="flex mb-3">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="mx-2 h-4 w-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      
      {/* Read more skeleton */}
      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-3"></div>
    </div>
  );
};

export default PostSkeleton;