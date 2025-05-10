import React from 'react';
import { Loader2 } from 'lucide-react'; // Optional: You can use any spinner icon

interface LoadingScreenProps {
  message?: string;
}

const ContentLoader: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dusk w-48 mb-4"></div>

        <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dusk w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-dusk max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-dusk mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-dusk max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-dusk max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-dusk max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>

    </div>
  );
};

export default ContentLoader;
