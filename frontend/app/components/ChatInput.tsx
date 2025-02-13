"use client";
import { useState } from "react";

export default function ChatInput({ onSendMessage }: { onSendMessage: (msg: string) => void }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center bg-white p-4 border-t rounded-b-lg shadow-md">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="flex-grow p-3 border rounded-full shadow-sm text-gray-700"
      />
      <button onClick={handleSend} className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-full">
        Send
      </button>
    </div>
  );
}
