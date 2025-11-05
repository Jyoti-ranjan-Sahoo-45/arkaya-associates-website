// Initialize Instantd with default data
// This will be called once to set up the database

import { defaultData } from '../data/defaultData';
import { INSTANT_APP_ID } from '../config/instantdb';

export const initializeInstantDB = async () => {
  try {
    // The schema will be created automatically when we first insert data
    // This happens via the useInstantDB hook when admin saves
    console.log('Instantd will initialize automatically on first save');
    return true;
  } catch (error) {
    console.error('Error initializing Instantd:', error);
    return false;
  }
};

