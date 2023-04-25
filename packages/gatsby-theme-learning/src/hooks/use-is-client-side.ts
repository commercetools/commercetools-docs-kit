import { useEffect, useState } from 'react';

const useIsClientSide = () => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return { isClientSide };
};

export default useIsClientSide;
