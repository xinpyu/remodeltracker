import React, { useEffect, useState } from 'react';

// A wrapper component that conditionally renders SpeedInsights
// This helps avoid build-time import errors
export const SpeedInsightsWrapper = () => {
  const [SpeedInsightsComponent, setSpeedInsightsComponent] = useState(null);

  useEffect(() => {
    // Only load in production or when deployed to Vercel
    const isProduction = process.env.NODE_ENV === 'production';
    const isVercel = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
    
    if (isProduction || isVercel) {
      // Dynamically import the component
      import('@vercel/speed-insights')
        .then(module => {
          setSpeedInsightsComponent(() => module.SpeedInsights);
        })
        .catch(err => {
          console.warn('Speed Insights could not be loaded:', err);
        });
    }
  }, []);

  // Render the component if it was loaded successfully
  return SpeedInsightsComponent ? <SpeedInsightsComponent /> : null;
};

export default SpeedInsightsWrapper; 