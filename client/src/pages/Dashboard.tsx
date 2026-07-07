import { useEffect, useState } from "react";
import type { Session } from "../types/query";
import Sidebar from "../components/layout/Sidebar";
import ChatBox from "../components/chat/ChatBox";

import api from "../services/api";

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const [sessionId, setSessionId] = useState(crypto.randomUUID());

  const loadSessions = async () => {
    const response = await api.get("/sessions");

    setSessions(response.data);
  };

  useEffect(() => {
    const initialize = async () => {
      const response = await api.get("/sessions");

      setSessions(response.data);

      if (response.data.length > 0) {
        setSessionId(response.data[0].id);
      }
    };

    initialize();
  }, []);

  const handleNewChat = async () => {
    const newId = crypto.randomUUID();

    setSessionId(newId);

    await loadSessions();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 flex">
      <Sidebar
        sessions={sessions}
        currentSession={sessionId}
        onSelect={setSessionId}
        onNewChat={handleNewChat}
      />

      <main className="flex-1 p-6 lg:p-8">
        <ChatBox sessionId={sessionId} />
      </main>
    </div>
  );
};

export default Dashboard;
