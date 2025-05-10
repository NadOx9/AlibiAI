import { Handler } from '@netlify/functions';
import { OpenAI } from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const getPromptByType = (type: string) => {
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

export const handler: Handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (!event.body) {
      throw new Error('Request body is required');
    }

    const { reason, type = 'serious' } = JSON.parse(event.body);

    if (!reason) {
      throw new Error('Reason is required');
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ excuse })
    };

  } catch (error) {
    console.error('Error generating excuse:', error);

    let statusCode = 500;
    let errorMessage = 'Failed to generate excuse. Please try again.';

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        statusCode = 401;
        errorMessage = 'Invalid API key. Please check your configuration.';
      } else if (error.message.includes('rate limit')) {
        statusCode = 429;
        errorMessage = 'Too many requests. Please try again in a moment.';
      }
    }

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: errorMessage })
    };
  }
};