import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import path from "path";
import type { MeetingDetails } from "./ai";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

async function getAuthClient() {
	// First run opens browser for OAuth consent
	const auth = await authenticate({
		keyfilePath: path.join(__dirname, "../credentials.json"),
		scopes: SCOPES,
	});
	return auth;
}

export async function createCalendarEvent(details: MeetingDetails) {
	const auth = await getAuthClient();
	const calendar = google.calendar({ version: "v3", auth });

	const event = {
		summary: details.title,
		description: details.description,
		start: {
			dateTime: details.date,
			timeZone: "Asia/Dushanbe",
		},
		end: {
			dateTime: new Date(
				new Date(details.date).getTime() + details.duration * 60000,
			).toISOString(),
			timeZone: "Asia/Dushanbe",
		},
		attendees: details.attendees?.map((email: string) => ({ email })),
	};

	const result = await calendar.events.insert({
		calendarId: "primary",
		requestBody: event,
		sendUpdates: "all",
	});

	return result.data;
}
