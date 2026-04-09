# hello-claude

A minimal Node.js project for learning Claude Code and the Anthropic ecosystem.

## What it does

This project progressively layers three concepts:

1. **`index.js`** — A simple Hello World to verify your Node.js setup
2. **`mcp-server.js`** — A Model Context Protocol (MCP) server that exposes a `get_weather` tool using the OpenWeatherMap API
3. **`agent.js`** — A Claude-powered agent that detects your current location via IP geolocation, fetches live weather, and plans a fun day tailored to your conditions

## Prerequisites

- Node.js
- An [Anthropic API key](https://console.anthropic.com)
- An [OpenWeatherMap API key](https://openweathermap.org/api)

## Setup

```bash
npm install
```

Add your API keys to `~/.zshrc` (or `~/.bashrc`):

```bash
export ANTHROPIC_API_KEY=your-key-here
export OPENWEATHER_API_KEY=your-key-here
```

## Usage

### Hello World
```bash
node index.js
```

### Run the agent
```bash
node agent.js
```

The agent will detect your location, check the current weather, and suggest a fun day plan.

### Run the MCP server
```bash
node mcp-server.js
```

## What you'll learn

- **MCP servers** — How to expose tools to Claude via the Model Context Protocol
- **Anthropic SDK tool use** — How Claude calls tools in an agentic loop using `betaZodTool` and `toolRunner`
- **Claude Code slash commands** — The `/hello` command in `.claude/commands/hello.md` ties everything together as a runnable workflow
- **Agents vs direct API calls** — When an agentic loop (model decides what to do next) is the right choice over hardcoded logic
