import React, { useState, useEffect} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  color: string;
}
const Card: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth < 768;
  const statCards: StatCardData[] = [
    {
      title: "Total Revenue",
      value: "$42.8k",
      change: "+12.4%",
      changeType: "positive",
      color: "blue",
    },
    {
      title: "Orders",
      value: "1,248",
      change: "+8.2%",
      changeType: "positive",
      color: "purple",
    },
    {
      title: "Conversion",
      value: "64.8%",
      change: "-2.1%",
      changeType: "negative",
      color: "amber",
    },
    {
      title: "Avg. Order",
      value: "$8,420",
      change: "+3.7%",
      changeType: "positive",
      color: "green",
    },
  ];
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: [12500, 19000, 15000, 18000, 22000, 19500, 24000],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "white",
        pointBorderWidth: 2,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context: unknown) {
            const ctx = context as { parsed: { y: number } };
            return `$${ctx.parsed.y.toLocaleString()}`;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Interaction",
        data: [725000, 980000, 656000, 890000, 515000, 372000],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(20, 184, 166, 0.7)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(139, 92, 246)",
          "rgb(245, 158, 11)",
          "rgb(236, 72, 153)",
          "rgb(20, 184, 166)",
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total User in a Month (for 6-month)",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: unknown) {
            const ctx = context as { parsed: { y: number } };
            return `${ctx.parsed.y} person`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const getColorClasses = (
    color: string,
    type: "bg" | "text" | "border" = "bg"
  ) => {
    const classes: Record<string, Record<string, string>> = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-300",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-300",
      },
      amber: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-300",
      },
    };
    return classes[color]?.[type] || "";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Performance Analytics
          </p>
        </header>
          <div className="lg:col-span-2">
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6`}>
              <div
                className={`bg-white rounded-lg shadow-sm p-4 border border-gray-100 ${
                  isMobile ? "w-full" : "w-1/2"
                }`}
              >
                <div className="h-64">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </div>
              <div
                className={`bg-white rounded-lg shadow-sm p-4 border border-gray-100 ${
                  isMobile ? "w-full" : "w-1/2"
                }`}
              >
                <div className="h-64">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl m-5 shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Monthly Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <div
                key={index}
                className={`${getColorClasses(
                  card.color,
                  "bg"
                )} p-4 rounded-lg border ${getColorClasses(
                  card.color,
                  "border"
                )}`}
              >
                <div
                  className={`${getColorClasses(
                    card.color,
                    "text"
                  )} font-bold text-2xl`}
                >
                  {card.value}
                </div>
                <div
                  className={`${getColorClasses(card.color, "text")} text-sm`}
                >
                  {card.title}
                </div>
                <div
                  className={`mt-2 text-xs ${
                    card.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  } flex items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        card.changeType === "positive"
                          ? "M5 15l7-7 7 7"
                          : "M19 9l-7 7-7-7"
                      }
                    />
                  </svg>
                  {card.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};
export default Card;
