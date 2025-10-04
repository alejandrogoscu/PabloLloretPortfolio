import { useState, useEffect } from 'react';

const useBackendReady = (url) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(() => setTimeout(() => serReady(true), 800));
      .catch(() => setReady(true))
  }, [url]);

  return ready
};

export default useBackendReady