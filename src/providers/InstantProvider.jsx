import React, { useEffect } from 'react';
import { init } from '@instantdb/react';
import { INSTANT_APP_ID } from '../config/instantdb';

// Initialize Instantd globally
const instantInit = init({
  appId: INSTANT_APP_ID,
});

// Provider component
export const InstantProvider = ({ children }) => {
  useEffect(() => {
    console.log('🚀 Instantd initialized with app:', INSTANT_APP_ID);
  }, []);

  return <>{children}</>;
};

// Export for use in hooks
export const { db, useQuery, useTransaction, Auth, Space } = instantInit;

