import React, { useState } from 'react';
import { global } from '../data/site';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <a href="/" className="text-xl font-semibold text-gray-900">
          {global.name}
        </a>
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Hamburger Icon */}
          <svg className="h-6 w-6" fill="none" stroke="currentColor">
            {isOpen ? (
              // Close Icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Menu Icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-blue-500">
            Home
          </a>
          <a href="/about" className="hover:text-blue-500">
            About Us
          </a>
          <a href="/services" className="hover:text-blue-500">
            Services
          </a>
          <a href="/contact" className="hover:text-blue-500">
            Contact
          </a>
          <a href="/book" className="hover:text-blue-500">
          Book Now
          </a>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block px-4 py-2 hover:bg-gray-100">
            Home
          </a>
          <a href="/about" className="block px-4 py-2 hover:bg-gray-100">
            About Us
          </a>
          <a href="/services" className="block px-4 py-2 hover:bg-gray-100">
            Services
          </a>
          <a href="/contact" className="block px-4 py-2 hover:bg-gray-100">
            Contact
          </a>
          <a href="/book" className="block px-4 py-2 hover:bg-gray-100">
          Book Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
