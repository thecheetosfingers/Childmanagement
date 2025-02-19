import React, { useState } from 'react';
import { School, Users, Calendar, Activity, ClipboardList, MessageCircle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ActivitiesPage from './components/ActivitiesPage';
import ChildrenPage from './components/ChildrenPage';
import AttendancePage from './components/AttendancePage';
import Sidebar from './components/Sidebar';
import ChildrenOverview from './pages/ChildrenOverview';
import DailyCheckins from './pages/DailyCheckins';
import Messages from './pages/Messages';
import DailyActivities from './pages/DailyActivities';
import ChildProfile from './pages/ChildProfile';

function App() {
  const [attendance, setAttendance] = useState<{ [key: string]: 'present' | 'absent' | undefined }>({});

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: School, path: '/' },
    { id: 'children', label: 'Children', icon: Users, path: '/children' },
    { id: 'attendance', label: 'Attendance', icon: Calendar, path: '/attendance' },
    { id: 'activities', label: 'Activities', icon: Activity, path: '/activities' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'reports', label: 'Reports', icon: ClipboardList, path: '/reports' }
  ];

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar menuItems={menuItems} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard attendance={attendance} />} />
            <Route path="/children" element={<ChildrenPage attendance={attendance} />} />
            <Route path="/attendance" element={
              <AttendancePage 
                attendance={attendance} 
                onAttendanceChange={setAttendance} 
              />
            } />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/children-overview" element={<ChildrenOverview />} />
            <Route path="/daily-checkins" element={<DailyCheckins />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/daily-activities" element={<DailyActivities />} />
            <Route path="/child/:id" element={<ChildProfile />} />
            <Route path="/reports" element={
              <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600">Reports and analytics coming soon...</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;