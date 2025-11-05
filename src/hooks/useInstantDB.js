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
  const mainRecord = siteDataRecords.find(item => item.recordId === 'main') || siteDataRecords[0];

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
    console.log('🔄 Checking for Instantd updates...', {
      hasMainRecord: !!mainRecord,
      hasData: !!mainRecord?.data,
      recordsCount: siteDataRecords.length,
      isLoading
    });

    if (mainRecord?.data) {
      try {
        const parsed = JSON.parse(mainRecord.data);
        const currentString = JSON.stringify(currentData);
        const parsedString = JSON.stringify(parsed);
        
        // Only update if data actually changed
        if (currentString !== parsedString) {
          console.log('📥 ✨ NEW DATA RECEIVED FROM INSTANTD! ✨');
          console.log('📥 Changes detected, updating...');
          setCurrentData(parsed);
          localStorage.setItem('arkaya_site_data', JSON.stringify(parsed));
          console.log('✅ Data updated successfully!');
        } else {
          console.log('✅ Data is up to date (no changes detected)');
        }
      } catch (e) {
        console.error('❌ Error parsing Instantd data:', e);
      }
    } else if (siteDataRecords.length === 0 && !isLoading) {
      console.log('⚠️ No data found in Instantd, using localStorage');
      // No data in Instantd yet - use localStorage or default
      const stored = localStorage.getItem('arkaya_site_data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCurrentData(parsed);
          console.log('✅ Loaded data from localStorage');
        } catch (e) {
          console.error('❌ Error parsing localStorage:', e);
        }
      }
    }
  }, [data, mainRecord, siteDataRecords.length, isLoading, currentData]);

  const updateData = async (newData) => {
    const dataString = JSON.stringify(newData);
    
    // Update local state immediately
    setCurrentData(newData);
    localStorage.setItem('arkaya_site_data', dataString);
    
    // Save to Instantd
    try {
      if (mainRecord?.id) {
        // Update existing
        console.log('🔄 Updating existing record:', mainRecord.id);
        tx.update({
          siteData: {
            id: mainRecord.id,
            recordId: 'main',
            data: dataString
          }
        });
        console.log('✅ Update transaction sent to Instantd');
        console.log('📤 Data sent:', { id: mainRecord.id, recordId: 'main', dataSize: dataString.length });
      } else {
        // Create new
        console.log('🆕 Creating new record');
        tx.insert({
          siteData: {
            recordId: 'main',
            data: dataString
          }
        });
        console.log('✅ Insert transaction sent to Instantd');
        console.log('📤 Data sent:', { recordId: 'main', dataSize: dataString.length });
      }
      
      // Wait for transaction to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After saving, check if data appears in query
      console.log('🔍 Checking if data was saved...');
      console.log('🔍 Current query data:', {
        siteDataCount: data?.siteData?.length || 0,
        hasMainRecord: !!mainRecord,
        mainRecordId: mainRecord?.id,
        mainRecordRecordId: mainRecord?.recordId
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Error in updateData:', error);
      console.error('💡 The siteData schema might not exist!');
      console.error('💡 Create it in Instantd dashboard: https://instantdb.com/dashboard');
      console.error('💡 See CREATE_SCHEMA.md for step-by-step instructions');
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
