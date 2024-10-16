"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	ArrowLeft,
	Search,
	Send,
	Image,
	Paperclip,
	Plus,
	File,
	Phone,
	Video,
} from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for chat list
const chatList = [
	{
		id: 1,
		name: "Alice Johnson",
		phone: "+1 234 567 8901",
		lastChat: "2 min ago",
		lastMessage: "Hey, how are you doing?",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 2,
		name: "Bob Smith",
		phone: "+1 987 654 3210",
		lastChat: "1 hour ago",
		lastMessage: "Can you send me that file we discussed?",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 3,
		name: "Carol Williams",
		phone: "+1 555 123 4567",
		lastChat: "Yesterday",
		lastMessage: "Thanks for your help!",
		avatar: "/placeholder.svg?height=40&width=40",
	},
];

// Mock data for messages
const messages = [
	{
		id: 1,
		sender: "opponent",
		content: "Hi there! How are you?",
		timestamp: "10:00 AM",
	},
	{
		id: 2,
		sender: "user",
		content: "I'm doing great, thanks! How about you?",
		timestamp: "10:02 AM",
	},
	{
		id: 3,
		sender: "opponent",
		content: "I'm good too. Check out this image:",
		timestamp: "10:05 AM",
	},
	{
		id: 4,
		sender: "opponent",
		content: "/placeholder.svg?height=200&width=300",
		type: "image",
		timestamp: "10:05 AM",
	},
	{
		id: 5,
		sender: "user",
		content: "That's awesome! Here's the file you asked for.",
		timestamp: "10:10 AM",
	},
	{
		id: 6,
		sender: "user",
		content: "project_report.pdf",
		type: "file",
		timestamp: "10:10 AM",
	},
];

export default function ChatView() {
	const [selectedChat, setSelectedChat] = useState(null);
	const [isMobileMessageView, setIsMobileMessageView] = useState(false);

	const handleChatSelect = (chat) => {
		setSelectedChat(chat);
		setIsMobileMessageView(true);
	};

	const handleBackToList = () => {
		setIsMobileMessageView(false);
	};

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Chat List */}
			<div
				className={`w-full md:w-1/3 bg-white border-r ${
					isMobileMessageView ? "hidden md:block" : "block"
				}`}
			>
				<div className="p-4 border-b bg-gray-50">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<Input
							type="text"
							placeholder="Search chats..."
							className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>
				</div>
				<ScrollArea className="h-[calc(100vh-5rem)]">
					{chatList.map((chat) => (
						<div
							key={chat.id}
							className="p-4 border-b cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
							onClick={() => handleChatSelect(chat)}
						>
							<div className="flex items-center">
								<Avatar className="h-12 w-12 mr-4">
									<AvatarImage
										src={chat.avatar}
										alt={chat.name}
									/>
									<AvatarFallback>
										{chat.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="font-semibold text-gray-800">
										{chat.name}
									</div>
									<div className="text-sm text-gray-500">
										{chat.phone}
									</div>
									<div className="text-sm text-gray-600 mt-1 flex justify-between items-center">
										<span className="truncate max-w-[180px]">
											{chat.lastMessage}
										</span>
										<span className="text-xs text-gray-400">
											{chat.lastChat}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</ScrollArea>
			</div>

			{/* Chat Messages */}
			<div
				className={`flex-1 flex flex-col ${
					isMobileMessageView ? "block" : "hidden md:flex"
				}`}
			>
				{selectedChat && (
					<>
						<div className="p-4 border-b bg-white flex items-center justify-between">
							<div className="flex items-center">
								<Button
									variant="ghost"
									size="icon"
									className="mr-2 md:hidden"
									onClick={handleBackToList}
								>
									<ArrowLeft className="h-6 w-6" />
								</Button>
								<Avatar className="h-10 w-10 mr-4">
									<AvatarImage
										src={selectedChat.avatar}
										alt={selectedChat.name}
									/>
									<AvatarFallback>
										{selectedChat.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold text-gray-800">
										{selectedChat.name}
									</div>
									<div className="text-sm text-gray-500">
										{selectedChat.phone}
									</div>
								</div>
							</div>
							<div className="flex space-x-2">
								<Button variant="ghost" size="icon">
									<Phone className="h-5 w-5 text-gray-600" />
								</Button>
								<Button variant="ghost" size="icon">
									<Video className="h-5 w-5 text-gray-600" />
								</Button>
							</div>
						</div>
						<ScrollArea className="flex-1 p-4 bg-gray-50">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`mb-4 ${
										message.sender === "user"
											? "text-right"
											: "text-left"
									}`}
								>
									<div
										className={`inline-block p-3 rounded-lg ${
											message.sender === "user"
												? "bg-blue-500 text-white"
												: "bg-white text-gray-800"
										} shadow`}
									>
										{message.type === "image" ? (
											<img
												src={message.content}
												alt="Shared image"
												className="max-w-xs rounded"
											/>
										) : message.type === "file" ? (
											<div className="flex items-center">
												<File className="w-4 h-4 mr-2" />
												<span>{message.content}</span>
											</div>
										) : (
											message.content
										)}
									</div>
									<div className="text-xs text-gray-500 mt-1">
										{message.timestamp}
									</div>
								</div>
							))}
						</ScrollArea>
						<div className="p-4 border-t bg-white">
							<form className="flex items-center">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="mr-2 text-gray-500 hover:text-gray-700"
										>
											<Plus className="h-5 w-5" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-40">
										<div className="flex flex-col space-y-2">
											<Button
												variant="ghost"
												className="justify-start"
											>
												<Image className="h-4 w-4 mr-2" />
												Image
											</Button>
											<Button
												variant="ghost"
												className="justify-start"
											>
												<Paperclip className="h-4 w-4 mr-2" />
												File
											</Button>
										</div>
									</PopoverContent>
								</Popover>
								<Input
									type="text"
									placeholder="Type a message..."
									className="flex-1 mr-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
								/>
								<Button
									type="submit"
									size="icon"
									className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
								>
									<Send className="h-4 w-4" />
								</Button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
