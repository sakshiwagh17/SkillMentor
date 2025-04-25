import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/quiz/get-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, topic, difficulty }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (data.success && data.questions) {
        const formattedData = {
          subject,
          topic,
          questions: data.questions,
        };
        localStorage.setItem("quizData", JSON.stringify(formattedData));
        navigate("/quiz");
      } else {
        alert("Failed to generate quiz");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-[350px] space-y-4'>
        <h2 className='text-xl font-semibold text-center'>Select Quiz Details</h2>
        <div>
          <label>Subject</label>
          <input type="text" placeholder='Eg: Java' value={subject} onChange={(e) => setSubject(e.target.value)} className='w-full border rounded-lg px-3 py-2 mt-1' />
        </div>
        <div>
          <label>Topic</label>
          <input type="text" placeholder='Eg: Loops' value={topic} onChange={(e) => setTopic(e.target.value)} className='w-full border rounded-lg px-3 py-2 mt-1' />
        </div>
        <div>
          <label>Difficulty</label>
          <select onChange={(e) => setDifficulty(e.target.value)} className='w-full border rounded-lg px-3 py-2 mt-1'>
            <option value="">-- Select --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className='bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition'>Generate Quiz</button>
      </form>
    </div>
  );
};

export default Onboarding;
