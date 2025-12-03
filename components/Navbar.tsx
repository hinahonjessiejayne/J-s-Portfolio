import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PROFILE_IMAGE_URL } from '../constants';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Offset to account for fixed navbar height
      const scrollPosition = window.scrollY + 100;
      
      let current = 'home';

      navLinks.forEach((link) => {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element && element.offsetTop <= scrollPosition) {
          current = sectionId;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check to set active state on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      const navHeight = 80; // Approximate height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto liquid-glass rounded-full px-6 py-3 flex items-center justify-between gap-6 md:gap-12 transition-all duration-300 w-full max-w-5xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/10">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            {imgError ? (
              <div className="w-8 h-8 rounded-full bg-brand-400 flex items-center justify-center text-xs font-bold text-black ring-2 ring-brand-400">
                J
              </div>
            ) : (
              <img 
                src={PROFILE_IMAGE_URL} 
                alt="Profile" 
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform ring-2 ring-brand-400"
              />
            )}
            <span className="text-lg font-serif font-bold tracking-wider text-gray-900 dark:text-white hidden sm:block">
              Jessie
            </span>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-400/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-brand-400 hover:text-brand-600 hover:bg-brand-400/20 transition-all focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 p-4 rounded-2xl liquid-glass border border-white/20 dark:border-white/10 shadow-2xl pointer-events-auto md:hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-all text-center ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-400/10'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-brand-400/20 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;