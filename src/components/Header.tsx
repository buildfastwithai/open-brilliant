'use client';

import { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-black bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-black">Open Brilliant</h1>
              <p className="text-sm text-gray-600">AI Physics Animations</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-black hover:text-gray-600 transition-colors"
            >
              Features
            </a>
            {/* <a 
              href="#demo" 
              className="text-black hover:text-gray-600 transition-colors"
            >
              Demo
            </a> */}
            <a 
              href="https://buildfastwithai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors"
            >
              BuildFastWithAI
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <a 
                href="#features" 
                className="text-black hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#demo" 
                className="text-black hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </a>
              <a 
                href="https://buildfastwithai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                BuildFastWithAI
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
