import { useState, useEffect } from "react";
import { useRef } from "react";
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
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
    <div className="max-w-6xl mx-auto flex flex-col h-[90vh]">
      <div className="mb-6">
        <h2 className="text-4xl font-bold">AI Analytics Assistant</h2>
        <p className="text-slate-400 mt-2">
          Query your database using natural language
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {messages.length === 0 && (
          <div className="mb-8">
            <p className="text-slate-400 mb-4">Try asking:</p>

            <div className="flex flex-wrap gap-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => {setQuery(item)}}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-sm transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
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
            {/* AI Avatar */}
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
              AI
            </div>

            {/* Typing Bubble */}
            <div className="bg-slate-800 border border-slate-700 px-5 py-4 rounded-2xl flex gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></span>

              <span
                className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></span>

              <span
                className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"
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
