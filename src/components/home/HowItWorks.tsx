import React from 'react';
import { MessageSquare, Lightbulb, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <MessageSquare className="h-8 w-8 text-yellow-500" />,
    title: 'Tell us why you need an excuse',
    description: 'Briefly describe the situation you need to get out of.'
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
    title: 'Our AI works its magic',
    description: 'Advanced AI analyzes your situation and crafts the perfect excuse.'
  },
  {
    icon: <Clock className="h-8 w-8 text-yellow-500" />,
    title: 'Get your excuse in seconds',
    description: 'Receive a believable, situation-appropriate excuse in just 5 seconds.'
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

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting the perfect excuse is simple with our three-step process
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center"
              variants={item}
            >
              <div className="bg-yellow-50 p-4 rounded-full mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;