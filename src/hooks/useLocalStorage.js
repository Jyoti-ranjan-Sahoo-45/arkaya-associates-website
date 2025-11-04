import { useState, useEffect, useCallback } from 'react';
import { defaultData } from '../data/defaultData';

const STORAGE_KEY = 'arkaya_site_data';

// Custom event name for same-tab updates
const STORAGE_CHANGE_EVENT = 'localStorageChange';

// Helper to dispatch custom event for same-tab updates
const dispatchStorageChange = () => {
  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
};

export const useLocalStorage = () => {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return defaultData;
    }
  });

  // Load data from localStorage
  const loadData = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Listen for localStorage changes (from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        loadData();
      }
    };

    // Listen for same-tab updates (custom event)
    window.addEventListener(STORAGE_CHANGE_EVENT, loadData);
    
    // Listen for cross-tab updates (storage event)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_CHANGE_EVENT, loadData);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadData]);

  // Save data to localStorage when it changes
  useEffect(() => {
    try {
      const currentStored = localStorage.getItem(STORAGE_KEY);
      const currentDataString = JSON.stringify(data);
      
      // Only save and notify if data actually changed
      if (currentStored !== currentDataString) {
        localStorage.setItem(STORAGE_KEY, currentDataString);
        // Dispatch custom event for same-tab updates
        dispatchStorageChange();
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [data]);

  const updateData = (newData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(defaultData);
  };

  return { data, updateData, resetData };
};

// Helper function to convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
