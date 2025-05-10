import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Need a believable excuse?
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our AI gives you one in 5 seconds.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/generator')}
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Generate My Excuse
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;