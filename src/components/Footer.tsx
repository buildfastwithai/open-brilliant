'use client';

import { ExternalLink,  Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Open Brilliant</h3>
            <p className="text-gray-300 mb-4">
              Interactive physics learning with AI-generated animations. 
              Create custom visualizations and master complex concepts.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Powered by</span>
              <a 
                href="https://buildfastwithai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors font-semibold"
              >
                Build Fast With AI
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-300 hover:text-white transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a 
                href="https://buildfastwithai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Build Fast With AI
              </a>
             
                <Mail className="w-4 h-4" />
                Contact Us
              
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Open Brilliant. Built with ❤️ by{' '}
            <a 
              href="https://buildfastwithai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Build Fast With AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
