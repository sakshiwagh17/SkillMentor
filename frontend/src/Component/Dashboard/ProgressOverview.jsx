import React, { useEffect, useState } from "react";
import { BarChart2, PercentCircle, BookOpenText } from "lucide-react";

const ProgressOverview = () => {
  const [progress, setProgress] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    lastTopic: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`http://localhost:4000/user/get-progress/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        } else {
          console.error("Error fetching progress:", res.statusText);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading)
    return (
      <div className="p-6 bg-white rounded-2xl shadow animate-pulse">
        <p className="text-gray-500">Loading progress...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">📊 Progress Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
          <BarChart2 className="text-blue-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500">Quizzes Taken</p>
            <p className="text-lg font-bold text-gray-800">2</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
          <PercentCircle className="text-green-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-lg font-bold text-gray-800">80%</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
          <BookOpenText className="text-purple-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500">Last Topic</p>
            <p className="text-lg font-bold text-gray-800">{"Array "|| "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
