import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useExcuse } from '../../context/ExcuseContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type ExcuseType = 'serious' | 'cheeky' | 'funny';

const ExcuseForm: React.FC = () => {
  const [reason, setReason] = useState('');
  const [excuseType, setExcuseType] = useState<ExcuseType>('serious');
  const { generateNewExcuse, loading, error, excusesLeft } = useExcuse();
  const { isPremium } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    
    await generateNewExcuse(reason, excuseType);
    setReason('');
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="reason" className="block text-lg font-medium text-gray-700 mb-2">
            Why do you need an excuse?
          </label>
          <textarea
            id="reason"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
            placeholder="e.g., I need to get out of a boring meeting..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            What type of excuse do you want?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setExcuseType('serious')}
              className={`p-4 rounded-lg border-2 transition-all ${
                excuseType === 'serious'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-yellow-200'
              }`}
            >
              <h3 className="font-semibold mb-1">Serious</h3>
              <p className="text-sm text-gray-600">Professional and believable</p>
            </button>
            <button
              type="button"
              onClick={() => setExcuseType('cheeky')}
              className={`p-4 rounded-lg border-2 transition-all ${
                excuseType === 'cheeky'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-yellow-200'
              }`}
            >
              <h3 className="font-semibold mb-1">Cheeky</h3>
              <p className="text-sm text-gray-600">Bold but still plausible</p>
            </button>
            <button
              type="button"
              onClick={() => setExcuseType('funny')}
              className={`p-4 rounded-lg border-2 transition-all ${
                excuseType === 'funny'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-yellow-200'
              }`}
            >
              <h3 className="font-semibold mb-1">Funny</h3>
              <p className="text-sm text-gray-600">Humorous and creative</p>
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading || (!isPremium && excusesLeft <= 0)}
            icon={<Wand2 className="h-5 w-5" />}
          >
            {loading ? 'Generating...' : 'Generate Excuse'}
          </Button>

          {!isPremium && (
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {excusesLeft === 1 ? (
                  "You have 1 free excuse remaining"
                ) : excusesLeft > 0 ? (
                  `You have ${excusesLeft} free excuses remaining`
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-600 font-medium"
                  >
                    You've used your free excuse. 
                    <button 
                      onClick={() => navigate('/premium')}
                      className="ml-1 text-yellow-600 font-medium underline"
                    >
                      Upgrade to Premium
                    </button>
                  </motion.p>
                )}
              </p>
            </div>
          )}

          {error && (
            <motion.div 
              className="bg-red-50 text-red-600 p-3 rounded-md text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExcuseForm;