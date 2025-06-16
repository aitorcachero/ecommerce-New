import { useState, useEffect } from 'react';

export const useImageWithRetry = (src, maxRetries = 3) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    setIsLoading(true);
    setHasError(false);

    const handleLoad = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      if (retryCount < maxRetries) {
        // Retry con delay exponencial
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          img.src = src + '?retry=' + (retryCount + 1); // Cache busting
        }, delay);
      } else {
        setIsLoading(false);
        setHasError(true);
      }
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, retryCount, maxRetries]);

  return { imageSrc, isLoading, hasError };
};