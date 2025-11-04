# Arkaya Associates LLP - Solar Solutions Website

A modern, professional frontend-only React.js website for ARKAYA ASSOCIATES LLP, a leading solar EPC company in Odisha.

## 🌟 Features

- **Frontend-Only Architecture**: No backend required, all data stored in localStorage
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Admin Panel**: Full content management system with hardcoded credentials
- **Dynamic Content**: Edit all website content from the admin panel
- **EmailJS Integration**: Contact form sends emails directly
- **Smooth Animations**: Framer Motion animations throughout
- **Modern UI**: Tailwind CSS with custom solar theme

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to `http://localhost:3000`

## 📧 EmailJS Setup

To enable the contact form:

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Set up email service and template
3. Update credentials in `src/components/ContactForm.jsx`:
   ```javascript
   const serviceId = 'YOUR_SERVICE_ID';
   const templateId = 'YOUR_TEMPLATE_ID';
   const publicKey = 'YOUR_PUBLIC_KEY';
   ```

## 🔐 Admin Access

**Login URL**: `http://localhost:3000/admin`

**Credentials**:
- Username: `admin`
- Password: `Admin@123`

### Admin Features

- ✏️ Edit Hero section (title, subtitle, banner image)
- 📝 Modify About content
- 🛠️ Add/Edit/Delete Services
- 📊 Update counter statistics
- 📁 Manage Projects with images
- 🖼️ Upload/Remove gallery images
- 📞 Edit contact information
- 🎨 Change logo and branding
- 💾 All changes saved to localStorage
- 🔄 Reset to default data option

## 🏗️ Project Structure

```
D:\ARKAYA ASSOCIATES\
├── public/
│   └── solar-icon.svg
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ImageUploader.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Counters.jsx
│   │   ├── Projects.jsx
│   │   ├── Gallery.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Footer.jsx
│   │   └── Home.jsx
│   ├── data/
│   │   └── defaultData.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Theme Colors

- **Solar Yellow**: #FBBF24
- **Solar Green**: #15803D
- **White**: #FFFFFF

## 📦 Build for Production

```bash
npm run build
```

Build files will be in the `dist/` folder, ready for deployment.

## 🌐 Deployment

Deploy to any static hosting service:

- **Netlify**: Drag and drop `dist` folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 📱 Features Overview

### User-Facing Website
- ✨ Modern hero section with animations
- 📖 Comprehensive about section
- 🛠️ Services showcase
- 📊 Live counter animations
- 📁 Project portfolio
- 🖼️ Image gallery with lightbox
- 📧 Contact form with EmailJS
- 📱 Fully responsive design

### Admin Panel
- 🔒 Secure login (sessionStorage)
- 🎛️ Intuitive dashboard
- ✏️ WYSIWYG content editing
- 📸 Image upload to base64
- 💾 Persistent data storage
- 🔄 One-click data reset
- 📊 Live preview of changes

## 🔧 Customization

### Modify Default Data
Edit `src/data/defaultData.js` to change initial content.

### Change Theme Colors
Edit `tailwind.config.js` to customize colors.

### Add More Sections
Create new components and add to `Home.jsx`.

## 📝 Company Information

**Company Name**: ARKAYA ASSOCIATES LLP  
**Tagline**: A Complete Solar Solution  
**Motto**: ECO FRIENDLY AND SUSTAINABLE

**Contact**:
- 📍 Plot No.-1351/3440, Lane-2, Sai Vihar, GGP Colony, Bhubaneswar, Odisha – 751025
- 📞 7325971132 / 8280714447
- 📧 info@arkayaassociates.com
- 🌐 www.arkayaassociates.com

**Certifications**:
- ISO 9001:2015 Certified
- OREDA Registered
- MNRE Compliant

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Contact the development team

## 📄 License

© 2025 Arkaya Associates LLP | All Rights Reserved

---

**Built with ❤️ for sustainable energy solutions**
