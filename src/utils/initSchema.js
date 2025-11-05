// Script to initialize Instantd schema
// This will be called when admin first saves to create the schema

import { INSTANT_APP_ID } from '../config/instantdb';

export const initializeSchema = async () => {
  try {
    // Try to create schema via API
    const response = await fetch(`https://api.instantdb.com/db/${INSTANT_APP_ID}/schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        additions: {
          entities: {
            siteData: {
              attrs: {
                id: {
                  type: 'string',
                  required: true,
                  indexed: true,
                  unique: true
                },
                data: {
                  type: 'json',
                  required: true
                }
              }
            }
          }
        }
      })
    });

    if (response.ok) {
      console.log('✅ Schema created successfully!');
      return true;
    } else {
      console.error('Schema creation failed:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error creating schema:', error);
    return false;
  }
};

// Note: Instantd React SDK should auto-create schema on first insert
// But if it doesn't work, create manually via dashboard

