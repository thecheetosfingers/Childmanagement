import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DailyCheckins = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Check-ins</h1>
          <p className="text-gray-600">Today's check-in activity</p>
        </div>
        <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-semibold">38 Check-ins Today</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Add your daily check-ins content here */}
        <div className="p-6">
          <p className="text-gray-500">Daily check-in details and history will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckins;