import React from 'react';
import { Helmet } from 'react-helmet';
import ExcuseForm from '../components/excuses/ExcuseForm';
import ExcuseDisplay from '../components/excuses/ExcuseDisplay';

const GeneratorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Generate Excuse - Alibi AI</title>
        <meta name="description" content="Generate a creative and believable excuse with Alibi AI's advanced excuse generator." />
      </Helmet>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Generate Your Excuse
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us why you need an excuse, and our AI will generate the perfect alibi in seconds
            </p>
          </div>
          
          <ExcuseForm />
          <ExcuseDisplay />
        </div>
      </div>
    </>
  );
};

export default GeneratorPage;