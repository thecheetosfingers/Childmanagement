import React, { useState } from 'react';
import { ArrowLeft, Calendar, AlertTriangle, Heart, MessageCircle, Clock, Save, X, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ChildProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initial child data
  const initialChild = {
    id,
    name: 'Emma Thompson',
    age: '6 months',
    classroom: 'Infant Room',
    avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=400&fit=crop',
    guardians: [
      {
        name: 'Sarah Thompson',
        relation: 'Mother',
        phone: '(555) 123-4567',
        email: 'sarah.thompson@email.com'
      },
      {
        name: 'Michael Thompson',
        relation: 'Father',
        phone: '(555) 765-4321',
        email: 'michael.thompson@email.com'
      }
    ],
    allergies: ['Peanuts', 'Dairy'],
    medications: [
      {
        name: 'Allergy Medicine',
        dosage: '2.5ml',
        frequency: 'Once daily',
        time: '10:00 AM'
      }
    ],
    schedule: {
      dropOff: '8:00 AM',
      pickup: '5:00 PM'
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [childData, setChildData] = useState(initialChild);
  const [newAllergy, setNewAllergy] = useState('');
  const [newGuardian, setNewGuardian] = useState({ name: '', relation: '', phone: '', email: '' });
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', time: '' });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving child data:', childData);
    setIsEditing(false);
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setChildData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    setChildData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addGuardian = () => {
    if (newGuardian.name && newGuardian.relation) {
      setChildData(prev => ({
        ...prev,
        guardians: [...prev.guardians, newGuardian]
      }));
      setNewGuardian({ name: '', relation: '', phone: '', email: '' });
    }
  };

  const removeGuardian = (index: number) => {
    setChildData(prev => ({
      ...prev,
      guardians: prev.guardians.filter((_, i) => i !== index)
    }));
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setChildData(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication]
      }));
      setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
    }
  };

  const removeMedication = (index: number) => {
    setChildData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/children')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Children
        </button>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={childData.avatar}
                alt={childData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700">
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={childData.name}
                    onChange={e => setChildData(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full px-3 py-2 border rounded-md"
                    placeholder="Child's Name"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={childData.age}
                      onChange={e => setChildData(prev => ({ ...prev, age: e.target.value }))}
                      className="block w-1/2 px-3 py-2 border rounded-md"
                      placeholder="Age"
                    />
                    <select
                      value={childData.classroom}
                      onChange={e => setChildData(prev => ({ ...prev, classroom: e.target.value }))}
                      className="block w-1/2 px-3 py-2 border rounded-md"
                    >
                      <option value="Infant Room">Infant Room</option>
                      <option value="Transition Room">Transition Room</option>
                      <option value="Pre-K 3">Pre-K 3</option>
                      <option value="Pre-K 4">Pre-K 4</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="time"
                      value={childData.schedule.dropOff}
                      onChange={e => setChildData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, dropOff: e.target.value }
                      }))}
                      className="block w-1/2 px-3 py-2 border rounded-md"
                    />
                    <input
                      type="time"
                      value={childData.schedule.pickup}
                      onChange={e => setChildData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, pickup: e.target.value }
                      }))}
                      className="block w-1/2 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{childData.name}</h1>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600">{childData.age} • {childData.classroom}</p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Drop-off: {childData.schedule.dropOff} • Pickup: {childData.schedule.pickup}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Medical Information</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Allergies</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {childData.allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center"
                  >
                    {allergy}
                    {isEditing && (
                      <button
                        onClick={() => removeAllergy(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={e => setNewAllergy(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                    placeholder="Add allergy"
                  />
                  <button
                    onClick={addAllergy}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Medications</h3>
              <div className="space-y-3">
                {childData.medications.map((medication, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 relative"
                  >
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={medication.name}
                          onChange={e => {
                            const newMedications = [...childData.medications];
                            newMedications[index] = { ...medication, name: e.target.value };
                            setChildData(prev => ({ ...prev, medications: newMedications }));
                          }}
                          className="block w-full px-3 py-2 border rounded-md"
                          placeholder="Medication name"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={medication.dosage}
                            onChange={e => {
                              const newMedications = [...childData.medications];
                              newMedications[index] = { ...medication, dosage: e.target.value };
                              setChildData(prev => ({ ...prev, medications: newMedications }));
                            }}
                            className="block w-1/3 px-3 py-2 border rounded-md"
                            placeholder="Dosage"
                          />
                          <input
                            type="text"
                            value={medication.frequency}
                            onChange={e => {
                              const newMedications = [...childData.medications];
                              newMedications[index] = { ...medication, frequency: e.target.value };
                              setChildData(prev => ({ ...prev, medications: newMedications }));
                            }}
                            className="block w-1/3 px-3 py-2 border rounded-md"
                            placeholder="Frequency"
                          />
                          <input
                            type="time"
                            value={medication.time}
                            onChange={e => {
                              const newMedications = [...childData.medications];
                              newMedications[index] = { ...medication, time: e.target.value };
                              setChildData(prev => ({ ...prev, medications: newMedications }));
                            }}
                            className="block w-1/3 px-3 py-2 border rounded-md"
                          />
                        </div>
                        <button
                          onClick={() => removeMedication(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="font-medium">{medication.name}</div>
                        <div className="text-sm text-gray-600">
                          {medication.dosage} • {medication.frequency}
                        </div>
                        <div className="text-sm text-gray-600">
                          Time: {medication.time}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="mt-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newMedication.name}
                        onChange={e => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                        className="block w-full px-3 py-2 border rounded-md"
                        placeholder="Medication name"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMedication.dosage}
                          onChange={e => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                          className="block w-1/3 px-3 py-2 border rounded-md"
                          placeholder="Dosage"
                        />
                        <input
                          type="text"
                          value={newMedication.frequency}
                          onChange={e => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                          className="block w-1/3 px-3 py-2 border rounded-md"
                          placeholder="Frequency"
                        />
                        <input
                          type="time"
                          value={newMedication.time}
                          onChange={e => setNewMedication(prev => ({ ...prev, time: e.target.value }))}
                          className="block w-1/3 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <button
                        onClick={addMedication}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mt-2"
                      >
                        Add Medication
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Guardian Information</h2>
            </div>
            
            <div className="space-y-4">
              {childData.guardians.map((guardian, index) => (
                <div
                  key={index}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <input
                          type="text"
                          value={guardian.name}
                          onChange={e => {
                            const newGuardians = [...childData.guardians];
                            newGuardians[index] = { ...guardian, name: e.target.value };
                            setChildData(prev => ({ ...prev, guardians: newGuardians }));
                          }}
                          className="block w-2/3 px-3 py-2 border rounded-md"
                          placeholder="Guardian name"
                        />
                        <input
                          type="text"
                          value={guardian.relation}
                          onChange={e => {
                            const newGuardians = [...childData.guardians];
                            newGuardians[index] = { ...guardian, relation: e.target.value };
                            setChildData(prev => ({ ...prev, guardians: newGuardians }));
                          }}
                          className="block w-1/3 ml-2 px-3 py-2 border rounded-md"
                          placeholder="Relation"
                        />
                      </div>
                      <input
                        type="tel"
                        value={guardian.phone}
                        onChange={e => {
                          const newGuardians = [...childData.guardians];
                          newGuardians[index] = { ...guardian, phone: e.target.value };
                          setChildData(prev => ({ ...prev, guardians: newGuardians }));
                        }}
                        className="block w-full px-3 py-2 border rounded-md"
                        placeholder="Phone number"
                      />
                      <input
                        type="email"
                        value={guardian.email}
                        onChange={e => {
                          const newGuardians = [...childData.guardians];
                          newGuardians[index] = { ...guardian, email: e.target.value };
                          setChildData(prev => ({ ...prev, guardians: newGuardians }));
                        }}
                        className="block w-full px-3 py-2 border rounded-md"
                        placeholder="Email address"
                      />
                      <button
                        onClick={() => removeGuardian(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{guardian.name}</div>
                          <div className="text-sm text-gray-600">{guardian.relation}</div>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="text-gray-600">
                          Phone: {guardian.phone}
                        </div>
                        <div className="text-gray-600">
                          Email: {guardian.email}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newGuardian.name}
                        onChange={e => setNewGuardian(prev => ({ ...prev, name: e.target.value }))}
                        className="block w-2/3 px-3 py-2 border rounded-md"
                        placeholder="Guardian name"
                      />
                      <input
                        type="text"
                        value={newGuardian.relation}
                        onChange={e => setNewGuardian(prev => ({ ...prev, relation: e.target.value }))}
                        className="block w-1/3 px-3 py-2 border rounded-md"
                        placeholder="Relation"
                      />
                    </div>
                    <input
                      type="tel"
                      value={newGuardian.phone}
                      onChange={e => setNewGuardian(prev => ({ ...prev, phone: e.target.value }))}
                      className="block w-full px-3 py-2 border rounded-md"
                      placeholder="Phone number"
                    />
                    <input
                      type="email"
                      value={newGuardian.email}
                      onChange={e => setNewGuardian(prev => ({ ...prev, email: e.target.value }))}
                      className="block w-full px-3 py-2 border rounded-md"
                      placeholder="Email address"
                    />
                    <button
                      onClick={addGuardian}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Add Guardian
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;

export default ChildProfile