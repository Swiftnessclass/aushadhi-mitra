"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type MessagePart = {
  type: "list" | "text";
  content: string;
};

type ChatMessage = {
  role: "bot" | "user";
  text: string | MessagePart[];
};

export default function ChatBotPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Explicit return type so TypeScript knows the array shape
  const formatMessage = (text: string): MessagePart[] => {
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        if (
          line.trim().startsWith("*") ||
          line.trim().match(/^\d+\./)
        ) {
          return { type: "list", content: line.trim() } as MessagePart;
        }
        return { type: "text", content: line.trim() } as MessagePart;
      });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", text: input },
    ];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const formattedReply = formatMessage(data.reply);

      setMessages((prev: ChatMessage[]) => [
        ...prev,
        { role: "bot", text: formattedReply },
      ]);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      setMessages((prev: ChatMessage[]) => [
        ...prev,
        {
          role: "bot",
          text: [{ type: "text", content: `Something went wrong: ${message}` }],
        },
      ]);
    }

    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-2 text-blue-800">
        Aushadhi Mitra Chatbot
      </h1>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
      >
        ← Back
      </button>

      {/* Chat Box */}
      <div className="border p-4 rounded h-96 overflow-y-auto bg-gray-50 shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "bot"
                ? "text-left text-blue-800"
                : "text-right text-green-700"
            }`}
          >
            <div className="inline-block px-4 py-2 rounded bg-white shadow max-w-[90%]">
              {Array.isArray(msg.text)
                ? msg.text.map((part, i) =>
                    part.type === "list" ? (
                      <li
                        key={i}
                        className="ml-4 list-disc text-gray-800"
                      >
                        {part.content}
                      </li>
                    ) : (
                      <p key={i} className="mb-1 text-gray-800">
                        {part.content}
                      </p>
                    )
                  )
                : (
                  <p className="text-gray-800">{msg.text}</p>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
