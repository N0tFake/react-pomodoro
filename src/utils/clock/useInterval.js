import { useEffect, useRef } from 'react';

export const UseInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    if (delay !== null) {
      savedCallback.current = callback;
    }
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
