import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Import our wrapper component instead
import SpeedInsightsWrapper from './components/SpeedInsightsWrapper';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
        <SpeedInsightsWrapper />
    </BrowserRouter>
); 