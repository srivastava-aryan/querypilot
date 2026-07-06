interface Props {
  sql: string;
}

const SQLPreview = ({ sql }: Props) => {
  if (!sql) return null;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mt-4">
      <p className="text-sm text-slate-400 mb-2">
        Generated SQL
      </p>

      <pre className="text-green-400 overflow-auto">
        {sql}
      </pre>
    </div>
  );
};

export default SQLPreview;