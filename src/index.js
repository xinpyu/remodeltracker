import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Initialize Vercel tools directly
if (typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1') {

    // Manually inject Vercel scripts to avoid module resolution issues
    try {
        // Speed Insights
        const speedInsightsScript = document.createElement('script');
        speedInsightsScript.src = '/_vercel/speed-insights/script.js';
        speedInsightsScript.defer = true;
        document.head.appendChild(speedInsightsScript);

        // Web Analytics
        const analyticsScript = document.createElement('script');
        analyticsScript.src = '/_vercel/insights/script.js';
        analyticsScript.defer = true;
        document.head.appendChild(analyticsScript);
    } catch (e) {
        console.log('Failed to inject Vercel scripts:', e);
    }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
); 