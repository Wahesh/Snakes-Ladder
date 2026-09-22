import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { PosterImagesProvider } from './context/PosterImageContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PosterImagesProvider>
      <App />
    </PosterImagesProvider>
  </StrictMode>,
);
