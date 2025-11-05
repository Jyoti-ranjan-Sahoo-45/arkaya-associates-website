import React from 'react';
import { init } from '@instantdb/react';
import { INSTANT_APP_ID } from '../config/instantdb';

// Initialize Instantd
init({
  appId: INSTANT_APP_ID,
});

// Provider component (Instantd initializes globally, so this is just a wrapper)
export const InstantProvider = ({ children }) => {
  return <>{children}</>;
};

