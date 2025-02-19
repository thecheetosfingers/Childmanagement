import React from 'react';
import { Users, ArrowLeft, GraduationCap, Baby, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassroomRatio {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  capacity: number;
  currentChildren: number;
  teachers: number;
  ratio: string;
}

const classroomRatios: ClassroomRatio[] = [
  {
    id: 'infant',
    name: 'Infant Room',
    icon: Baby,
    color: 'bg-pink-500',
    capacity: 4,
    currentChildren: 3,
    teachers: 1,
    ratio: '4:1'
  },
  {
    id: 'transition',
    name: 'Transition Room',
    icon: School,
    color: 'bg-purple-500',
    capacity: 6,
    currentChildren: 4,
    teachers: 1,
    ratio: '6:1'
  },
  {
    id: 'prek3',
    name: 'Pre-K 3',
    icon: GraduationCap,
    color: 'bg-blue-500',
    capacity: 10,
    currentChildren: 8,
    teachers: 1,
    ratio: '10:1'
  },
  {
    id: 'prek4',
    name: 'Pre-K 4',
    icon: GraduationCap,
    color: 'bg-green-500',
    capacity: 12,
    currentChildren: 10,
    teachers: 1,
    ratio: '12:1'
  }
];

const ChildrenOverview = () => {
  const navigate = useNavigate();
  const totalChildren = classroomRatios.reduce((sum, room) => sum + room.currentChildren, 0);
  const totalCapacity = classroomRatios.reduce((sum, room) => sum + room.capacity, 0);
  const totalTeachers = classroomRatios.reduce((sum, room) => sum + room.teachers, 0);

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
          <h1 className="text-2xl font-bold text-gray-900">Children Overview</h1>
          <p className="text-gray-600">Classroom ratios and capacity information</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-semibold">{totalChildren}/{totalCapacity} Children</span>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <School className="w-5 h-5 mr-2" />
            <span className="font-semibold">{totalTeachers} Teachers</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classroomRatios.map(classroom => {
          const Icon = classroom.icon;
          const capacityPercentage = (classroom.currentChildren / classroom.capacity) * 100;
          const isNearCapacity = capacityPercentage >= 80;
          const isAtCapacity = capacityPercentage >= 100;

          return (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`${classroom.color} p-4 text-white flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <Icon className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">{classroom.name}</h2>
                </div>
                <div className="bg-white bg-opacity-25 px-3 py-1 rounded-full text-sm">
                  Ratio {classroom.ratio}
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Current Children</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {classroom.currentChildren}
                      <span className="text-base font-normal text-gray-500">
                        /{classroom.capacity}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Teachers</p>
                    <p className="text-2xl font-bold text-gray-900">{classroom.teachers}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capacity</span>
                    <span className={`font-medium ${
                      isAtCapacity ? 'text-red-600' :
                      isNearCapacity ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {Math.round(capacityPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isAtCapacity ? 'bg-red-500' :
                        isNearCapacity ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Available Spots</span>
                    <span className="font-medium">
                      {Math.max(0, classroom.capacity - classroom.currentChildren)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildrenOverview;