# How to Share Admin Changes with All Users

## Overview
This website uses a **frontend-only shared data system**. All users fetch data from `public/data.json`, which means when you update content in the admin panel, all users will see your changes after you deploy the updated file.

## How It Works

1. **Admin makes changes** → Changes are saved locally in your browser
2. **Admin clicks "Export & Deploy"** → Downloads `data.json` file
3. **Admin replaces file** → Replace `public/data.json` in your repository
4. **Admin redeploys** → Deploy the updated site
5. **All users see changes** → Users automatically fetch new data (within 5 minutes)

## Step-by-Step Instructions

### 1. Make Changes in Admin Panel
- Go to `/admin/panel` and make your changes (text, images, colors, etc.)
- Click **"Save Locally"** to save changes in your browser

### 2. Export Updated Data
- Click **"Export & Deploy"** button
- This will download `data.json` file to your computer

### 3. Update Repository
- Open your repository
- Navigate to `public/data.json`
- Replace the file with the downloaded `data.json`
- Commit and push the changes

### 4. Redeploy
- If using GitHub Pages, Netlify, Vercel, etc., the site will automatically redeploy
- Or manually trigger a redeploy if needed

### 5. Users See Changes
- All users will automatically see the new data within 5 minutes
- The app checks for updates every 5 minutes automatically

## Quick Tips

- **Refresh Button**: Click "Refresh" to load the latest data from the server
- **Cache Busting**: The app automatically adds timestamps to prevent caching issues
- **Offline Support**: If the server data can't be loaded, users see cached data or defaults

## File Structure

```
public/
  └── data.json          ← This file is shared by all users
src/
  └── data/
      └── defaultData.js  ← Default/fallback data
```

## Troubleshooting

**Problem**: Users don't see my changes
- **Solution**: Make sure you replaced `public/data.json` and redeployed

**Problem**: Changes not showing even after deploy
- **Solution**: Wait 5 minutes (auto-refresh interval) or clear browser cache

**Problem**: Downloaded file is empty
- **Solution**: Make sure you clicked "Save Locally" before "Export & Deploy"

## Notes

- Images are stored as base64 in the JSON file (can make file large)
- For better performance with many/large images, consider using a CDN
- The system works entirely in the frontend - no backend needed!

