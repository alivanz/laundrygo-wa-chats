type ChatMessage = {
	id: string;
	created_at: Date;
	status: string;
	content: ChatMessageContent;
	error?: any;
};

type ChatMessageContent = {};
