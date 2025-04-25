import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FetchLearningPathFromAI} from '../pages/FetchLearningPathFromAI'


const QuizCards = ({ quizData, topic, subject }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quizData?.questions?.length > 0) {
      setQuestions(quizData.questions);
    }
    setLoading(false);
  }, [quizData]);

  useEffect(() => {
    setSelectedOption(userAnswers[currentIdx] || null);
  }, [currentIdx, userAnswers]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedOption(null);
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = selectedOption;
    setUserAnswers(updatedAnswers);
    setCurrentIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = selectedOption;
    setUserAnswers(updatedAnswers);
    setCurrentIdx((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = selectedOption;
    setUserAnswers(updatedAnswers);
  
    let tempScore = 0;
    questions.forEach((q, idx) => {
      if (updatedAnswers[idx] === q.correctAnswer) {
        tempScore++;
      }
    });
  
    const correctAnswers = tempScore;
    setScore(tempScore);
    setQuizFinished(true);
  
    try {
      const response = await FetchLearningPathFromAI(topic, subject);
      navigate('/learning-path', { state: { topic, subject, data: response } });
    } catch (error) {
      console.error("Error fetching learning path:", error);
    }
  
    // ✅ Update progress
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Or get from context
      await axios.post("http://localhost:4000/user/updateProgress", {
        userId: user._id,
        topic,
        score: tempScore,
        correctAnswers,
      });
      console.log("✅ Progress updated successfully!");
    } catch (err) {
      console.error("❌ Failed to update progress", err);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (!questions || questions.length === 0) return <p>No quiz available. Please go back.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {!quizStarted ? (
        <button className="mx-auto bg-blue-600 text-white items-center px-6 py-2 rounded-lg block" onClick={startQuiz}>
        Start Quiz
      </button>
      
      ) : quizFinished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Your Score: {score}/{questions.length}
          </h2>
          <p className="text-gray-500">Redirecting to your learning path...</p>

        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4">
            Q{currentIdx + 1}. {questions[currentIdx].question}
          </h3>

          <div className="grid gap-4">
            {questions[currentIdx].options.map((opt, idx) => (
              <button
                key={idx}
                className={`border px-4 py-2 rounded-lg ${selectedOption === opt ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {currentIdx === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                disabled={!selectedOption}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizCards;
