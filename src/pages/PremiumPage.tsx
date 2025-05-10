import React from 'react';
import { Helmet } from 'react-helmet';
import PremiumCard from '../components/premium/PremiumCard';

const PremiumPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Premium - Alibi AI</title>
        <meta name="description" content="Upgrade to Alibi AI Premium for unlimited, AI-powered excuses." />
      </Helmet>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Upgrade to Premium
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get unlimited excuses and unlock all premium features
            </p>
          </div>
          
          <PremiumCard />
        </div>
      </div>
    </>
  );
};

export default PremiumPage;