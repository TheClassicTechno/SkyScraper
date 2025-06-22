'use client';

import { useEffect } from 'react';

const WindFieldLoader: React.FC = () => {
  useEffect(() => {
    // Load the wind field library
    const loadWindField = async () => {
      try {
        // Check if already loaded
        if ((window as any).L && (window as any).L.WindLayer) {
          console.log('Wind field library already loaded');
          return;
        }

        // Wait for Leaflet to be available
        let attempts = 0;
        const maxAttempts = 10;
        
        const waitForLeaflet = () => {
          if ((window as any).L) {
            // Load the wind field library
            import('leaflet-wind').then((windModule) => {
              console.log('Wind module loaded:', windModule);
              
              // Make it available globally
              if ((window as any).L && windModule.WindLayer) {
                (window as any).L.WindLayer = windModule.WindLayer;
                console.log('✅ Wind field library loaded successfully');
              } else {
                console.warn('❌ WindLayer not found in module');
              }
            }).catch((error) => {
              console.warn('❌ Failed to load wind field library:', error);
            });
          } else if (attempts < maxAttempts) {
            attempts++;
            console.log(`Waiting for Leaflet... (attempt ${attempts}/${maxAttempts})`);
            setTimeout(waitForLeaflet, 500);
          } else {
            console.warn('❌ Leaflet not available after maximum attempts');
          }
        };

        waitForLeaflet();
      } catch (error) {
        console.warn('❌ Error in wind field loader:', error);
      }
    };

    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(loadWindField, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default WindFieldLoader; 