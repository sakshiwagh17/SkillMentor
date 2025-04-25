import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaChalkboardTeacher, FaHistory, FaCog, FaHome } from 'react-icons/fa';

import ProgressOverview from './ProgressOverview';
import UserGreeting from './UserGreeting';
const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-[#111827] text-white transition-all duration-300 p-4 ${isOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="flex justify-between items-center mb-6">
                    {isOpen && <h1 className="text-xl font-bold">SkillMentor</h1>}
                    <FaBars
                        className="cursor-pointer text-xl"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
                <ul className="space-y-4">
                    <li className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
                        <FaHome />
                        {isOpen && 'Dashboard'}
                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
                        <FaChalkboardTeacher /><Link
                            to="/quiz"
                            className="flex items-center gap-2"
                        >
                            {isOpen && 'Quiz'}
                        </Link>
                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
                        <FaHistory /><Link
                            to="/learning-path"
                            className="flex items-center gap-2"
                        >
                            {isOpen && 'Learning Path'}
                        </Link>

                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
                        <FaCog />
                        {isOpen && 'Settings'}
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 overflow-auto">
                <h2 className="text-2xl font-semibold mb-4"><UserGreeting /></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-10 border rounded-lg shadow hover:shadow-lg transition">
                        <button className="font-semibold text-lg mb-2">Start New Quiz</button>
                        <p className="text-sm text-gray-600 mb-3">Ready to assess your knowledge?</p>

                        <Link to='/quiz-details' className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Start Quiz</Link>
                    </div>

                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                        <ProgressOverview />
                    </div>

                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg mb-2">Continue Learning Path</h3>
                        <p className="text-sm text-gray-600 mb-3">Pick up where you left off in your needs.</p>

                        <Link to='/learning-path' className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>
                            View Learning Path
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
