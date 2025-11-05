import { defaultData } from '../data/defaultData';
import { useState, useEffect } from 'react';
import { useQuery, useTransaction } from '../providers/InstantProvider';

export const useInstantDB = () => {
  // Query for ALL siteData records
  const { data, isLoading, error } = useQuery({
    siteData: {}
  });

  const tx = useTransaction();

  // Debug: Log what we're getting from Instantd
  useEffect(() => {
    console.log('🔍 Instantd Query Result:', {
      data,
      isLoading,
      error,
      siteDataCount: data?.siteData?.length || 0
    });
  }, [data, isLoading, error]);

  // Get the main data record
  const siteDataRecords = data?.siteData || [];
  const mainRecord = siteDataRecords.find(item => item.id === 'main') || siteDataRecords[0];

  // State to hold current data
  const [currentData, setCurrentData] = useState(() => {
    // Try localStorage first for instant load
    const stored = localStorage.getItem('arkaya_site_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing localStorage:', e);
      }
    }
    return defaultData;
  });

  // Update when Instantd data changes (real-time sync)
  useEffect(() => {
    if (mainRecord?.data) {
      try {
        const parsed = JSON.parse(mainRecord.data);
        const currentString = JSON.stringify(currentData);
        const parsedString = JSON.stringify(parsed);
        
        // Only update if data actually changed
        if (currentString !== parsedString) {
          console.log('📥 New data received from Instantd!', parsed);
          setCurrentData(parsed);
          localStorage.setItem('arkaya_site_data', JSON.stringify(parsed));
        }
      } catch (e) {
        console.error('Error parsing Instantd data:', e);
      }
    } else if (siteDataRecords.length === 0 && !isLoading) {
      // No data in Instantd yet - use localStorage or default
      const stored = localStorage.getItem('arkaya_site_data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCurrentData(parsed);
        } catch (e) {
          console.error('Error parsing localStorage:', e);
        }
      }
    }
  }, [data, mainRecord, siteDataRecords.length, isLoading]);

  const updateData = async (newData) => {
    const dataString = JSON.stringify(newData);
    
    // Update local state immediately
    setCurrentData(newData);
    localStorage.setItem('arkaya_site_data', dataString);
    
    // Save to Instantd - this will create schema automatically if needed
    try {
      if (mainRecord?.id) {
        // Update existing
        tx.update({
          siteData: {
            id: mainRecord.id,
            data: dataString
          }
        });
        console.log('✅ Updated Instantd record ID:', mainRecord.id);
        console.log('📤 Data sent to Instantd:', newData);
      } else {
        // Create new - schema will be auto-created
        try {
          tx.insert({
            siteData: {
              id: 'main',
              data: dataString
            }
          });
          console.log('✅ Created new Instantd record');
          console.log('📤 Data sent to Instantd:', newData);
        } catch (insertError) {
          console.error('❌ Error inserting to Instantd:', insertError);
          console.error('💡 The siteData schema might not exist yet!');
          console.error('💡 Please create the siteData entity in Instantd dashboard first.');
          console.error('💡 See CREATE_SCHEMA.md for instructions.');
          throw new Error('Schema not found. Please create siteData entity in Instantd dashboard.');
        }
      }
      
      // Wait a bit for transaction to process
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Error saving to Instantd:', error);
      console.error('💡 Make sure the siteData entity exists in your Instantd schema');
      console.error('💡 Check CREATE_SCHEMA.md for setup instructions');
      return Promise.reject(error);
    }
  };

  const resetData = () => {
    updateData(defaultData);
  };

  const refreshData = () => {
    // Data auto-updates via useQuery, but we can force a refresh
    if (mainRecord?.data) {
      try {
        const parsed = JSON.parse(mainRecord.data);
        setCurrentData(parsed);
        localStorage.setItem('arkaya_site_data', JSON.stringify(parsed));
      } catch (e) {
        console.error('Error refreshing:', e);
      }
    }
  };

  return {
    data: currentData,
    updateData,
    resetData,
    refreshData,
    isLoading,
    isSaving: false,
    error
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
