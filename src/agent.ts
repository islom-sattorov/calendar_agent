import { getAIProvider } from "./ai";
import { createCalendarEvent } from "./calendar";

export async function processMessage(
	message: string,
	userId: string,
): Promise<string> {
	const ai = getAIProvider();
	const parsed = await ai.parse(message);

	if (parsed.isMeeting && parsed.details) {
		const event = await createCalendarEvent(parsed.details);
		return `✅ Meeting created: "${parsed.details.title}"\n📅 ${parsed.details.date}\n🔗 ${event.htmlLink}`;
	}

	return `This doesn't look like a meeting request. ${parsed.reason}`;
}
