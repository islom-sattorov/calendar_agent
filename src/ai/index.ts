import { AnthropicProvider } from "./anthropic-provider";
import { OpenAIProvider } from "./openai-provider";
import type { AIProvider } from "./types";

export function createAIProvider(): AIProvider {
	const hasAnthropic = !!import.meta.env.ANTHROPIC_API_KEY;
	const hasOpenAI = !!import.meta.env.OPENAI_API_KEY;

	// Priority: Anthropic first, then OpenAI
	if (hasAnthropic) {
		console.log("🤖 Using Anthropic Claude");
		return new AnthropicProvider();
	}

	if (hasOpenAI) {
		console.log("🤖 Using OpenAI GPT");
		return new OpenAIProvider();
	}

	throw new Error(
		"No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY",
	);
}

// Singleton instance
let provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
	if (!provider) {
		provider = createAIProvider();
	}
	return provider;
}

export * from "./types";
