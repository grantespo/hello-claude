import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_KEY = process.env.OPENWEATHER_API_KEY;

const server = new McpServer({ name: "hello-claude-weather", version: "1.0.0" });

server.tool(
  "get_weather",
  "Get current weather for a city",
  { city: z.string().describe("City name, e.g. 'Boynton Beach, FL'") },
  async ({ city }) => {
    const normalized = city.replace(/,\s*[A-Z]{2}$/, '');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(normalized)}&appid=${API_KEY}&units=imperial`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      return { content: [{ type: "text", text: `Weather error: ${data.message}` }] };
    }

    const { name, main, weather, wind } = data;
    return {
      content: [{
        type: "text",
        text: `${name}: ${weather[0].description}, ${Math.round(main.temp)}°F (feels like ${Math.round(main.feels_like)}°F), humidity ${main.humidity}%, wind ${Math.round(wind.speed)} mph`
      }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
