// components/LoadingOverlay.js

import { useEffect, useState } from 'react';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const showLoading = () => {
      setIsLoading(true);
      // Simulate loading process (e.g., fetch data)
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Simulate loading for 3 seconds
    };

    // Example: Trigger loading when component mounts (for demonstration)
    showLoading();

  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;