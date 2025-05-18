import React from 'react';
import { Loader2 } from 'lucide-react'; // Optional: You can use any spinner icon

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight backdrop-blur-sm dark:bg-secondary">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-gold" />
        <p className="text-gold text-lg">{message}</p>
      </div>
    </div>
    
  );
};

export default LoadingScreen;
