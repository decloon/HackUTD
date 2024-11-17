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

Dashboard.propTypes = {
  metricsData: PropTypes.shape({
    monthly_data: PropTypes.array,
    sentiment_scores: PropTypes.object
  }),
  setMetricsData: PropTypes.func.isRequired
};
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
    //   setSelectedFile(file);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5173/upload", {  // Updated URL
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMetricsData(data);
        console.log(data);
        setShowUpload(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please upload a CSV file");
      event.target.value = "";
    }
  };

  useEffect(() => {
    if (!metricsData) return;

    const monthlyData = metricsData.monthly_data;
    const sentimentScores = metricsData.sentiment_scores;

    const metricKey = activeTab.toLowerCase().replace(/ /g, '_');
    const sentiment = sentimentScores[`${metricKey}_sentiment`];
    const color = getColor(sentiment);

    const chartData = {
      labels: months,
      datasets: [
        {
          label: `Your ${activeTab}`,
          data: monthlyData.map((item) => item[metricKey] || 0),
          borderColor: color,
          backgroundColor: `${color}33`, // Adding transparency
          tension: 0.4,
          fill: true,
        },
      ],
    };

    setChartData(chartData);
    setSentimentScores(sentimentScores);
  }, [activeTab, metricsData]);

  const getUnit = (tab) => {
    if (tab.includes("Bill") || tab.includes("Expense")) return "(USD)";
    if (tab.includes("Usage")) return tab.includes("Electricity") ? "(kWh)" : "(gallons)";
    if (tab.includes("Waste")) return "(tons)";
    if (tab.includes("Emissions")) return "(TCO2e)";
    return "";
  };

  const getColor = (sentiment) => {
    if (sentiment === 1) return "rgb(34, 197, 94)";
    if (sentiment === -1) return "rgb(239, 68, 68)";
    return "rgb(255, 255, 255)"; // Neutral color
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

//   if (!metricsData) {
//     return (
//       <div className="min-h-screen w-full bg-[hsl(226,42%,20%)] p-6 flex items-center justify-center">
//         <p className="text-white">Please upload a CSV file to view the dashboard.</p>
//       </div>
//     );
//   }

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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
//   return (
//     <div className="min-h-screen w-full bg-[hsl(226,42%,20%)] p-6">
//       <div className="max-w-[1200px] mx-auto">
//         {/* {sentimentScores[`${activeTab.toLowerCase().replace(/ /g, '_')}_sentiment`] && (
//           <div className="mb-4 text-white">
//             Sentiment: {sentimentScores[`${activeTab.toLowerCase().replace(/ /g, '_')}_sentiment`] === 1 ? 'Positive' : 
//                        sentimentScores[`${activeTab.toLowerCase().replace(/ /g, '_')}_sentiment`] === -1 ? 'Negative' : 'Neutral'}
//           </div>
//         )} */}
//         <nav className="mb-8">
//           <ul className="flex gap-4 bg-[hsl(226,42%,15%)] p-2 rounded-lg">
//             {[
//               "Water Bill",
//               "Water Usage",
//               "Electricity Bill",
//               "Electricity Usage",
//               "Waste Produced",
//               "% Waste Recycled",
//               "HVAC Expenses",
//               "Lighting Expenses",
//               "GHG Emissions",
//             ].map((tab) => (
//               <li key={tab} className="flex-1">
//                 <button
//                   onClick={() => setActiveTab(tab)}
//                   className={`w-full py-3 px-4 rounded-lg transition-all duration-300 ${activeTab === tab ? "bg-[hsl(226,42%,25%)] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
//                 >
//                   {tab}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="bg-[hsl(226,42%,15%)] rounded-xl p-6 h-[600px]">
//           {chartData && <Line data={chartData} options={options} />}
//         </div>
//       </div>
//     </div>
//   );
// }
// Dashboard.propTypes = {
//   metricsData: PropTypes.shape({
//     monthly_data: PropTypes.array,
//     sentiment_scores: PropTypes.object
//   }),
//   setMetricsData: PropTypes.func.isRequired
// };

// export default Dashboard;