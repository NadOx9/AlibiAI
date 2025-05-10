import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isPremium: boolean;
  updateToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(() => {
    const saved = localStorage.getItem('isPremium');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isPremium', isPremium.toString());
  }, [isPremium]);

  const updateToPremium = () => {
    setIsPremium(true);
  };

  return (
    <AuthContext.Provider value={{ isPremium, updateToPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};