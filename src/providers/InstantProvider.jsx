import React, { useEffect } from 'react';
import { init } from '@instantdb/react';
import { INSTANT_APP_ID } from '../config/instantdb';

// Initialize Instantd - this must be done at module level
let instantInit;
try {
  instantInit = init({
    appId: INSTANT_APP_ID,
  });
  console.log('✅ Instantd initialized');
} catch (error) {
  console.error('❌ Error initializing Instantd:', error);
  // Create fallback object
  instantInit = {
    useQuery: () => ({ data: null, isLoading: false, error: null }),
    useTransaction: () => ({
      insert: () => console.warn('Instantd not available'),
      update: () => console.warn('Instantd not available'),
      delete: () => console.warn('Instantd not available')
    })
  };
}

// Provider component
export const InstantProvider = ({ children }) => {
  useEffect(() => {
    console.log('🚀 Instantd Provider mounted with app:', INSTANT_APP_ID);
    
    // Hide Instantd branding/logo
    const hideInstantBranding = () => {
      // Hide elements with instant in class/id
      const instantElements = document.querySelectorAll('[class*="instant"], [id*="instant"], [data-instant]');
      instantElements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.height = '0';
        el.style.width = '0';
        el.style.overflow = 'hidden';
      });
      
      // Hide links to instantdb.com
      const instantLinks = document.querySelectorAll('a[href*="instantdb.com"]');
      instantLinks.forEach(link => {
        const parent = link.parentElement;
        if (parent) {
          parent.style.display = 'none';
          parent.style.visibility = 'hidden';
        }
      });
      
      // Hide iframes
      const instantIframes = document.querySelectorAll('iframe[src*="instant"]');
      instantIframes.forEach(iframe => {
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
      });
    };
    
    // Hide immediately
    hideInstantBranding();
    
    // Hide periodically as new elements might be added
    const interval = setInterval(hideInstantBranding, 1000);
    
    // Use MutationObserver to hide new elements as they're added
    const observer = new MutationObserver(hideInstantBranding);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
};

// Export hooks for use in other components
export const useQuery = instantInit?.useQuery || (() => ({ data: null, isLoading: false, error: null }));
export const useTransaction = instantInit?.useTransaction || (() => ({
  insert: () => {},
  update: () => {},
  delete: () => {}
}));

