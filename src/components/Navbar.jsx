import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useLocalStorage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            {data.logo ? (
              <img src={data.logo} alt={data.company} className="h-12 w-auto" />
            ) : (
              <Sun className={`w-10 h-10 ${scrolled ? 'text-blue-600' : 'text-blue-400'}`} />
            )}
            <div>
              <h1 className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                {data.company}
              </h1>
              <p className={`text-xs ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                {data.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Projects', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium transition-colors ${
                  scrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                {item}
              </button>
            ))}
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg transition-all ${
                scrolled
                  ? 'text-gray-900 hover:opacity-80'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
              style={scrolled ? { backgroundColor: data.colors?.primary || '#3B82F6' } : {}}
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${scrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {['Home', 'About', 'Services', 'Projects', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                {item}
              </button>
            ))}
            <Link
              to="/admin"
              className="block w-full text-center text-gray-900 px-4 py-2 rounded-lg hover:opacity-80 transition"
              style={{ backgroundColor: data.colors?.primary || '#3B82F6' }}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
