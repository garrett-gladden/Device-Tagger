import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './Index.jsx';
import './styles/app.css';

const root = createRoot(document.getElementById('root'));
root.render(<Dashboard />);