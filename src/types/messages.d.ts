type ChatMessage = {
	id: string;
	created_at: Date;
	status: string;
	content: ChatMessageContent;
	// error?: any;
};

type ChatMessageContent =
	| ChatMessageContentTemplate
	| ChatMessageContentButton
	| ChatMessageContentUnsupported
	| ChatMessageContentText
	| ChatMessageContentImage
	| ChatMessageContentVideo
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
	image: ChatMessageMedia;
};

type ChatMessageContentVideo = {
	type: "video";
	video: ChatMessageMedia;
};

type ChatMessageContentSticker = {
	type: "sticker";
	sticker: ChatMessageMedia;
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

type ChatMessageMedia = {
	id: string;
	sha256: string;
	mime_type: string;
};
