import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningPathCard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="font-bold text-lg mb-2">Continue Learning Path</h3>
      <p>Explore resources tailored to your needs.</p>
      <button
        onClick={() => navigate('/learning-path')}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
      >
        View Learning Path
      </button>
    </div>
  );
};

export default LearningPathCard;
