import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

import { initApp } from './app/initApp';

const root = createRoot(document.getElementById('root') as HTMLElement);

initApp(root);