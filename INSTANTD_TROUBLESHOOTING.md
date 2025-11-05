# Instantd Troubleshooting Guide

## Issue: Changes in Admin Panel Not Appearing on User Websites

### Step 1: Check Browser Console

Open browser console (F12) and look for:
- ✅ "✅ Updated Instantd record" - Data was saved
- ✅ "📥 New data received from Instantd!" - Data was received
- ❌ Any error messages

### Step 2: Verify Schema Exists

The `siteData` entity needs to exist in Instantd. If it doesn't exist, the first save will create it automatically.

### Step 3: Test the Connection

1. Open admin panel in one browser
2. Make a small change (e.g., change hero title)
3. Click "Save to Instantd"
4. Check console for "✅ Updated Instantd record"
5. Open website in another browser/incognito
6. Check console for "📥 New data received from Instantd!"

### Step 4: Manual Schema Creation (if needed)

If automatic creation doesn't work, you can create the schema manually:

1. Go to Instantd dashboard: https://instantdb.com
2. Navigate to your app: `34717869-71ca-4062-8922-48072f44f7d2`
3. Go to Schema section
4. Add entity: `siteData`
5. Add attributes:
   - `id` (string, required, indexed, unique)
   - `data` (json, required)

### Step 5: Check Permissions

Make sure permissions allow:
- Read: Everyone can read
- Write: Admin can write

### Common Issues:

**Issue:** Console shows "Error saving to Instantd"
- **Solution:** Schema might not exist - create it manually

**Issue:** Data saves but doesn't appear on other browsers
- **Solution:** Check if useQuery is properly subscribed - refresh both browsers

**Issue:** No data in Instantd
- **Solution:** Make sure you click "Save to Instantd" after making changes

### Debugging Commands:

Open browser console and run:
```javascript
// Check if Instantd is connected
console.log('Instantd data:', localStorage.getItem('arkaya_site_data'));

// Force refresh
window.location.reload();
```

