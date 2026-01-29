import OpenAI from "openai";
import { getSystemPrompt } from "./prompt";
import type { AIProvider, ParsedResponse } from "./types";

export class OpenAIProvider implements AIProvider {
	private client: OpenAI;

	constructor() {
		this.client = new OpenAI();
	}

	async parse(message: string): Promise<ParsedResponse> {
		const response = await this.client.chat.completions.create({
			model: "gpt-5-nano",
			response_format: { type: "json_object" },
			messages: [
				{ role: "system", content: getSystemPrompt() },
				{ role: "user", content: message },
			],
		});

		return JSON.parse(response.choices[0].message.content!);
	}
}
