import { useState, useEffect, useCallback } from 'react';
import { defaultData } from '../data/defaultData';

const STORAGE_KEY = 'arkaya_site_data';
const DATA_FILE_URL = '/data.json';
const DATA_VERSION_KEY = 'arkaya_data_version';

// Custom event name for same-tab updates
const STORAGE_CHANGE_EVENT = 'localStorageChange';

// Helper to dispatch custom event for same-tab updates
const dispatchStorageChange = () => {
  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
};

// Fetch data from public JSON file
const fetchSharedData = async () => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`${DATA_FILE_URL}?t=${timestamp}`, {
      cache: 'no-cache'
    });
    if (response.ok) {
      const sharedData = await response.json();
      // Store with version timestamp
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sharedData));
      localStorage.setItem(DATA_VERSION_KEY, timestamp.toString());
      return sharedData;
    }
    throw new Error('Failed to fetch shared data');
  } catch (error) {
    console.warn('Could not fetch shared data, using cached or default:', error);
    return null;
  }
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
  const [isLoading, setIsLoading] = useState(true);

  // Load shared data from public JSON file on mount
  useEffect(() => {
    const loadSharedData = async () => {
      setIsLoading(true);
      const sharedData = await fetchSharedData();
      if (sharedData) {
        setData(sharedData);
      }
      setIsLoading(false);
    };

    loadSharedData();

    // Refresh data every 5 minutes to get latest changes
    const refreshInterval = setInterval(async () => {
      const sharedData = await fetchSharedData();
      if (sharedData) {
        setData(prevData => {
          const prevDataString = JSON.stringify(prevData);
          const sharedDataString = JSON.stringify(sharedData);
          if (prevDataString !== sharedDataString) {
            return sharedData;
          }
          return prevData;
        });
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, []);

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

  // Save data to localStorage when it changes (for admin panel)
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [data, isLoading]);

  const updateData = (newData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(defaultData);
  };

  // Export data as JSON file for admin to update public/data.json
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { data, updateData, resetData, exportData, isLoading };
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
