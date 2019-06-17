import { useState, useEffect } from "react";

const useThrottle = (value, delay) => {
  const [throttledTerm, updateThrottledTerm] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      updateThrottledTerm(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return throttledTerm;
};

export default useThrottle;
