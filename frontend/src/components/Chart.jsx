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
  Filler, // Add this import
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin
);

export default function Chart({ simulationResults }) {
  if (!simulationResults) {
    return (
      <div
        style={{
          width: "100%",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No simulation data available
      </div>
    );
  }

  const { win_pct, sd } = simulationResults;

  // Check for the nuts or zero variance situation
  if (win_pct === 1 || sd === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(75, 192, 192, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          border: "2px solid rgba(75, 192, 192, 0.5)",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#4CAF50",
            marginBottom: "10px",
          }}
        >
          🎉 Congratulations! 🎉
        </div>
        <div>You have the nuts! (100% win probability)</div>
      </div>
    );
  }

  // Create x-axis points
  const xValues = [];
  const yValues = [];

  // Generate points for normal distribution
  const points = 100;
  const step = (6 * sd) / points; // 6 because we go from -3sd to +3sd

  // First pass: calculate all y values to find the maximum
  let maxY = 0;
  for (let x = win_pct - 3 * sd; x <= win_pct + 3 * sd; x += step) {
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - win_pct) / sd, 2));
    maxY = Math.max(maxY, y);
  }

  // Second pass: normalize values between 0 and 1
  for (let x = win_pct - 3 * sd; x <= win_pct + 3 * sd; x += step) {
    xValues.push(x);
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - win_pct) / sd, 2));
    yValues.push(y / maxY); // Normalize by dividing by the maximum value
  }

  const data = {
    labels: xValues.map((x) => x.toFixed(3)),
    datasets: [
      {
        label: `Win Probability (Mean: ${win_pct.toFixed(3)}, SD: ${sd.toFixed(
          3
        )})`,
        data: yValues,
        borderColor: "rgba(76, 175, 80, 1)",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            family: '"JetBrains Mono", monospace'
          }
        }
      },
      tooltip: {
        titleFont: {
          family: '"JetBrains Mono", monospace'
        },
        bodyFont: {
          family: '"JetBrains Mono", monospace'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Win Probability",
          font: {
            family: '"JetBrains Mono", monospace'
          }
        },
        ticks: {
          font: {
            family: '"JetBrains Mono", monospace'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: "Density",
          font: {
            family: '"JetBrains Mono", monospace'
          }
        },
        ticks: {
          font: {
            family: '"JetBrains Mono", monospace'
          }
        }
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
