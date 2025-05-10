import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isPremium } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold text-black">Alibi AI</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`font-medium hover:text-yellow-500 transition-colors ${
                location.pathname === '/' ? 'text-yellow-500' : 'text-black'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`font-medium hover:text-yellow-500 transition-colors ${
                location.pathname === '/generator' ? 'text-yellow-500' : 'text-black'
              }`}
            >
              Generate
            </Link>
            {isPremium ? (
              <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700">Premium</span>
              </div>
            ) : (
              <Link 
                to="/premium" 
                className={`font-medium hover:text-yellow-500 transition-colors ${
                  location.pathname === '/premium' ? 'text-yellow-500' : 'text-black'
                }`}
              >
                Premium
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white"
        >
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link 
              to="/" 
              className={`block font-medium hover:text-yellow-500 transition-colors ${
                location.pathname === '/' ? 'text-yellow-500' : 'text-black'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`block font-medium hover:text-yellow-500 transition-colors ${
                location.pathname === '/generator' ? 'text-yellow-500' : 'text-black'
              }`}
              onClick={closeMenu}
            >
              Generate
            </Link>
            {isPremium ? (
              <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full w-fit">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700">Premium</span>
              </div>
            ) : (
              <Link 
                to="/premium" 
                className={`block font-medium hover:text-yellow-500 transition-colors ${
                  location.pathname === '/premium' ? 'text-yellow-500' : 'text-black'
                }`}
                onClick={closeMenu}
              >
                Premium
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;