import axios, { type AxiosError } from 'axios'
import { type Club } from '../constants'

interface OpenAIResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRecommendation = async (
    handicap: string | null,
    areaOfImprovement: string | null,
    club1: Club,
    club2: Club,
    retries = 3
): Promise<string> => {
    const prompt = `
      Based on the following information, please provide a brief recommendation.
      Club 1: ${JSON.stringify(club1)}
      Club 2: ${JSON.stringify(club2)}
      User Handicap: ${handicap ?? 'N/A'}
      Area of Improvement: ${areaOfImprovement ?? 'N/A'}
  
      Please summarize which club might be better for the user to improve their game.
    `;

    try {
        const response = await axios.post<OpenAIResponse>('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 200, // Limit the response length
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your actual OpenAI API key
                'Content-Type': 'application/json',
            },
        });

        // Check if choices exist and have at least one choice
        if (response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0]!.message.content;
        } else {
            return 'No recommendations available at this time.';
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 429 && retries > 0) {
            console.error('Rate limit exceeded, retrying in 5 seconds...');
            await sleep(5000); // Retry after 5 seconds
            return await getRecommendation(handicap, areaOfImprovement, club1, club2);
        }
        console.error('Error fetching recommendations:', error);
        return 'Could not fetch recommendations at this time.';
    }
}
