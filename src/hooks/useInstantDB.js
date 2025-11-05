import { useQuery, useTransaction } from '@instantdb/react';
import { defaultData } from '../data/defaultData';

export const useInstantDB = () => {
  // Query for site data
  const { data, isLoading } = useQuery({
    siteData: {
      $: {
        where: { id: 'main' }
      }
    }
  });

  const tx = useTransaction();

  // Get current data or default
  let currentData = defaultData;
  
  if (data?.siteData?.[0]?.data) {
    try {
      currentData = JSON.parse(data.siteData[0].data);
    } catch (e) {
      console.error('Error parsing Instantd data:', e);
      // Fallback to localStorage
      const stored = localStorage.getItem('arkaya_site_data');
      if (stored) {
        try {
          currentData = JSON.parse(stored);
        } catch (e2) {
          console.error('Error parsing localStorage data:', e2);
        }
      }
    }
  } else {
    // Fallback to localStorage if no Instantd data
    const stored = localStorage.getItem('arkaya_site_data');
    if (stored) {
      try {
        currentData = JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing localStorage data:', e);
      }
    }
  }

  const updateData = (newData) => {
    const dataString = JSON.stringify(newData);
    
    // Save to localStorage immediately for fast access
    localStorage.setItem('arkaya_site_data', dataString);
    
    // Save to Instantd
    if (data?.siteData?.[0]) {
      // Update existing
      tx.update({
        siteData: {
          id: 'main',
          data: dataString
        }
      });
    } else {
      // Create new
      tx.insert({
        siteData: {
          id: 'main',
          data: dataString
        }
      });
    }
  };

  const resetData = () => {
    updateData(defaultData);
  };

  const refreshData = () => {
    // Data will auto-refresh via useQuery
    // Just reload to be sure
    window.location.reload();
  };

  return {
    data: currentData,
    updateData,
    resetData,
    refreshData,
    isLoading,
    isSaving: false
  };
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
