import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { FictionProvider } from './context/FictionContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FictionProvider>
      <App />
    </FictionProvider>
  </StrictMode>
);
