import React from 'react';
import { Check, CreditCard, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { processPayment } from '../../services/api';

const features = [
  'Unlimited excuse generation',
  'Advanced AI-powered excuses',
  'Situation-specific customization',
  'Priority excuse generation',
  'No ads or waiting periods',
  'Access to exclusive excuse templates'
];

const PremiumCard: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { updateToPremium, isPremium } = useAuth();

  const handleUpgrade = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would integrate with Stripe/Gumroad
      // For this demo, we'll just simulate a payment process
      const result = await processPayment({
        amount: 4.99,
        currency: 'USD',
        description: 'Alibi AI Premium Subscription'
      });
      
      if (result.success) {
        updateToPremium();
        setSuccess(true);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 border-2 border-green-500">
          <div className="flex items-center justify-center bg-green-100 w-16 h-16 rounded-full mx-auto mb-6">
            <Sparkles className="h-8 w-8 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-black mb-2">
            You're Premium!
          </h2>
          
          <p className="text-center text-gray-600 mb-6">
            Enjoy unlimited excuse generation and all premium features
          </p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => window.location.href = '/generator'}
          >
            Start Generating Excuses
          </Button>
        </Card>
      </motion.div>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 border-2 border-green-500">
          <div className="flex items-center justify-center bg-green-100 w-16 h-16 rounded-full mx-auto mb-6">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-black mb-2">
            Payment Successful!
          </h2>
          
          <p className="text-center text-gray-600 mb-6">
            Thank you for upgrading to Alibi AI Premium
          </p>
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => window.location.href = '/generator'}
          >
            Start Generating Excuses
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 border-2 border-yellow-500">
        <div className="flex items-center justify-center bg-yellow-100 w-16 h-16 rounded-full mx-auto mb-6">
          <Zap className="h-8 w-8 text-yellow-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-black mb-2">
          Upgrade to Premium
        </h2>
        
        <p className="text-center text-gray-600 mb-4">
          Get unlimited excuses and premium features
        </p>
        
        <div className="flex justify-center items-baseline mb-6">
          <span className="text-4xl font-bold text-black">$4.99</span>
          <span className="text-gray-500 ml-1">/ month</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleUpgrade}
          disabled={loading}
          icon={<CreditCard className="h-5 w-5" />}
        >
          {loading ? 'Processing...' : 'Upgrade Now'}
        </Button>
        
        <p className="text-center text-xs text-gray-500 mt-4">
          Secure payment processing. Cancel anytime.
        </p>
      </Card>
    </motion.div>
  );
};

export default PremiumCard;