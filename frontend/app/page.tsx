"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSendMessage = async (text: string) => {
    const newMessages = [...messages, { text, isUser: true }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: text }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessages([...newMessages, { text: data.reply, isUser: false }]);
  };

  return (
    <div className="h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="bg-white p-4 text-center text-xl font-semibold shadow-md">
        AI Chatbot
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-6">
        <ChatMessages messages={messages} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t bg-white">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
