import React from 'react';
import { Copy, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useExcuse } from '../../context/ExcuseContext';

const ExcuseDisplay: React.FC = () => {
  const { excuses, loading } = useExcuse();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const shareExcuse = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'My Alibi AI Excuse',
        text: text
      }).catch(console.error);
    } else {
      copyToClipboard(text);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-8 border border-gray-200 rounded-lg bg-gray-50">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!excuses.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="p-6 md:p-8 border border-yellow-300 rounded-lg bg-yellow-50 shadow-sm">
        <h3 className="text-lg font-medium text-yellow-700 mb-2">Your Excuse</h3>
        
        <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6">
          {excuses[0]}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(excuses[0])}
            icon={<Copy className="h-4 w-4" />}
          >
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => shareExcuse(excuses[0])}
            icon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExcuseDisplay;