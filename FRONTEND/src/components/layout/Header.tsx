import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/logo?populate=krcbc_logo`)
      .then(res => res.json())
      .then(data => {
        const logo = data.data?.krcbc_logo;
        if (logo?.formats?.small?.url) {
          setLogoUrl(API_URL + logo.formats.small.url);
        } else if (logo?.url) {
          setLogoUrl(API_URL + logo.url);
        }
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowHeader(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { name: 'About', href: '/about', hasDropdown: false },
    { name: 'Programs', href: '/programs', hasDropdown: false },
    { name: 'Commissions', href: '/commissions', hasDropdown: false },
    { name: 'News & Events', href: '/news', hasDropdown: false },
    { 
      name: 'Resources', 
      href: '/resources', 
      hasDropdown: false,
      submenu: [
        { name: 'Documents & Downloads', href: '/resources' },
        { name: 'Daily Prayers', href: '/faith' },
        { name: 'Prayer Requests', href: '/prayer-requests' },
        { name: 'Sacraments', href: '/faith' },
        { name: 'Liturgical Calendar', href: '/faith' }
      ]
    },
    { name: 'Media', href: '/media', hasDropdown: false },
    { name: 'Contact', href: '/contact', hasDropdown: false },
  ];

  return (
    <header
      className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="KRCBC Logo"
                className="w-14 h-14 rounded-full object-cover bg-white p-1"
              />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-800">KRCBC</h1>
              <p className="text-xs text-gray-600">Karnataka Regional Catholic Bishops' Council</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>
                
                {item.hasDropdown && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.submenu?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/support">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Donate
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && item.submenu && (
                  <div className="ml-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/support" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Donate
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
