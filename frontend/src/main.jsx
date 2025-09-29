import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { FictionProvider } from './context/FictionContext.jsx';
import { AdsProvider } from './context/AdsContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FictionProvider>
      <AdsProvider>
        <App />
      </AdsProvider>
    </FictionProvider>
  </StrictMode>
);
