import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Plus, Trash2, Edit, Palette, Users, Download, RefreshCw } from 'lucide-react';
import Sidebar from './Sidebar';
import ImageUploader from './ImageUploader';
import { useInstantDB } from '../../hooks/useInstantDB';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { data, updateData, resetData, refreshData } = useInstantDB();
  const [activeSection, setActiveSection] = useState('hero');
  const [editData, setEditData] = useState(data);
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    setEditData(data);
  }, [data]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('Saving to Instantd...');
    
    try {
      await updateData(editData);
      setSaveMessage('✅ Changes saved! All users will see updates in real-time.');
      setTimeout(() => setSaveMessage(''), 5000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Error saving. Check console for details.');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefreshData = () => {
    refreshData();
    setSaveMessage('Refreshing data from Instantd...');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      resetData();
      setSaveMessage('Data reset to defaults!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Hero Section Editor
  const renderHeroEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Hero Section</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={editData.hero.title}
          onChange={(e) => setEditData({...editData, hero: {...editData.hero, title: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={editData.hero.subtitle}
          onChange={(e) => setEditData({...editData, hero: {...editData.hero, subtitle: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={editData.hero.description}
          onChange={(e) => setEditData({...editData, hero: {...editData.hero, description: e.target.value}})}
          rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
        <input
          type="text"
          value={editData.hero.cta}
          onChange={(e) => setEditData({...editData, hero: {...editData.hero, cta: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <ImageUploader
        label="Hero Banner Image"
        currentImage={editData.hero.banner}
        onUpload={(base64) => setEditData({...editData, hero: {...editData.hero, banner: base64}})}
      />
    </div>
  );

  // About Section Editor
  const renderAboutEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">About Section</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
        <input
          type="text"
          value={editData.about.heading}
          onChange={(e) => setEditData({...editData, about: {...editData.about, heading: e.target.value}})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">About Text</label>
        <textarea
          value={editData.about.text}
          onChange={(e) => setEditData({...editData, about: {...editData.about, text: e.target.value}})}
          rows="8"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
        <input
          type="text"
          value={editData.about.certifications}
          onChange={(e) => setEditData({...editData, about: {...editData.about, certifications: e.target.value}})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>
    </div>
  );

  // Services Section Editor
  const renderServicesEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Services</h2>
        <button
          onClick={() => {
            const newService = {
              id: Date.now(),
              title: 'New Service',
              desc: 'Service description',
              icon: '⚙️'
            };
            setEditData({...editData, services: [...editData.services, newService]});
          }}
          className="flex items-center space-x-2 bg-solar-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-4">
        {editData.services.map((service, index) => (
          <div key={service.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Service {index + 1}</h3>
              <button
                onClick={() => {
                  const newServices = editData.services.filter(s => s.id !== service.id);
                  setEditData({...editData, services: newServices});
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                <input
                  type="text"
                  value={service.icon}
                  onChange={(e) => {
                    const newServices = [...editData.services];
                    newServices[index].icon = e.target.value;
                    setEditData({...editData, services: newServices});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...editData.services];
                    newServices[index].title = e.target.value;
                    setEditData({...editData, services: newServices});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={service.desc}
                onChange={(e) => {
                  const newServices = [...editData.services];
                  newServices[index].desc = e.target.value;
                  setEditData({...editData, services: newServices});
                }}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Counters Section Editor
  const renderCountersEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Counters</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Projects Completed</label>
          <input
            type="number"
            value={editData.counters.projects}
            onChange={(e) => setEditData({...editData, counters: {...editData.counters, projects: parseInt(e.target.value)}})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Happy Clients</label>
          <input
            type="number"
            value={editData.counters.clients}
            onChange={(e) => setEditData({...editData, counters: {...editData.counters, clients: parseInt(e.target.value)}})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">MW Installed</label>
          <input
            type="number"
            value={editData.counters.mw}
            onChange={(e) => setEditData({...editData, counters: {...editData.counters, mw: parseInt(e.target.value)}})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input
            type="number"
            value={editData.counters.years}
            onChange={(e) => setEditData({...editData, counters: {...editData.counters, years: parseInt(e.target.value)}})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
          />
        </div>
      </div>
    </div>
  );

  // Projects Section Editor
  const renderProjectsEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={() => {
            const newProject = {
              id: Date.now(),
              title: 'New Project',
              desc: 'Project description',
              location: 'Location',
              capacity: '0 kW',
              img: '',
              video: ''
            };
            setEditData({...editData, projects: [...editData.projects, newProject]});
          }}
          className="flex items-center space-x-2 bg-solar-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {editData.projects.map((project, index) => (
          <div key={project.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Project {index + 1}</h3>
              <button
                onClick={() => {
                  const newProjects = editData.projects.filter(p => p.id !== project.id);
                  setEditData({...editData, projects: newProjects});
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...editData.projects];
                    newProjects[index].title = e.target.value;
                    setEditData({...editData, projects: newProjects});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) => {
                    const newProjects = [...editData.projects];
                    newProjects[index].location = e.target.value;
                    setEditData({...editData, projects: newProjects});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Capacity</label>
                <input
                  type="text"
                  value={project.capacity}
                  onChange={(e) => {
                    const newProjects = [...editData.projects];
                    newProjects[index].capacity = e.target.value;
                    setEditData({...editData, projects: newProjects});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <input
                  type="text"
                  value={project.desc}
                  onChange={(e) => {
                    const newProjects = [...editData.projects];
                    newProjects[index].desc = e.target.value;
                    setEditData({...editData, projects: newProjects});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <ImageUploader
              label="Project Image"
              currentImage={project.img}
              onUpload={(base64) => {
                const newProjects = [...editData.projects];
                newProjects[index].img = base64;
                setEditData({...editData, projects: newProjects});
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Gallery Section Editor
  const renderGalleryEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
        <button
          onClick={() => {
            const newItem = {
              id: Date.now(),
              type: 'image',
              src: '',
              caption: 'New Item'
            };
            setEditData({...editData, gallery: [...editData.gallery, newItem]});
          }}
          className="flex items-center space-x-2 bg-solar-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {editData.gallery.map((item, index) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 text-sm">Item {index + 1}</h3>
              <button
                onClick={() => {
                  const newGallery = editData.gallery.filter(g => g.id !== item.id);
                  setEditData({...editData, gallery: newGallery});
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Caption</label>
              <input
                type="text"
                value={item.caption}
                onChange={(e) => {
                  const newGallery = [...editData.gallery];
                  newGallery[index].caption = e.target.value;
                  setEditData({...editData, gallery: newGallery});
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <ImageUploader
              label="Upload"
              currentImage={item.src}
              onUpload={(base64) => {
                const newGallery = [...editData.gallery];
                newGallery[index].src = base64;
                setEditData({...editData, gallery: newGallery});
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Leadership Section Editor
  const renderLeadershipEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Leadership Team</h2>
        <button
          onClick={() => {
            const newLeader = {
              id: Date.now(),
              name: 'New Leader',
              role: 'Position',
              photo: ''
            };
            setEditData({
              ...editData,
              leadership: [...(editData.leadership || []), newLeader]
            });
          }}
          className="flex items-center space-x-2 bg-solar-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Leader</span>
        </button>
      </div>

      <div className="space-y-6">
        {(editData.leadership || []).map((leader, index) => (
          <div key={leader.id || index} className="bg-gray-50 p-6 rounded-lg space-y-4 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 text-lg">Leader {index + 1}</h3>
              <button
                onClick={() => {
                  const newLeadership = editData.leadership.filter((l, i) => i !== index);
                  setEditData({...editData, leadership: newLeadership});
                }}
                className="text-red-600 hover:text-red-700 flex items-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={leader.name}
                  onChange={(e) => {
                    const newLeadership = [...editData.leadership];
                    newLeadership[index].name = e.target.value;
                    setEditData({...editData, leadership: newLeadership});
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Leader Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position</label>
                <input
                  type="text"
                  value={leader.role}
                  onChange={(e) => {
                    const newLeadership = [...editData.leadership];
                    newLeadership[index].role = e.target.value;
                    setEditData({...editData, leadership: newLeadership});
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Founder & Managing Partner"
                />
              </div>
            </div>

            <div>
              <ImageUploader
                label="Leader Photo"
                currentImage={leader.photo || ''}
                onUpload={(base64) => {
                  const newLeadership = [...editData.leadership];
                  newLeadership[index].photo = base64;
                  setEditData({...editData, leadership: newLeadership});
                }}
              />
            </div>

            {leader.photo && (
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {(!editData.leadership || editData.leadership.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No leaders added yet</p>
          <button
            onClick={() => {
              const newLeader = {
                id: Date.now(),
                name: 'New Leader',
                role: 'Position',
                photo: ''
              };
              setEditData({
                ...editData,
                leadership: [newLeader]
              });
            }}
            className="flex items-center space-x-2 bg-solar-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Leader</span>
          </button>
        </div>
      )}
    </div>
  );

  // Contact Section Editor
  const renderContactEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={editData.contact.address}
          onChange={(e) => setEditData({...editData, contact: {...editData.contact, address: e.target.value}})}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="text"
          value={editData.contact.phone}
          onChange={(e) => setEditData({...editData, contact: {...editData.contact, phone: e.target.value}})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={editData.contact.email}
          onChange={(e) => setEditData({...editData, contact: {...editData.contact, email: e.target.value}})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="text"
          value={editData.contact.website}
          onChange={(e) => setEditData({...editData, contact: {...editData.contact, website: e.target.value}})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>
    </div>
  );

  // Branding Section Editor
  const renderBrandingEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Logo & Branding</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          value={editData.company}
          onChange={(e) => setEditData({...editData, company: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
        <input
          type="text"
          value={editData.tagline}
          onChange={(e) => setEditData({...editData, tagline: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Motto</label>
        <input
          type="text"
          value={editData.motto}
          onChange={(e) => setEditData({...editData, motto: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>

      <ImageUploader
        label="Company Logo"
        currentImage={editData.logo}
        onUpload={(base64) => setEditData({...editData, logo: base64})}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
        <input
          type="text"
          value={editData.footer}
          onChange={(e) => setEditData({...editData, footer: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-yellow outline-none"
        />
      </div>
    </div>
  );

  // Colors Section Editor
  const renderColorsEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Colors & Theme</h2>
      <p className="text-gray-600">Customize the color scheme of your website sections</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Main Theme Colors</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color (Solar Yellow)</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.primary || "#FBBF24"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, primary: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.primary || "#FBBF24"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, primary: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="#FBBF24"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color (Solar Green)</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.secondary || "#15803D"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, secondary: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.secondary || "#15803D"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, secondary: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="#15803D"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color (Orange)</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.accent || "#F59E0B"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, accent: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.accent || "#F59E0B"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, accent: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="#F59E0B"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Section Background Colors</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.hero || "#FBBF24"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, hero: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.hero || "#FBBF24"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, hero: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.about || "#FFFFFF"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, about: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.about || "#FFFFFF"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, about: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Services Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.services || "#F9FAFB"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, services: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.services || "#F9FAFB"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, services: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Counters Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.counters || "#FBBF24"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, counters: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.counters || "#FBBF24"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, counters: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Projects Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.projects || "#FFFFFF"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, projects: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.projects || "#FFFFFF"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, projects: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.gallery || "#F9FAFB"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, gallery: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.gallery || "#F9FAFB"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, gallery: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.contact || "#FFFFFF"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, contact: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.contact || "#FFFFFF"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, contact: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Section</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editData.colors?.footer || "#111827"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, footer: e.target.value}})}
                className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editData.colors?.footer || "#111827"}
                onChange={(e) => setEditData({...editData, colors: {...editData.colors, footer: e.target.value}})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Color changes will be applied immediately after saving. Use hex color codes (e.g., #FBBF24) or click the color picker.
        </p>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero': return renderHeroEditor();
      case 'about': return renderAboutEditor();
      case 'services': return renderServicesEditor();
      case 'counters': return renderCountersEditor();
      case 'projects': return renderProjectsEditor();
      case 'gallery': return renderGalleryEditor();
      case 'leadership': return renderLeadershipEditor();
      case 'contact': return renderContactEditor();
      case 'branding': return renderBrandingEditor();
      case 'colors': return renderColorsEditor();
      default: return renderHeroEditor();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Arkaya Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefreshData}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                title="Refresh data from server"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition shadow-lg font-semibold disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save to Instantd'}</span>
              </button>
            </div>
          </div>
          
          {saveMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 px-4 py-2 rounded-lg text-sm ${
                saveMessage.includes('Error') || saveMessage.includes('Could not')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : saveMessage.includes('downloaded') || saveMessage.includes('refreshed')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {saveMessage}
            </motion.div>
          )}
          
          <div className="mt-3 bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <p className="text-sm text-green-800">
              <strong>✨ Real-time Updates:</strong> Changes are saved to Instantd database. All users will see updates automatically in real-time - no redeploy needed!
            </p>
          </div>
        </div>

        <div className="p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {renderActiveSection()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
