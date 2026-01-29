# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Telegram-based AI Meeting Agent that parses natural language meeting requests, extracts meeting details using AI (Claude or OpenAI), and creates Google Calendar events automatically.

## Development Commands

```bash
# Install dependencies
bun install

# Run the Telegram bot
bun run dev

# Type-check / compile TypeScript
bun run build
```

## Architecture

### Entry Point Flow
1. **telegram.ts** - Telegraf bot listens for messages, routes to `processMessage()`
2. **agent.ts** - Core processing: gets AI provider → parses message → creates calendar event
3. **ai/index.ts** - Singleton factory returns AI provider (prefers Anthropic, falls back to OpenAI)
4. **calendar.ts** - Google Calendar event creation with OAuth flow

### AI Provider System
- **Singleton Pattern**: `getAIProvider()` returns cached provider instance
- **Strategy Pattern**: Providers implement `AIProvider` interface with `parse()` method
- **Provider Selection**: Checks `ANTHROPIC_API_KEY` first, then `OPENAI_API_KEY`
- Models: `claude-sonnet-4-20250514` (Anthropic), `gpt-5-nano` (OpenAI)

### Type Contracts
```typescript
interface AIProvider {
  parse(message: string): Promise<ParsedResponse>;
}

interface ParsedResponse {
  isMeeting: boolean;
  details?: MeetingDetails;  // Present when isMeeting=true
  reason?: string;           // Present when isMeeting=false
}

interface MeetingDetails {
  title: string;
  date: string;        // ISO 8601 format
  duration: number;    // Minutes
  attendees?: string[];
  description?: string;
}
```

## Environment Variables

Required in `.env.development`:
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` - At least one AI provider key

Google Calendar requires `credentials.json` at project root level (one directory up from `src/`).

## Code Conventions

- **Naming**: `get*` (getters), `create*` (factories), `process*` (processors)
- **Modules**: ESM (`"type": "module"`)
- **Type Safety**: Strict TypeScript with all strict checks enabled
- **Async**: All external operations use async/await with try/catch
