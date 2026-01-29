import { Telegraf } from "telegraf";
import { processMessage } from "./agent";

const bot = new Telegraf(import.meta.env.TELEGRAM_BOT_TOKEN);

bot.on("text", async (ctx) => {
	const userMessage = ctx.message.text;
	const userId = ctx.from.id.toString();

	try {
		const result = await processMessage(userMessage, userId);
		await ctx.reply(result);
	} catch (error: unknown) {
		await ctx.reply(
			`Failed to process your request. Please try again. ${error}`,
		);
	}
});

bot.launch();
