import type { Session } from "../../types/query";

interface Props {
  sessions: Session[];

  currentSession: string;

  onSelect: React.Dispatch<React.SetStateAction<string>>;

  onNewChat: () => void;
}

const Sidebar = ({ sessions, currentSession, onSelect, onNewChat }: Props) => {
  return (
    <aside className="w-72 border-r border-zinc-900 bg-[#090909]/95 backdrop-blur-sm p-4 flex flex-col">
      <button
        onClick={onNewChat}
        className="w-full rounded-2xl py-3 mb-6 border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 font-mono text-sm tracking-[0.18em] uppercase transition duration-300 hover:border-orange-400/60 hover:bg-orange-500/10 hover:shadow-[0_0_24px_rgba(249,115,22,0.16)]"
      >
        + New Chat
      </button>

      <div className="space-y-2 overflow-y-auto pr-1">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session.id)}
            className={`w-full text-left p-3 rounded-2xl border transition duration-300 ${
              currentSession === session.id
                ? "border-orange-400/70 bg-white/5 shadow-[0_0_22px_rgba(249,115,22,0.12)]"
                : "border-zinc-900 bg-[#0f0f0f] hover:border-orange-400/40 hover:bg-white/[0.03] hover:shadow-[0_0_22px_rgba(249,115,22,0.10)]"
            }`}
          >
            <span className="block font-mono text-xs uppercase tracking-[0.22em] text-orange-300/80 mb-1">
              Session
            </span>
            <span className="block text-sm text-zinc-100 truncate">
              {session.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
