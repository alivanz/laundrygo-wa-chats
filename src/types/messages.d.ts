type ChatMessage = {
	id: string;
	created_at: Date;
	status: string;
	content: ChatMessageContent;
	error?: any;
};

type ChatMessageContent =
	| ChatMessageContentTemplate
	| ChatMessageContentButton
	| ChatMessageContentUnsupported
	| ChatMessageContentText
	| ChatMessageContentImage
	| ChatMessageContentSticker;

type ChatMessageContentTemplate = {
	type: "template";
	template: { name: string };
};

type ChatMessageContentUnsupported = {
	type: "unsupported";
	title: string;
};

type ChatMessageContentText = {
	type: "text";
	text: { body: string };
};

type ChatMessageContentImage = {
	type: "image";
	image: {
		id: string;
		sha256: string;
		mime_type: string;
	};
};

type ChatMessageContentSticker = {
	type: "sticker";
	sticker: {};
};

type ChatMessageContentButton = {
	type: "button";
	button: {
		text: string;
	};
	context: {
		id: string;
	};
};
