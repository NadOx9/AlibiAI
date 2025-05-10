import axios from 'axios';

interface ExcuseResponse {
  excuse: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.PROD 
  ? '/.netlify/functions'
  : '/api';

export const generateExcuse = async (reason: string, type: 'serious' | 'cheeky' | 'funny'): Promise<string> => {
  try {
    const response = await axios.post<ExcuseResponse>(`${API_BASE_URL}/generate-excuse`, { 
      reason, 
      type 
    });
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    if (!response.data.excuse) {
      throw new Error('No excuse was generated');
    }
    
    return response.data.excuse;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again in a moment.');
      }
      if (error.response?.status === 500) {
        throw new Error('The server is currently experiencing issues. Please try again in a moment.');
      }
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      }
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      if (!error.response) {
        throw new Error('Network error. Please check your connection.');
      }
    }
    
    throw new Error('Failed to generate excuse. Please try again.');
  }
};

export const processPayment = async (paymentDetails: any): Promise<{ success: boolean, message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Payment processed successfully!' });
    }, 1500);
  });
};