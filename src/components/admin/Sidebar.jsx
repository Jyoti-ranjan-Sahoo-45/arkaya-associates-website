import { Sun, Home, Info, Briefcase, Hash, FolderOpen, Image, Phone, Settings, LogOut, Palette } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About Section', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'counters', label: 'Counters', icon: Hash },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'branding', label: 'Logo & Branding', icon: Settings },
    { id: 'colors', label: 'Colors & Theme', icon: Palette },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Sun className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-lg font-bold">Arkaya Admin</h2>
            <p className="text-xs text-gray-400">Content Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white font-semibold'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 text-white font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
