import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { generateExcuse } from '../services/api';

interface ExcuseContextType {
  excuses: string[];
  loading: boolean;
  error: string | null;
  generateNewExcuse: (reason: string, type: 'serious' | 'cheeky' | 'funny') => Promise<void>;
  excusesLeft: number;
}

const ExcuseContext = createContext<ExcuseContextType | undefined>(undefined);

export const ExcuseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [excuses, setExcuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isPremium } = useAuth();
  const [excusesLeft, setExcusesLeft] = useState(() => {
    const saved = localStorage.getItem('excusesLeft');
    return saved !== null ? parseInt(saved, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('excusesLeft', excusesLeft.toString());
  }, [excusesLeft]);

  const generateNewExcuse = async (reason: string, type: 'serious' | 'cheeky' | 'funny') => {
    if (!isPremium && excusesLeft <= 0) {
      setError('You have used your free excuse. Upgrade to premium for unlimited excuses!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newExcuse = await generateExcuse(reason, type);
      setExcuses([newExcuse, ...excuses]);
      
      if (!isPremium) {
        setExcusesLeft(excusesLeft - 1);
      }
    } catch (err) {
      console.error('Error generating excuse:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate excuse. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ExcuseContext.Provider value={{ excuses, loading, error, generateNewExcuse, excusesLeft }}>
      {children}
    </ExcuseContext.Provider>
  );
};

export const useExcuse = () => {
  const context = useContext(ExcuseContext);
  if (context === undefined) {
    throw new Error('useExcuse must be used within an ExcuseProvider');
  }
  return context;
};