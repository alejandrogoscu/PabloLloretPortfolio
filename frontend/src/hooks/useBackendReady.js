import { useState, useEffect } from 'react';

const useBackendReady = (urls = []) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all(urls.map((url) => fetch(url).then((res) => (res.ok ? res.json() : Promise.reject()))))
      .then(() => setTimeout(() => setReady(true), 800))
      .catch(() => setReady(true));
  }, [urls]);

  return ready;
};

export default useBackendReady;
