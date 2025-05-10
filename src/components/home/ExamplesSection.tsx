import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const examples = [
  {
    scenario: "Missing a deadline",
    excuse: "I couldn't submit the report on time because my keyboard developed sentience and refused to type corporate jargon."
  },
  {
    scenario: "Late to a meeting",
    excuse: "I'm running late because I had to help an elderly neighbor who accidentally set their Wi-Fi password to their life story."
  },
  {
    scenario: "Canceling plans",
    excuse: "I need to cancel tonight because my smart home system has locked me in and is demanding I watch documentaries about its robot ancestors."
  }
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

const ExamplesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Example Excuses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some creative excuses our AI has generated
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {examples.map((example, index) => (
            <motion.div key={index} variants={item}>
              <Card withHover className="h-full p-6">
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                  {example.scenario}
                </h3>
                <p className="text-gray-700 italic">
                  "{example.excuse}"
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExamplesSection;