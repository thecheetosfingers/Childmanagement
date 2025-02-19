import React from 'react';
import { Users, Clock, MessageCircle, Sparkles, Camera, Video, UtensilsCrossed, Moon, Baby, StickyNote, Pill, AlertTriangle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  attendance: {
    [key: string]: 'present' | 'absent' | undefined;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ attendance }) => {
  const navigate = useNavigate();

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;

  const dashboardCards = [
    {
      title: "Total Children",
      value: presentCount.toString(),
      icon: Users,
      color: "bg-blue-500",
      route: "/children-overview"
    },
    {
      title: "Check-ins Today",
      value: presentCount.toString(),
      icon: Clock,
      color: "bg-green-500",
      route: "/daily-checkins"
    },
    {
      title: "Messages",
      value: "5",
      icon: MessageCircle,
      color: "bg-yellow-500",
      route: "/messages"
    },
    {
      title: "Activities Today",
      value: "12",
      icon: Sparkles,
      color: "bg-purple-500",
      route: "/daily-activities"
    }
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Sarah!</h1>
        <p className="text-gray-600">Here's what's happening at your center today</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            {...card}
            onClick={() => navigate(card.route)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivities />
        <ImportantNotices />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color,
  onClick 
}: DashboardCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-lg hover:scale-105 w-full"
    >
      <div className="flex items-center">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4 text-left">
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </button>
  );
};

const RecentActivities = () => {
  const activities = [
    { 
      time: '9:30 AM', 
      type: 'photo',
      text: 'New photos added from Morning Circle Time',
      icon: Camera,
      color: 'text-blue-500'
    },
    { 
      time: '9:15 AM', 
      type: 'medication',
      text: 'Medication administered to Emma Thompson',
      icon: Pill,
      color: 'text-purple-500'
    },
    { 
      time: '9:00 AM', 
      type: 'food',
      text: 'Breakfast served - Oatmeal with fruits',
      icon: UtensilsCrossed,
      color: 'text-green-500'
    },
    { 
      time: '8:45 AM', 
      type: 'nap',
      text: 'Nap time started for Butterfly Room',
      icon: Moon,
      color: 'text-indigo-500'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start">
            <div className="w-20 text-sm text-gray-500">{activity.time}</div>
            <activity.icon className={`w-5 h-5 mr-2 ${activity.color}`} />
            <div className="flex-1">{activity.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImportantNotices = () => {
  const notices = [
    { type: 'Allergy Alert', text: 'New peanut allergy reported for Sarah in Rainbow Room' },
    { type: 'Pickup Change', text: 'Different guardian picking up Michael today' },
    { type: 'Staff Update', text: 'Ms. Johnson will be out tomorrow' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Important Notices</h2>
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
            <div className="font-semibold text-red-600">{notice.type}</div>
            <div className="text-gray-600">{notice.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;