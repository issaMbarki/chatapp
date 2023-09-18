import { useState, useEffect } from 'react';

const useLoader = (isLoading,loadingDelay) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, loadingDelay);
    }
  }, [isLoading,loadingDelay]);

  return showLoader;
};

export default useLoader;