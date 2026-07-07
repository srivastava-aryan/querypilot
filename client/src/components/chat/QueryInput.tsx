interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const QueryInput = ({ query, setQuery, onSubmit, loading }: Props) => {
  return (
    <div className="flex gap-3 mt-4 sticky bottom-0 pb-1 bg-gradient-to-t from-[#080808] via-[#080808]/95 to-transparent pt-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        placeholder="Ask your database..."
        className="flex-1 rounded-2xl border border-zinc-800 bg-[#0d0d0d] px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition duration-300 focus:border-orange-400/70 focus:shadow-[0_0_24px_rgba(249,115,22,0.12)]"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/15 px-5 py-3 font-mono text-sm tracking-[0.18em] uppercase text-emerald-200 transition duration-300 hover:border-orange-400/70 hover:bg-orange-500/10 hover:text-orange-100 hover:shadow-[0_0_24px_rgba(249,115,22,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default QueryInput;
