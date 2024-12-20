import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
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
  const [showUpload, setShowUpload] = useState(true);
  const [sentimentScores, setSentimentScores] = useState({});
  const [metricsData, setMetricsData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [fileContent, setFileContent] = useState(null); // Replace uploadedFile state with fileContent

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      // Store file content as blob
      const blob = new Blob([await file.arrayBuffer()], { type: 'text/csv' });
      setFileContent(blob);
      
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5173/upload", {  // Updated port
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMetricsData(data);
        // console.log(data);
        setShowUpload(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please upload a CSV file");
      event.target.value = "";
    }
  };

  const handlePredictions = async () => {
    if (!fileContent) return;
    
    // Create a new File object from the stored blob
    const file = new File([fileContent], 'data.csv', { type: 'text/csv' });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5173/predict", {  // Updated port
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error("Error getting predictions:", error);
    }
  };

  const getReductionPercentage = (metricKey) => {
    const reductions = {
      'water_usage': 0.15,      // 15% reduction
      'water_bill': 0.20,       // 20% reduction
      'electricity_usage': 0.25, // 25% reduction
      'electricity_bill': 0.20,  // 20% reduction
      'waste_produced': 0.10,    // 10% reduction
      'percent_waste_recycled': 0.15, // 15% reduction
      'hvac_expenses': 0.20,     // 20% reduction
      'lighting_expenses': 0.25, // 25% reduction
      'ghg_emissions': 0.20,     // 20% reduction
      'total_expense': 0.20      // 20% reduction
    };
    return 1 - (reductions[metricKey] || 0.20); // Default to 20% if metric not found
  };

  useEffect(() => {
    if (!metricsData) return;

    const monthlyData = metricsData.monthly_data;
    const sentimentScores = metricsData.sentiment_scores;

    let metricKey = activeTab.toLowerCase().replace(/ /g, '_');
    if (activeTab.toLowerCase().includes("recycled")) {
      metricKey = "percent_waste_recycled";
    }

    const sentiment = sentimentScores[`${metricKey}_sentiment`];
    const color = getColor(sentiment);

    const datasets = [
      {
        label: `Your ${activeTab}`,
        data: monthlyData.map((item) => item[metricKey] || 0),
        borderColor: color,
        backgroundColor: `${color}`,
        tension: 0.3,
        fill: true,
      }
    ];

    if (predictions && predictions[metricKey]) {
      const predictionData = Array(12).fill(null);
      const lowerBoundData = Array(12).fill(null);
      const reductionFactor = getReductionPercentage(metricKey);
      
      Object.entries(predictions[metricKey]).forEach(([month, value]) => {
        const monthIndex = months.findIndex(m => month.toLowerCase().includes(m.toLowerCase()));
        if (monthIndex >= 0 && monthIndex < 12) {
          predictionData[monthIndex] = value;
          lowerBoundData[monthIndex] = value * reductionFactor;
        }
      });

      // Add prediction line
      datasets.push({
        label: `Predicted ${activeTab}`,
        data: predictionData,
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        tension: 0.4,
        fill: true,
      });

      // Add lower bound line
      const reductionPercent = Math.round((1 - reductionFactor) * 100);
      datasets.push({
        label: `${activeTab} Following Sustainify's Optimizations`,
        data: lowerBoundData,
        borderColor: 'rgba(62,156,53, 1)',
        backgroundColor: 'rgba(62,156,53, 0.2)',
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
      });
    }

    const chartData = {
      labels: months,
      datasets: datasets,
    };

    setChartData(chartData);
    setSentimentScores(sentimentScores);
  }, [activeTab, metricsData, predictions]);

  const getUnit = (tab) => {
    if (tab.includes("Bill") || tab.includes("Expense")) return "(USD)";
    if (tab.includes("Usage")) return tab.includes("Electricity") ? "(kWh)" : "(gallons)";
    if (tab.includes("Waste")) return "(tons)";
    if (tab.includes("Emissions")) return "(TCO2e)";
    if (tab.includes("Recycled")) return "(%)";
    return "";
  };

  const getColor = (sentiment) => {
    if (sentiment === 1) return "rgb(34, 197, 94)";
    if (sentiment === -1) return "rgb(239, 68, 68)";
    return "rgb(255, 255, 255)";
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
        // Remove beginAtZero
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
          autoSkip: true,
          maxTicksLimit: 8
        },
        adapters: {
          date: false
        },
        grace: '5%'
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
          autoSkip: true
        }
      }
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
    <div className="w-full min-h-screen bg-[hsl(226,42%,20%)] p-6">
      <div className="max-w-[1200px] mx-auto">
        {showUpload ? (
          <div className="flex items-center justify-center h-[600px] bg-[hsl(226,42%,15%)] rounded-xl">
            <div className="text-center">
              <div className="mb-4">
                <UploadIcon className="w-16 h-16 text-white mx-auto" />
              </div>
              <label className="px-6 py-3 bg-[hsl(226,42%,25%)] text-white rounded-lg cursor-pointer hover:bg-[hsl(226,42%,30%)] transition-colors">
                Upload CSV File
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <nav className="flex-1">
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
              <button
                onClick={handlePredictions} // Remove the function call, just pass the reference
                className="ml-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Get Predictions
              </button>
            </div>
            <div className="bg-[hsl(226,42%,15%)] rounded-xl p-6 h-[600px]">
              {chartData && <Line data={chartData} options={options} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// If you really need PropTypes, define them here outside the component
Dashboard.propTypes = {
  // Only include props that are actually passed to the component
};

export default Dashboard;