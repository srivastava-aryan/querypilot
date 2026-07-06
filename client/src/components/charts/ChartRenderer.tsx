import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Props {
  data: Record<string, any>[];
}

const ChartRenderer = ({ data }: Props) => {
  if (!data.length) return null;

  const sample = data[0];
  const keys = Object.keys(sample);

  const labelKey =
    keys.find((key) => typeof sample[key] === "string") ?? keys[0];

  const valueKey =
    keys.find((key) => {
      const value = sample[key];
      return (
        typeof value === "number" ||
        (typeof value === "string" && !Number.isNaN(Number(value)))
      );
    }) ?? keys[1];

  if (!labelKey || !valueKey) return null;

  const chartData = {
    labels: data.map((item) => item[labelKey]),
    datasets: [
      {
        label: valueKey,
        data: data.map((item) => Number(item[valueKey])),
      },
    ],
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Analytics Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartRenderer;