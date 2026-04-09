import Anthropic from '@anthropic-ai/sdk';
import { betaZodTool } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';

const client = new Anthropic();
const API_KEY = process.env.OPENWEATHER_API_KEY;

const getWeather = betaZodTool({
  name: 'get_weather',
  description: 'Get current weather for a city',
  inputSchema: z.object({
    city: z.string().describe("City name, e.g. 'Boynton Beach, FL'"),
  }),
  run: async ({ city }) => {
    const normalized = city.replace(/,\s*[A-Z]{2}$/, '');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(normalized)}&appid=${API_KEY}&units=imperial`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) return `Weather error: ${data.message}`;
    const { name, main, weather, wind } = data;
    return `${name}: ${weather[0].description}, ${Math.round(main.temp)}°F (feels like ${Math.round(main.feels_like)}°F), humidity ${main.humidity}%, wind ${Math.round(wind.speed)} mph`;
  },
});

const finalMessage = await client.beta.messages.toolRunner({
  model: 'claude-opus-4-6',
  max_tokens: 1024,
  tools: [getWeather],
  messages: [{
    role: 'user',
    content: 'Help me plan a fun day in Boynton Beach, FL based on the current weather. Check the weather first, then suggest activities.',
  }],
});

for (const block of finalMessage.content) {
  if (block.type === 'text') console.log(block.text);
}
