import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import PremiumPage from './pages/PremiumPage';
import { ExcuseProvider } from './context/ExcuseContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ExcuseProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ExcuseProvider>
    </AuthProvider>
  );
}

export default App;