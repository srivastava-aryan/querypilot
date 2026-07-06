interface Props {
  data: Record<string, any>[];
}

const ResultTable = ({ data }: Props) => {
  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-auto mt-6 border border-slate-700 rounded-xl">
      <table className="w-full border-collapse">
        <thead className="bg-slate-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left p-3 border-b border-slate-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-800"
            >
              {columns.map((col) => (
                <td key={col} className="p-3">
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