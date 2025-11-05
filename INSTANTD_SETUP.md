# Instantd Setup Instructions

## Schema Creation

The `siteData` entity needs to be created in Instantd. Since the MCP tool has limitations, you can create it manually:

### Option 1: Create via Instantd Dashboard
1. Go to your Instantd dashboard
2. Navigate to your app: `34717869-71ca-4062-8922-48072f44f7d2`
3. Go to Schema section
4. Add a new entity called `siteData` with:
   - `id` (string, required, indexed, unique)
   - `data` (json, required)

### Option 2: First Save Will Create It
The schema will be auto-created when you first save data from the admin panel. Just make sure to:
1. Go to admin panel
2. Make any change
3. Click "Save to Instantd"
4. The schema will be created automatically

## Testing

After setup:
1. Open admin panel in one browser
2. Open the website in another browser (or incognito)
3. Make changes in admin panel
4. Click "Save to Instantd"
5. Changes should appear in the other browser within seconds

## Troubleshooting

If changes aren't appearing:
- Check browser console for errors
- Verify Instantd app ID is correct in `src/config/instantdb.js`
- Make sure InstantProvider is wrapping your app in `src/main.jsx`
- Try refreshing the other browser window

