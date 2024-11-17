import { useEffect, useState } from "react";
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
  Legend,
);
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Water Usage");
  const [chartData, setChartData] = useState(null);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const generateRandomData = () => {
    return months.map(() => Math.floor(Math.random() * 1000) + 100);
  };

  const generatePredictedData = () => {
    return months.map(() => Math.floor(Math.random() * 1000) + 200);
  };

  const generatePredictedDataAfterAdvice = () => {
    return months.map(() => Math.floor(Math.random() * 700) + 200);
  };
  
  useEffect(() => {
    const data = {
      labels: months,
      datasets: [
        {
            label: `Your ${activeTab}`,
            data: generateRandomData(),
            borderColor: "rgb(239, 68, 68)",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            tension: 0.4,
            fill: true,
        },
        {
            label: `Your predicted ${activeTab} over the next year`,
            data: generatePredictedData(),
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            tension: 0.4,
            fill: true,
        },
        {
            label: `Your predicted ${activeTab} if you follow through with our advice`,
            data: generatePredictedDataAfterAdvice(),
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            tension: 0.4,
            fill: true,
          },
      ],
    };
    setChartData(data);
  }, [activeTab]);

  const getUnit = (tab) => {
    if (tab.includes("Bill") || tab.includes("Expense")) return "(USD)";
    if (tab.includes("Usage")) return tab.includes("Electricity") ? "(kWh)" : "(gallons)";
    if (tab.includes("Waste")) return "(tons)";
    if (tab.includes("Emissions")) return "(TCO2e)";
    return "";
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: "easeInOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `${activeTab} ${getUnit(activeTab)}`,
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${getUnit(activeTab)}${value}`;
          },
        },
      },
    },
  };
  return (
    <div className="min-h-screen w-full bg-[hsl(226,42%,20%)] p-6">
      <div className="max-w-[1200px] mx-auto">
        <nav className="mb-8">
          <ul className="flex gap-4 bg-[hsl(226,42%,15%)] p-2 rounded-lg">
            {[
              
              "Water Bill",
              "Water Usage",
              "Electricity Bill",
              "Electricity Usage",
              "Waste Produced",
              "% Waste Recycled",
              "HVAC Expenses",
              "Lighting Expenses",
              "GHG Emissions",
            ].map((tab) => (
              <li key={tab} className="flex-1">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full py-3 px-4 rounded-lg transition-all duration-300 ${activeTab === tab ? "bg-[hsl(226,42%,25%)] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="bg-[hsl(226,42%,15%)] rounded-xl p-6 h-[600px]">
          {chartData && <Line data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
}


export default Dashboard;