# 🚀 GoDaddy Deployment Guide for Arkaya Associates

## 📦 Build Completed Successfully!

Your production files are ready in the `dist` folder.

---

## 🌐 Deployment Methods for GoDaddy

### Method 1: cPanel File Manager (Recommended for Beginners)

#### Step 1: Access cPanel
1. Log in to your GoDaddy account
2. Go to **My Products** → **Web Hosting**
3. Click **Manage** next to your hosting plan
4. Click **cPanel Admin**

#### Step 2: Prepare File Manager
1. In cPanel, find and click **File Manager**
2. Navigate to `public_html` folder
3. **Delete all existing files** in public_html (or backup if needed)

#### Step 3: Upload Website Files
1. Open the `dist` folder on your computer (D:\ARKAYA ASSOCIATES\dist)
2. Select **ALL files and folders** inside the dist folder:
   - `index.html`
   - `assets` folder
   - `solar-icon.svg`
3. In cPanel File Manager, click **Upload**
4. Drag and drop all the files from the dist folder
5. Wait for upload to complete (should take 1-2 minutes)

#### Step 4: Verify Deployment
1. Visit your domain: `www.arkayaassociates.com`
2. The website should now be live!

---

### Method 2: FTP Upload (Advanced)

#### Step 1: Get FTP Credentials
1. In GoDaddy cPanel, go to **FTP Accounts**
2. Note your FTP credentials:
   - FTP Server: `ftp.yourdomain.com`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

#### Step 2: Use FTP Client
1. Download **FileZilla** (free): https://filezilla-project.org/
2. Install and open FileZilla
3. Enter your FTP credentials:
   - Host: `ftp.arkayaassociates.com`
   - Username: [Your FTP username]
   - Password: [Your FTP password]
   - Port: 21
4. Click **Quickconnect**

#### Step 3: Upload Files
1. Navigate to `public_html` folder on the right panel
2. Delete all existing files in public_html
3. Navigate to `D:\ARKAYA ASSOCIATES\dist` on the left panel
4. Select all files and folders inside dist
5. Drag them to the right panel (public_html)
6. Wait for upload to complete

---

## 🔧 Important Configuration Steps

### Create .htaccess File (Required for React Router)

Since your website uses React Router, you need to create an `.htaccess` file:

1. In cPanel File Manager, go to `public_html`
2. Click **+ File** button
3. Name it: `.htaccess`
4. Right-click the file → **Edit**
5. Paste this code:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Compress files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

6. Click **Save Changes**

---

## 📧 EmailJS Configuration (Important!)

Your contact form uses EmailJS. Before going live:

1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials:
   - Service ID
   - Template ID
   - Public Key

5. **Update the code:**
   - You'll need to edit `src/components/ContactForm.jsx`
   - Replace placeholder values with real ones
   - Rebuild: `npm run build`
   - Re-upload to GoDaddy

---

## 🔒 SSL Certificate (HTTPS)

### Enable SSL in GoDaddy:
1. In GoDaddy cPanel, find **SSL/TLS Status**
2. Click **Run AutoSSL**
3. Wait 10-15 minutes for activation
4. Your site will have HTTPS! 🔒

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at your domain
- [ ] All pages work (Home, About, Services, etc.)
- [ ] Admin login works (/admin)
- [ ] Images and icons display correctly
- [ ] Mobile responsive design works
- [ ] Contact form configured with EmailJS
- [ ] SSL certificate active (HTTPS)
- [ ] Clear localStorage on first visit

---

## 🎨 First-Time Setup on Live Site

After deployment, visit your website and:

1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Refresh the page
4. The blue theme will appear correctly!

Or use Admin Panel:
1. Go to `yourdomain.com/admin`
2. Login: `admin` / `Admin@123`
3. Click "Reset Defaults"
4. ⚠️ **IMPORTANT:** Change admin password from Colors & Theme section!

---

## 🔄 Updating Your Website

Whenever you make changes:

1. Make changes locally
2. Run: `npm run build`
3. Upload contents of `dist` folder to GoDaddy
4. Clear browser cache (Ctrl + F5)

---

## 🆘 Troubleshooting

### Website shows blank page
- Check browser console for errors
- Verify all files uploaded correctly
- Check .htaccess file exists

### Admin panel not working
- Clear browser cache
- Check URL: `yourdomain.com/admin`
- Verify .htaccess file is correct

### Images not loading
- Check file paths are correct
- Verify all files in `dist/assets` uploaded
- Check image permissions in cPanel (should be 644)

### Contact form not working
- Configure EmailJS credentials
- Check browser console for errors
- Test EmailJS separately first

---

## 📱 Testing Checklist

Test your live website on:
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Mobile Chrome
- ✅ Mobile Safari
- ✅ Tablet devices

---

## 🎉 You're All Set!

Your Arkaya Associates website is now live on GoDaddy!

**Live Site:** https://www.arkayaassociates.com
**Admin Panel:** https://www.arkayaassociates.com/admin

---

## 📞 Need Help?

- GoDaddy Support: 1-480-505-8877
- cPanel Documentation: https://www.godaddy.com/help/cpanel
- EmailJS Setup: https://www.emailjs.com/docs/

---

**🎊 Congratulations on your deployment!**

Built with ❤️ for sustainable solar energy solutions.
