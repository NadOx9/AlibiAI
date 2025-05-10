import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Alibi AI. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for those in need of a good excuse</span>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;