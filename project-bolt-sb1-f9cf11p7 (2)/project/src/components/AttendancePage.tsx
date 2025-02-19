import React, { useState } from 'react';
import { Baby, GraduationCap, School, Check, X } from 'lucide-react';

interface AttendanceStatus {
  [key: string]: 'present' | 'absent' | undefined;
}

interface AttendancePageProps {
  attendance: AttendanceStatus;
  onAttendanceChange: (attendance: AttendanceStatus) => void;
}

const classrooms = [
  {
    id: 'all',
    name: 'All Classrooms',
    icon: School,
  },
  {
    id: 'infant',
    name: 'Infant Room',
    icon: Baby,
  },
  {
    id: 'transition',
    name: 'Transition Room',
    icon: School,
  },
  {
    id: 'prek3',
    name: 'Pre-K 3',
    icon: GraduationCap,
  },
  {
    id: 'prek4',
    name: 'Pre-K 4',
    icon: GraduationCap,
  }
];

const students = [
  { id: '1', name: 'Emma Thompson', age: '6 months', classroom: 'infant', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '2', name: 'Liam Johnson', age: '8 months', classroom: 'infant', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
  { id: '3', name: 'Olivia Davis', age: '5 months', classroom: 'infant', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '4', name: 'Noah Wilson', age: '18 months', classroom: 'transition', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
  { id: '5', name: 'Ava Brown', age: '20 months', classroom: 'transition', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '6', name: 'Lucas Miller', age: '22 months', classroom: 'transition', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
  { id: '7', name: 'Isabella Taylor', age: '3 years', classroom: 'prek3', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '8', name: 'Mason Anderson', age: '3 years', classroom: 'prek3', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
  { id: '9', name: 'Sophie Thomas', age: '3 years', classroom: 'prek3', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '10', name: 'Ethan Moore', age: '4 years', classroom: 'prek4', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
  { id: '11', name: 'Mia Jackson', age: '4 years', classroom: 'prek4', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '12', name: 'Alexander White', age: '4 years', classroom: 'prek4', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
];

const AttendancePage: React.FC<AttendancePageProps> = ({ attendance, onAttendanceChange }) => {
  const [selectedClassroom, setSelectedClassroom] = useState('all');
  const [date] = useState(new Date().toLocaleDateString());

  const filteredStudents = students.filter(
    student => selectedClassroom === 'all' || student.classroom === selectedClassroom
  );

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    onAttendanceChange({
      ...attendance,
      [studentId]: status
    });
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = filteredStudents.filter(student => attendance[student.id] === 'present').length;
    const absent = filteredStudents.filter(student => attendance[student.id] === 'absent').length;
    const unmarked = total - present - absent;
    return { total, present, absent, unmarked };
  };

  const stats = getAttendanceStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Attendance</h1>
            <p className="text-gray-600">Mark attendance for {date}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <Check className="w-4 h-4" />
              <span>Present: {stats.present}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg">
              <X className="w-4 h-4" />
              <span>Absent: {stats.absent}</span>
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">
              Unmarked: {stats.unmarked}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {classrooms.map(classroom => {
            const Icon = classroom.icon;
            return (
              <button
                key={classroom.id}
                onClick={() => setSelectedClassroom(classroom.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${selectedClassroom === classroom.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{classroom.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classroom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={student.avatar}
                      alt={student.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {classrooms.find(c => c.id === student.classroom)?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.age}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${attendance[student.id] === 'present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${attendance[student.id] === 'absent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;