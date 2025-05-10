import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import ExamplesSection from '../components/home/ExamplesSection';
import PricingSection from '../components/home/PricingSection';
import { Helmet } from 'react-helmet';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Alibi AI - Need a believable excuse?</title>
        <meta name="description" content="Alibi AI generates realistic, clever, and funny excuses using artificial intelligence in just 5 seconds." />
      </Helmet>
      <div>
        <HeroSection />
        <HowItWorks />
        <ExamplesSection />
        <PricingSection />
      </div>
    </>
  );
};

export default HomePage;