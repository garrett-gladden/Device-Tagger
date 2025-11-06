import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/app.css';

const container = document.getElementById('root');
if (!container) {
  // graceful error if root not present
  // eslint-disable-next-line no-console
  console.error('Root element "#root" not found.');
} else {
  const root = createRoot(container);
  root.render(<App />);
}