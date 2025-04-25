import React, { useEffect, useState } from 'react';
import QuizCards from '../components/QuizCards';

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('quizData');
    if (storedData) {
      setQuizData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
        Quiz Time! 🎯
      </h2>

      {!quizData ? (
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium">
            Oops! No Quiz Found.
          </p>
          <p className="text-sm mt-1">
            Please generate a quiz first to get started.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-4xl grid gap-6">
          <QuizCards quizData={quizData} subject={quizData.subject} topic={quizData.topic} />
        </div>
      )}
    </div>
  );
};

export default QuizPage;
