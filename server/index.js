import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

// Initialize OpenAI with improved configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 second timeout
  maxRetries: 3   // Built-in retries
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const getPromptByType = (type) => {
  switch (type) {
    case 'serious':
      return "Generate a professional and believable excuse that would be appropriate in a business context. Keep it under 50 words and focus on realistic scenarios.";
    case 'cheeky':
      return "Generate a clever and slightly bold excuse that remains believable. Add a touch of wit while keeping it plausible. Keep it under 50 words.";
    case 'funny':
      return "Generate a humorous and creative excuse. Be imaginative and entertaining while keeping it under 50 words.";
    default:
      return "Generate a believable excuse that's appropriate for the situation. Keep it under 50 words.";
  }
};

// API endpoint with improved error handling
app.post('/api/generate-excuse', async (req, res) => {
  try {
    const { reason, type = 'serious' } = req.body;
    
    if (!reason) {
      return res.status(400).json({ error: 'Reason is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: getPromptByType(type)
        },
        {
          role: "user",
          content: `Generate an excuse for: ${reason}`
        }
      ],
      temperature: type === 'serious' ? 0.3 : 0.7,
      max_tokens: 100
    });

    const excuse = completion.choices[0].message.content.trim();
    res.json({ excuse });
    
  } catch (error) {
    console.error('Error generating excuse:', error);
    
    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid API key. Please check your configuration.' });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ error: 'Too many requests. Please try again in a moment.' });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate excuse. Please try again.' 
    });
  }
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('OpenAI API key is configured:', !!process.env.OPENAI_API_KEY);
});

export default app;