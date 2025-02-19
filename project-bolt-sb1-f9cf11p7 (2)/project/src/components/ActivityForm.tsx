import React, { useState } from 'react';
import { Camera, Video, UtensilsCrossed, Moon, Baby, StickyNote, Pill, AlertTriangle, Heart, Eye } from 'lucide-react';
import type { ActivityType, ActivityLog } from '../types';
import MediaUpload from './MediaUpload';

interface ActivityFormProps {
  childId: string;
  onSubmit: (activity: Partial<ActivityLog>) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ childId, onSubmit }) => {
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [details, setDetails] = useState<Record<string, any>>({});
  
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

  const handleMediaUpload = (urls: string[]) => {
    setMediaUrls(prevUrls => [...prevUrls, ...urls]);
  };

  const renderActivitySpecificForm = () => {
    switch (selectedType) {
      case 'photo':
      case 'video':
        return (
          <div className="space-y-4">
            <MediaUpload
              childId={childId}
              onUploadComplete={handleMediaUpload}
              type={selectedType}
            />
            {mediaUrls.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Caption
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Add a caption..."
                />
                <div className="grid grid-cols-3 gap-4">
                  {mediaUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      {selectedType === 'photo' ? (
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <video
                          src={url}
                          className="w-full h-full object-cover rounded-lg"
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'food':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal Type
              </label>
              <select
                value={details.meal?.type || ''}
                onChange={(e) => setDetails({ ...details, meal: { ...details.meal, type: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select meal type...</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snack">Snack</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foods Eaten
              </label>
              <input
                type="text"
                value={details.meal?.foods?.join(', ') || ''}
                onChange={(e) => setDetails({
                  ...details,
                  meal: { ...details.meal, foods: e.target.value.split(',').map(f => f.trim()) }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter foods, separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portion Finished
              </label>
              <select
                value={details.meal?.finished || ''}
                onChange={(e) => setDetails({ ...details, meal: { ...details.meal, finished: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select amount eaten...</option>
                <option value="all">All</option>
                <option value="most">Most</option>
                <option value="some">Some</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        );

      case 'nap':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={details.nap?.startTime || ''}
                onChange={(e) => setDetails({ ...details, nap: { ...details.nap, startTime: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={details.nap?.endTime || ''}
                onChange={(e) => setDetails({ ...details, nap: { ...details.nap, endTime: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Quality
              </label>
              <select
                value={details.nap?.quality || ''}
                onChange={(e) => setDetails({ ...details, nap: { ...details.nap, quality: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select sleep quality...</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
        );

      case 'potty':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={details.potty?.type || ''}
                onChange={(e) => setDetails({ ...details, potty: { ...details.potty, type: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select type...</option>
                <option value="wet">Wet</option>
                <option value="bm">BM</option>
                <option value="both">Both</option>
                <option value="dry">Dry</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={details.potty?.success || false}
                onChange={(e) => setDetails({ ...details, potty: { ...details.potty, success: e.target.checked } })}
                className="h-4 w-4 text-indigo-600"
              />
              <label className="text-sm text-gray-700">
                Successfully used toilet
              </label>
            </div>
          </div>
        );

      case 'medication':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medication Name
              </label>
              <input
                type="text"
                value={details.medication?.name || ''}
                onChange={(e) => setDetails({ ...details, medication: { ...details.medication, name: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter medication name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage
              </label>
              <input
                type="text"
                value={details.medication?.dosage || ''}
                onChange={(e) => setDetails({ ...details, medication: { ...details.medication, dosage: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter dosage"
              />
            </div>
          </div>
        );

      case 'incident':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type
              </label>
              <select
                value={details.incident?.type || ''}
                onChange={(e) => setDetails({ ...details, incident: { ...details.incident, type: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select type...</option>
                <option value="injury">Injury</option>
                <option value="behavior">Behavior</option>
                <option value="illness">Illness</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={details.incident?.severity || ''}
                onChange={(e) => setDetails({ ...details, incident: { ...details.incident, severity: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select severity...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Taken
              </label>
              <textarea
                value={details.incident?.actionTaken || ''}
                onChange={(e) => setDetails({ ...details, incident: { ...details.incident, actionTaken: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Describe the action taken..."
              />
            </div>
          </div>
        );

      case 'health_check':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={details.healthCheck?.temperature || ''}
                onChange={(e) => setDetails({
                  ...details,
                  healthCheck: { ...details.healthCheck, temperature: parseFloat(e.target.value) }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter temperature"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms
              </label>
              <input
                type="text"
                value={details.healthCheck?.symptoms?.join(', ') || ''}
                onChange={(e) => setDetails({
                  ...details,
                  healthCheck: {
                    ...details.healthCheck,
                    symptoms: e.target.value.split(',').map(s => s.trim())
                  }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter symptoms, separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={details.healthCheck?.notes || ''}
                onChange={(e) => setDetails({
                  ...details,
                  healthCheck: { ...details.healthCheck, notes: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Additional notes..."
              />
            </div>
          </div>
        );

      case 'note':
      case 'observation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={details.notes || ''}
                onChange={(e) => setDetails({ notes: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                placeholder="Enter detailed notes..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Activity</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {activityTypes.map(({ type, icon: Icon, label, color }) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              setMediaUrls([]);
              setCaption('');
              setDetails({});
            }}
            className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all
              ${selectedType === type ? `${color} text-white` : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="space-y-4">
          {renderActivitySpecificForm()}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={() => {
                setSelectedType(null);
                setMediaUrls([]);
                setCaption('');
                setDetails({});
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSubmit({
                  childId,
                  type: selectedType,
                  timestamp: new Date().toISOString(),
                  notes: details.notes || '',
                  staff: 'Current Staff ID',
                  mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
                  details: {
                    ...details,
                    caption: caption || undefined
                  }
                });
                setSelectedType(null);
                setMediaUrls([]);
                setCaption('');
                setDetails({});
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityForm;