import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "./prompt";
import type { AIProvider, ParsedResponse } from "./types";

export class AnthropicProvider implements AIProvider {
	private client: Anthropic;

	constructor() {
		this.client = new Anthropic();
	}

	async parse(message: string): Promise<ParsedResponse> {
		const response = await this.client.messages.create({
			model: "claude-sonnet-4-20250514",
			max_tokens: 1024,
			system: getSystemPrompt(),
			messages: [{ role: "user", content: message }],
		});

		return JSON.parse(
			response.content[0].type === "text" ? response.content[0].text : "",
		);
	}
}
