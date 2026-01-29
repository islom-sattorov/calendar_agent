export interface MeetingDetails {
	title: string;
	date: string;
	duration: number;
	attendees?: string[];
	description?: string;
}

export interface ParsedResponse {
	isMeeting: boolean;
	details?: MeetingDetails;
	reason?: string;
}

export interface AIProvider {
	parse(message: string): Promise<ParsedResponse>;
}
