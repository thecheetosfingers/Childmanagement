import React from 'react';
import { Users, Baby, GraduationCap, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Child {
  id: string;
  name: string;
  age: string;
  avatar: string;
}

interface Classroom {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  children: Child[];
}

interface ChildrenPageProps {
  attendance: {
    [key: string]: 'present' | 'absent' | undefined;
  };
}

const allClassrooms: Classroom[] = [
  {
    id: 'infant',
    name: 'Infant Room',
    icon: Baby,
    color: 'bg-pink-500',
    children: [
      { id: '1', name: 'Emma Thompson', age: '6 months', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
      { id: '2', name: 'Liam Johnson', age: '8 months', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
      { id: '3', name: 'Olivia Davis', age: '5 months', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
    ]
  },
  {
    id: 'transition',
    name: 'Transition Room',
    icon: School,
    color: 'bg-purple-500',
    children: [
      { id: '4', name: 'Noah Wilson', age: '18 months', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
      { id: '5', name: 'Ava Brown', age: '20 months', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
      { id: '6', name: 'Lucas Miller', age: '22 months', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
    ]
  },
  {
    id: 'prek3',
    name: 'Pre-K 3',
    icon: GraduationCap,
    color: 'bg-blue-500',
    children: [
      { id: '7', name: 'Isabella Taylor', age: '3 years', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
      { id: '8', name: 'Mason Anderson', age: '3 years', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
      { id: '9', name: 'Sophie Thomas', age: '3 years', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
    ]
  },
  {
    id: 'prek4',
    name: 'Pre-K 4',
    icon: GraduationCap,
    color: 'bg-green-500',
    children: [
      { id: '10', name: 'Ethan Moore', age: '4 years', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
      { id: '11', name: 'Mia Jackson', age: '4 years', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
      { id: '12', name: 'Alexander White', age: '4 years', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
    ]
  }
];

const ChildrenPage: React.FC<ChildrenPageProps> = ({ attendance }) => {
  const navigate = useNavigate();
  
  // Filter classrooms to only show present children
  const classrooms = allClassrooms.map(classroom => ({
    ...classroom,
    children: classroom.children.filter(child => attendance[child.id] === 'present')
  }));

  const totalPresent = classrooms.reduce((total, classroom) => total + classroom.children.length, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Present Children</h1>
          <p className="text-gray-600">Currently attending children by classroom</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          <Users className="w-5 h-5" />
          <span className="font-medium">
            {totalPresent} {totalPresent === 1 ? 'Child' : 'Children'} Present
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classrooms.map((classroom) => {
          const Icon = classroom.icon;
          return (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`${classroom.color} p-4 text-white flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <Icon className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">{classroom.name}</h2>
                </div>
                <div className="bg-white bg-opacity-25 px-3 py-1 rounded-full text-sm">
                  {classroom.children.length} present
                </div>
              </div>
              <div className="p-4">
                {classroom.children.length > 0 ? (
                  <div className="space-y-4">
                    {classroom.children.map((child) => (
                      <button 
                        key={child.id} 
                        onClick={() => navigate(`/child/${child.id}`)}
                        className="w-full flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <img
                          src={child.avatar}
                          alt={child.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">{child.name}</h3>
                          <p className="text-sm text-gray-500">{child.age}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No children present in this classroom
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildrenPage;