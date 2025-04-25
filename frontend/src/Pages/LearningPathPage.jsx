import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

export const LearningPathPage = () => {
  const location = useLocation();
  const { topic, subject } = location.state || {};
  const navigate=useNavigate()
  const [learningPath, setLearningPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  const [completedResources, setCompletedResources] = useState(() => {
    const saved = localStorage.getItem("completedResources");
    return saved ? JSON.parse(saved) : {};
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/recommendation/get-recommendation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, subject }),
        });

        const data = await response.json();
        setLearningPath(data.resources || []);
      } catch (error) {
        console.error("Error fetching learning path:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [topic, subject]);

  const toggleComplete = (type, topicIndex, resourceIndex) => {
    const key = `${type}-${topicIndex}-${resourceIndex}`;
    const updated = { ...completedResources, [key]: !completedResources[key] };
    setCompletedResources(updated);
    localStorage.setItem("completedResources", JSON.stringify(updated));
  };

  const toggleFavorite = (title) => {
    const updated = favorites.includes(title)
      ? favorites.filter((t) => t !== title)
      : [...favorites, title];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const getProgress = (idx) => {
    const item = learningPath[idx];
    const total =
      (item.Videos?.length || 0) +
      (item.Articles?.length || 0) +
      (item.Exercises?.length || 0);

    const completedCount = Object.keys(completedResources).filter((key) =>
      key.includes(`-${idx}-`) && completedResources[key]
    ).length;

    return total ? Math.round((completedCount / total) * 100) : 0;
  };

  const filterResources = (resList, type) =>
    filterType === "All" || filterType === type ? resList : [];

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-4">Your Personalized Learning Path</h2>

      <select
        onChange={(e) => setFilterType(e.target.value)}
        value={filterType}
        className="mb-6 p-2 border rounded-md"
      >
        <option value="All">Show All</option>
        <option value="Videos">Videos</option>
        <option value="Articles">Articles</option>
        <option value="Exercises">Exercises</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(learningPath) && learningPath.length > 0 ? (
        learningPath.map((item, idx) => (
          <div
            key={idx}
            className="border p-4 my-3 w-full max-w-2xl rounded-xl shadow-md bg-white"
          >
            <h2 className="text-xl font-bold mb-2">{item.Topic}</h2>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${getProgress(idx)}%` }}
              />
            </div>

            {filterResources(item.Videos, "Videos")?.length > 0 && (
              <>
                <h3 className="font-semibold mt-2">Videos:</h3>
                {item.Videos.map((video, i) => {
                  const [title, url] = video.split(" - ");
                  const key = `Videos-${idx}-${i}`;
                  return (
                    <div key={i} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={!!completedResources[key]}
                        onChange={() => toggleComplete("Videos", idx, i)}
                      />
                      <a
                        href={url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline mr-2"
                      >
                        {title || video}
                      </a>
                      <button
                        onClick={() => toggleFavorite(title)}
                        className="text-yellow-500 text-sm"
                      >
                        {favorites.includes(title) ? "★" : "☆"}
                      </button>
                    </div>
                  );
                })}
              </>
            )}

            {filterResources(item.Articles, "Articles")?.length > 0 && (
              <>
                <h3 className="font-semibold mt-3">Articles:</h3>
                {item.Articles.map((article, i) => {
                  const [title, url] = article.split(" - ");
                  const key = `Articles-${idx}-${i}`;
                  return (
                    <div key={i} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={!!completedResources[key]}
                        onChange={() => toggleComplete("Articles", idx, i)}
                      />
                      <a
                        href={url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline mr-2"
                      >
                        {title || article}
                      </a>
                      <button
                        onClick={() => toggleFavorite(title)}
                        className="text-yellow-500 text-sm"
                      >
                        {favorites.includes(title) ? "★" : "☆"}
                      </button>
                    </div>
                  );
                })}
              </>
            )}

            {filterResources(item.Exercises, "Exercises")?.length > 0 && (
              <>
                <h3 className="font-semibold mt-3">Exercises:</h3>
                {item.Exercises.map((exercise, i) => {
                  const key = `Exercises-${idx}-${i}`;
                  return (
                    <div key={i} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={!!completedResources[key]}
                        onChange={() => toggleComplete("Exercises", idx, i)}
                      />
                      <p className="mr-2">{exercise}</p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">No Learning Path Found!</p>
      )}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/quiz", { state: { topic, subject, difficulty: "hard" } })}
      >
        Test Your Mastery Again
      </button>

    </div>

  );
};

export default LearningPathPage;