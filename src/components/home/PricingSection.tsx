import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

const freeFeatures = [
  'One free excuse',
  'Basic excuse generation',
  'Mobile-friendly interface'
];

const premiumFeatures = [
  'Unlimited excuses',
  'Advanced AI-powered excuses',
  'Situation-specific customization',
  'Priority generation',
  'No ads or waiting periods'
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const { isPremium } = useAuth();

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Pricing Plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your excuse needs
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Free Plan */}
          <motion.div variants={item}>
            <Card className="h-full p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-2">Free Plan</h3>
              <p className="text-gray-600 mb-6">Try us out with one excuse</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-black">$0</span>
                <span className="text-gray-500 ml-1">/ forever</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                size="md" 
                fullWidth 
                onClick={() => navigate('/generator')}
              >
                Try For Free
              </Button>
            </Card>
          </motion.div>
          
          {/* Premium Plan */}
          <motion.div variants={item}>
            <Card className="h-full p-8 border-2 border-yellow-500 relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-sm font-medium">
                POPULAR
              </div>
              
              <h3 className="text-xl font-bold text-black mb-2 flex items-center">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                Premium Plan
              </h3>
              <p className="text-gray-600 mb-6">Unlimited excuses, anytime</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-black">$4.99</span>
                <span className="text-gray-500 ml-1">/ month</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="primary" 
                size="md" 
                fullWidth
                onClick={() => navigate('/premium')}
                disabled={isPremium}
              >
                {isPremium ? 'Already Premium' : 'Upgrade Now'}
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;