import { Sun, Mail, Phone, MapPin } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Footer = () => {
  const { data } = useInstantDB();

  return (
    <footer 
      className="text-white"
      style={{ backgroundColor: data.colors?.footer || '#1E3A8A' }}
    >
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {data.logo ? (
                <img src={data.logo} alt={data.company} className="h-12 w-auto" />
              ) : (
                <Sun className="w-10 h-10 text-blue-400" />
              )}
              <div>
                <h3 className="text-xl font-bold">{data.company}</h3>
                <p className="text-sm text-gray-400">{data.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {data.motto}
            </p>
            <p className="text-sm text-gray-400">
              ISO 9001:2015 Certified | OREDA Registered | MNRE Compliant
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{data.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{data.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{data.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 text-center text-sm text-gray-400">
          <p>{data.footer}</p>
          <p className="mt-2">
            Designed & Developed for Sustainable Energy Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
