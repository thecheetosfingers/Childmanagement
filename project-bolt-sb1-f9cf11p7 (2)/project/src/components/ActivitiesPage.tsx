import React, { useState } from 'react';
import { Camera, Video, UtensilsCrossed, Moon, Baby, StickyNote, Pill, AlertTriangle, Heart, Eye, Plus, Filter, Search } from 'lucide-react';
import ActivityForm from './ActivityForm';
import { isSupabaseConfigured } from '../lib/supabase';
import type { ActivityType } from '../types';

const students = [
  { id: '1', name: 'Emma Thompson', age: '6 months', classroom: 'infant', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  { id: '2', name: 'Liam Johnson', age: '8 months', classroom: 'infant', avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop' },
  { id: '3', name: 'Olivia Davis', age: '5 months', classroom: 'infant', avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop' },
  // ... other students
];

const activityTypes = [
  { type: 'photo' as ActivityType, icon: Camera, label: 'Photo', color: 'bg-blue-500' },
  { type: 'video' as ActivityType, icon: Video, label: 'Video', color: 'bg-purple-500' },
  { type: 'food' as ActivityType, icon: UtensilsCrossed, label: 'Food', color: 'bg-green-500' },
  { type: 'nap' as ActivityType, icon: Moon, label: 'Nap', color: 'bg-indigo-500' },
  { type: 'potty' as ActivityType, icon: Baby, label: 'Potty', color: 'bg-yellow-500' },
  { type: 'note' as ActivityType, icon: StickyNote, label: 'Note', color: 'bg-gray-500' },
  { type: 'medication' as ActivityType, icon: Pill, label: 'Medication', color: 'bg-red-500' },
  { type: 'incident' as ActivityType, icon: AlertTriangle, label: 'Incident', color: 'bg-orange-500' },
  { type: 'health_check' as ActivityType, icon: Heart, label: 'Health Check', color: 'bg-pink-500' },
  { type: 'observation' as ActivityType, icon: Eye, label: 'Observation', color: 'bg-teal-500' }
];

const ActivitiesPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClassroom = selectedClassroom === 'all' || student.classroom === selectedClassroom;
    return matchesSearch && matchesClassroom;
  });

  const selectedStudentData = students.find(s => s.id === selectedStudent);

  if (!isSupabaseConfigured()) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              Please connect to Supabase using the "Connect to Supabase" button in the top right corner to enable activities.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Activities</h1>
          <p className="text-gray-600">Record and track children's daily activities</p>
        </div>
        {selectedStudent && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Activity
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search children..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedClassroom}
                  onChange={(e) => setSelectedClassroom(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white"
                >
                  <option value="all">All Classrooms</option>
                  <option value="infant">Infant Room</option>
                  <option value="transition">Transition Room</option>
                  <option value="prek3">Pre-K 3</option>
                  <option value="prek4">Pre-K 4</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors
                    ${selectedStudent === student.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'hover:bg-gray-50'}`}
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-3 text-left">
                    <div className="text-sm font-medium">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.age}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {selectedStudent ? (
            <div className="space-y-6">
              {showForm ? (
                <ActivityForm
                  childId={selectedStudent}
                  onSubmit={(activity) => {
                    console.log('New activity:', activity);
                    setShowForm(false);
                  }}
                />
              ) : (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-6">
                    <img
                      src={selectedStudentData?.avatar}
                      alt={selectedStudentData?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold">{selectedStudentData?.name}</h2>
                      <p className="text-gray-600">{selectedStudentData?.age}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {activityTypes.map(({ type, icon: Icon, label, color }) => (
                      <button
                        key={type}
                        onClick={() => {
                          setShowForm(true);
                        }}
                        className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all
                          hover:bg-gray-50 border-2 border-transparent hover:border-${color.replace('bg-', '')}`}
                      >
                        <div className={`${color} p-3 rounded-full mb-2`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Timeline would go here */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Activities</h3>
                <div className="text-gray-500 text-center py-8">
                  No activities recorded today
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-gray-500">
                Select a child to view and record activities
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;