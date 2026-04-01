"use client";

import { useState } from "react";
import AppBottomNav from "@/components/navigation/AppBottomNav";

type ChatMessage = {
  id: string;
  role: "coach" | "user";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "coach",
      text: "Hi! I’m your functional health coach. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", text }]);
    setInput("");
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <section className="rounded-[28px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Chat
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">
          Chat 👋
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Message your functional health coach and ask follow-up questions about
          your action plan, biomarkers, and next steps.
        </p>
      </section>

      <section className="mt-5 rounded-[24px] border border-gray-200 bg-white p-4 shadow-soft">
        <div className="max-h-[44vh] space-y-3 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-gray-100 text-ink"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Write here"
            className="h-11 flex-1 rounded-full border border-gray-200 px-4 text-sm outline-none ring-accent focus:ring-2"
          />
          <button
            type="button"
            onClick={sendMessage}
            className="h-11 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white"
          >
            Send
          </button>
        </div>
      </section>

      <AppBottomNav />
    </main>
  );
}
