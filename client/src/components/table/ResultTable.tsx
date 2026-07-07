interface Props {
  data: Record<string, any>[];
}

const ResultTable = ({ data }: Props) => {
  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-auto mt-6 rounded-xl border border-zinc-800 bg-[#090909]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-white/[0.03]">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left p-3 border-b border-zinc-800 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-orange-300/80"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-900">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="transition-colors duration-200 hover:bg-white/[0.03]"
            >
              {columns.map((col) => (
                <td key={col} className="p-3 text-zinc-200">
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;