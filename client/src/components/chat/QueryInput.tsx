interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const QueryInput = ({ query, setQuery, onSubmit, loading }: Props) => {
  return (
    <div className="flex gap-3 mt-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        placeholder="Ask your database..."
        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-medium"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default QueryInput;
