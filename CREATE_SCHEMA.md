# IMPORTANT: Create siteData Schema in Instantd

## The Problem
The `siteData` entity doesn't exist in your Instantd database, which is why changes aren't syncing.

## ✅ QUICK FIX (2 minutes)

### Step 1: Go to Instantd Dashboard
1. Open: **https://instantdb.com/dashboard**
2. Login to your account
3. Find app: **"Arkaya Associates Website Data"**
   - App ID: `34717869-71ca-4062-8922-48072f44f7d2`

### Step 2: Create Schema
1. Click on your app
2. Go to **"Schema"** tab (or "Data Model")
3. Click **"Add Entity"** or **"New Entity"**
4. Entity Name: **`siteData`** (exactly this name)
5. Add Attribute 1:
   - Name: **`id`**
   - Type: **String**
   - Required: ✅ Yes
   - Indexed: ✅ Yes  
   - Unique: ✅ Yes
6. Add Attribute 2:
   - Name: **`data`**
   - Type: **JSON** (or Text if JSON not available)
   - Required: ✅ Yes
7. Click **Save** or **Create**

### Step 3: Verify
1. Go to admin panel
2. Make a small change
3. Click "Save to Instantd"
4. Check console - should see "✅ Updated Instantd record"
5. Open website in another browser
6. Changes should appear! 🎉

## Alternative Methods

### Method 1: Via Instantd Dashboard (Recommended - See Quick Fix above)

1. Go to https://instantdb.com/dashboard
2. Login to your account
3. Find your app: **Arkaya Associates Website Data**
   - App ID: `34717869-71ca-4062-8922-48072f44f7d2`
4. Click on your app
5. Go to **Schema** tab
6. Click **Add Entity**
7. Name: `siteData`
8. Add these attributes:
   - **Attribute 1:**
     - Name: `id`
     - Type: `string`
     - Required: ✅ Yes
     - Indexed: ✅ Yes
     - Unique: ✅ Yes
   - **Attribute 2:**
     - Name: `data`
     - Type: `json`
     - Required: ✅ Yes
9. Click **Save**

### Method 2: Try Auto-Creation

The schema should auto-create on first save. Try this:

1. Go to admin panel
2. Make a small change (change hero title)
3. Click **"Save to Instantd"**
4. Check browser console (F12)
5. If you see "✅ Created new Instantd record", the schema was auto-created
6. If you see errors, use Method 1 above

## After Creating Schema

Once the schema exists:
1. Go to admin panel
2. Make changes
3. Click "Save to Instantd"
4. Changes will appear on all user websites in real-time! 🎉

## Verify It's Working

1. Open admin panel in Browser 1
2. Open website in Browser 2 (or incognito)
3. Make change in admin panel
4. Click "Save to Instantd"
5. Check Browser 2 - changes should appear within seconds!

