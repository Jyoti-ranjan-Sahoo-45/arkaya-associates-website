# 🎨 Color Customization Guide

## Overview
The Arkaya Associates website now includes a comprehensive color customization system that allows admins to change the entire color scheme of the website from the admin panel.

## Accessing Color Settings

1. Login to admin panel: `http://localhost:3000/admin`
2. Navigate to **"Colors & Theme"** in the sidebar (palette icon)
3. You'll see two sections:
   - **Main Theme Colors**
   - **Section Background Colors**

## Main Theme Colors

### Primary Color (Solar Yellow)
- **Default**: #FBBF24
- **Used for**: Buttons, highlights, accents, navbar admin button
- **Effect**: Changes all primary interactive elements

### Secondary Color (Solar Green)
- **Default**: #15803D
- **Used for**: CTA buttons, action buttons, icons
- **Effect**: Changes call-to-action elements

### Accent Color (Orange)
- **Default**: #F59E0B
- **Used for**: Gradient endings, hover effects
- **Effect**: Adds variety to gradients

## Section Background Colors

Each section of the website can have its own background color:

### 1. Hero Section
- **Default**: #FBBF24 (with gradient to accent)
- First thing visitors see
- Creates gradient effect with accent color

### 2. About Section
- **Default**: #FFFFFF (White)
- Clean background for text content

### 3. Services Section
- **Default**: #F9FAFB (Light Gray)
- Subtle contrast from white sections

### 4. Counters Section
- **Default**: #FBBF24 (with gradient)
- Eye-catching statistics display
- Creates gradient effect with accent color

### 5. Projects Section
- **Default**: #FFFFFF (White)
- Clean showcase for project cards

### 6. Gallery Section
- **Default**: #F9FAFB (Light Gray)
- Subtle background for images

### 7. Contact Section
- **Default**: #FFFFFF (White)
- Professional form background

### 8. Footer Section
- **Default**: #111827 (Dark Gray)
- Professional footer appearance

## How to Change Colors

### Method 1: Color Picker
1. Click on the colored square next to any color field
2. Select your desired color from the picker
3. Color updates in real-time in the preview

### Method 2: Hex Code Input
1. Type or paste a hex color code (e.g., #FF5733)
2. Press Enter or click outside the field
3. Color updates immediately

## Color Scheme Tips

### Professional Solar Company
```
Primary: #FBBF24 (Yellow)
Secondary: #15803D (Green)
Accent: #F59E0B (Orange)
```

### Modern Blue Scheme
```
Primary: #3B82F6 (Blue)
Secondary: #1D4ED8 (Dark Blue)
Accent: #60A5FA (Light Blue)
```

### Eco-Friendly Green
```
Primary: #10B981 (Green)
Secondary: #059669 (Dark Green)
Accent: #34D399 (Light Green)
```

### Professional Corporate
```
Primary: #6366F1 (Indigo)
Secondary: #4F46E5 (Purple)
Accent: #818CF8 (Light Indigo)
```

## Best Practices

### Contrast
- Ensure text remains readable on colored backgrounds
- Use light backgrounds (#FFFFFF, #F9FAFB) for dark text
- Use dark backgrounds (#111827) for light text

### Consistency
- Keep related sections in similar color families
- Alternate between light and medium backgrounds
- Use gradients sparingly for impact

### Brand Identity
- Use your company's brand colors
- Maintain consistency across all sections
- Test colors on different devices

### Accessibility
- Maintain sufficient contrast (WCAG AA: 4.5:1 for text)
- Avoid very bright or neon colors
- Test with colorblind simulation tools

## Saving Changes

1. After selecting all desired colors
2. Click the **"Save Changes"** button at the top right
3. Changes are saved to localStorage
4. Refresh the main website to see updates

## Resetting Colors

1. Click **"Reset Defaults"** button in admin panel
2. Confirm the reset action
3. All colors return to original solar theme

## Technical Notes

- Colors are stored in localStorage as hex codes
- Changes apply immediately after saving
- Gradients automatically blend selected colors
- All sections support any valid hex color code

## Troubleshooting

### Colors not updating?
- Make sure you clicked "Save Changes"
- Refresh the main website page
- Clear browser cache if needed

### Text not readable?
- Adjust background color to improve contrast
- Use lighter backgrounds for dark text
- Use darker backgrounds for light text

### Want to experiment?
- Make changes and test without saving
- Refresh admin panel to discard changes
- Use "Reset Defaults" to start over

---

**Need Help?** Contact support or refer to the main README.md file.
