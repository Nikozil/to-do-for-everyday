import { useEffect, useState } from 'react';

const useIsMounted = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
