import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: Array.from({ length: 20 }, (_, i) => i + 1),
  datasets: [
    {
      label: "Win Probability",
      data: Array.from({ length: 20 }, () => Math.random()),
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.4,
    },
  ],
};

export default function Chart() {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
        }}
      />
    </div>
  );
}
