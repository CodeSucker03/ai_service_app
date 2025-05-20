"use client";

import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { chatBotResponse } from "@/lib/actions/general.action";


interface Message {
  id: string; // For unique key prop
  sender: "user" | "bot";
  text: string | null;
}

const Chatbox = () => {
  const [content, setContent] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // For auto-scrolling

  

  const chatBotRequest = async () => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + "-user", // Simple unique ID
      sender: "user",
      text: content,
    };

    // Add user message to conversation
    setConversation((prevConversation) => [...prevConversation, userMessage]);
    const originalContent = content; // Store original input
    setContent(""); // Clear input immediately
    setIsLoading(true);

    try {
      const botText = await chatBotResponse(originalContent); // Call the bot API
      const botMessage: Message = {
        id: Date.now().toString() + "-bot", // Simple unique ID
        sender: "bot",
        text: botText,
      };
      // Add bot message to conversation
      setConversation((prevConversation) => [...prevConversation, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      // Optionally, add an error message to the chat or restore user input
      // setContent(originalContent); // Or provide feedback in chat
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        sender: "bot",
        text: "Sorry, I couldn't get a response. Please try again.",
      };
      setConversation((prevConversation) => [
        ...prevConversation,
        errorMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // You might want to adjust overall padding and margins
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-6xl mx-auto pt-8">
      {" "}
      {/* Example: takes most of viewport height */}
      {/* Scrollable Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 border border-gray-300 rounded-lg mb-4 bg-n-11 shadow-md">
        {conversation.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
              {msg.sender == "bot" && (
                <img
                  src={"/assets/hero/robot.png"}
                  className="w-10 h-10 border-2 rounded-full overflow-hidden self-end"
                />
              )}
              <div
                className={`max-w-[70%] p-3 rounded-4xl shadow  ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white" // User message style (right)
                    : "bg-pink-600 text-gray-800" // Bot message style (left)
                }`}
              >
                {/* Basic sanitization for display, consider a library for robust XSS protection if content can be malicious */}
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
          </div>
        ))}
        {/* Dummy div to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-grow h-12 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white resize-none"
          placeholder={!isLoading ? "Enter your message..." : "..."}
          value={content}
          onChange={(e) => !isLoading && setContent(e.target.value)}
          disabled={isLoading}
        />
        <Button
          white
          onClick={chatBotRequest}
          disabled={!content.trim() || isLoading}
          className={undefined}
          href={undefined}
          px={undefined}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default Chatbox;
