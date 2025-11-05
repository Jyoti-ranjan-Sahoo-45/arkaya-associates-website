// Debug script to check Instantd connection and create schema if needed
import { INSTANT_APP_ID } from '../config/instantdb';

export const checkInstantDBConnection = async () => {
  console.log('🔍 Checking Instantd connection...');
  console.log('App ID:', INSTANT_APP_ID);
  
  try {
    // Check if we can query
    const response = await fetch(`https://api.instantdb.com/db/${INSTANT_APP_ID}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ siteData { id data } }'
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Instantd connection successful');
      console.log('Current data:', result);
      return true;
    } else {
      console.error('❌ Instantd connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Error checking Instantd:', error);
    return false;
  }
};

// Run check on import (for debugging)
if (typeof window !== 'undefined') {
  // Uncomment to debug:
  // checkInstantDBConnection();
}

