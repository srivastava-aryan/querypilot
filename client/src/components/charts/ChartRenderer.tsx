import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
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
        backgroundColor: "rgba(16, 185, 129, 0.72)",
        borderColor: "rgba(249, 115, 22, 0.92)",
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(249, 115, 22, 0.82)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#d4d4d8",
          font: {
            family: "Inter",
          },
        },
      },
      tooltip: {
        backgroundColor: "#090909",
        titleColor: "#f5f5f5",
        bodyColor: "#d4d4d8",
        borderColor: "rgba(249, 115, 22, 0.45)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#a1a1aa",
        },
        grid: {
          color: "rgba(39, 39, 42, 0.7)",
        },
      },
      y: {
        ticks: {
          color: "#a1a1aa",
        },
        grid: {
          color: "rgba(39, 39, 42, 0.7)",
        },
      },
    },
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#090909] p-4 mt-6 shadow-[0_0_18px_rgba(249,115,22,0.08)]">
      <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-orange-300/80 mb-4">
        Analytics Chart
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartRenderer;