import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

import QueryInput from "./QueryInput";
import MessageBubble from "./MessageBubble";

import type { HistoryMessage, Message } from "../../types/query";

interface Props {
  sessionId: string;
}

const ChatBox = ({ sessionId }: Props) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [tagline, setTagline] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const text = "Terminal-grade SQL intelligence, without the terminal friction.";
    let index = 0;

    setTagline("");

    const timer = window.setInterval(() => {
      index += 1;
      setTagline(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [sessionId]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setMessages([]);

        const response = await api.get(`/history/${sessionId}`);

        const formatted = response.data.map((msg: HistoryMessage) => ({
          role: msg.role,
          content: msg.content,
          sql: msg.sql_query,
          data: msg.data || [],
        }));

        setMessages(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await api.post("/query", {
        sessionId: sessionId,
        question: query,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: "Query executed successfully.",
        sql: response.data.sql,
        data: response.data.data || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setQuery("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Show all users",
    "Total orders by status",
    "Top 5 customers",
    "Revenue by country",
    "Orders placed this month",
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[90vh] text-zinc-100">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-7"
      >
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-300/80 mb-3">
          AI SQL Console
        </p>

        <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-50">
          AI Analytics Assistant
        </h2>

        <p className="mt-3 max-w-2xl text-zinc-400 text-base leading-relaxed">
          {tagline}
          <span className="ml-1 inline-block text-emerald-300 animate-pulse">|</span>
        </p>
      </motion.section>

      <div className="flex-1 overflow-y-auto pr-2">
        {messages.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-300/80 mb-4">
              Try asking
            </p>

            <div className="flex flex-wrap gap-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setQuery(item);
                  }}
                  className="rounded-full border border-zinc-800 bg-[#0f0f0f] px-4 py-2 text-sm text-zinc-200 transition duration-300 hover:border-orange-400/60 hover:bg-white/[0.03] hover:shadow-[0_0_18px_rgba(249,115,22,0.12)]"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.section>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            role={msg.role}
            content={msg.content}
            sql={msg.sql}
            data={msg.data}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center font-mono text-xs tracking-[0.22em] text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.14)]">
              AI
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#0f0f0f] px-5 py-4 flex gap-2 shadow-[0_0_20px_rgba(249,115,22,0.08)]">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce"></span>

              <span
                className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></span>

              <span
                className="w-2 h-2 rounded-full bg-orange-300 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <QueryInput
        query={query}
        setQuery={setQuery}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default ChatBox;
