import type { Session } from "../../types/query";

interface Props {
  sessions: Session[];

  currentSession: string;

  onSelect: React.Dispatch<React.SetStateAction<string>>;

  onNewChat: () => void;
}

const Sidebar = ({ sessions, currentSession, onSelect, onNewChat }: Props) => {
  return (
    <aside className="w-72 border-r border-slate-800 p-4">
      <button
        onClick={onNewChat}
        className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 mb-6"
      >
        + New Chat
      </button>

      <div className="space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session.id)}
            className={`w-full text-left p-3 rounded-xl ${
              currentSession === session.id
                ? "bg-slate-800"
                : "hover:bg-slate-900"
            }`}
          >
            {session.title}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
