interface Props {
  sql: string;
}

const SQLPreview = ({ sql }: Props) => {
  if (!sql) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#090909] p-4 mt-4 shadow-[0_0_18px_rgba(249,115,22,0.08)]">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-300/80 mb-3">
        Generated SQL
      </p>

      <pre className="overflow-auto font-mono text-sm text-emerald-200 leading-relaxed">
        {sql}
      </pre>
    </div>
  );
};

export default SQLPreview;