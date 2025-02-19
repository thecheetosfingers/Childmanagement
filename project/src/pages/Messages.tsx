import React, { useState } from 'react';
import { MessageCircle, ArrowLeft, Search, User, Users, Circle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: string;
  role: 'staff' | 'parent';
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    role: 'staff',
    subject: 'Weekly Update - Butterfly Room',
    content: 'Here is the weekly update for the Butterfly Room activities...',
    timestamp: '2025-02-15T10:30:00Z',
    read: false
  },
  {
    id: '2',
    sender: 'Mike Thompson',
    role: 'parent',
    subject: 'Absence Notification',
    content: 'Emma will be absent next Monday due to a doctor\'s appointment...',
    timestamp: '2025-02-15T09:15:00Z',
    read: false
  },
  {
    id: '3',
    sender: 'Lisa Chen',
    role: 'staff',
    subject: 'Upcoming Parent-Teacher Conference',
    content: 'Please find the schedule for next week\'s parent-teacher conferences...',
    timestamp: '2025-02-14T16:45:00Z',
    read: true
  },
  {
    id: '4',
    sender: 'David Wilson',
    role: 'parent',
    subject: 'Dietary Update',
    content: 'I wanted to inform you about Lucas\'s new dietary restrictions...',
    timestamp: '2025-02-14T14:20:00Z',
    read: true
  },
  {
    id: '5',
    sender: 'Rachel Adams',
    role: 'staff',
    subject: 'Spring Festival Planning',
    content: 'Let\'s start planning for our annual Spring Festival...',
    timestamp: '2025-02-14T11:00:00Z',
    read: true
  }
];

const Messages = () => {
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState<'staff' | 'parent'>('staff');
  const [readFilter, setReadFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = sampleMessages
    .filter(message => message.role === messageType)
    .filter(message => {
      if (readFilter === 'unread') return !message.read;
      if (readFilter === 'read') return message.read;
      return true;
    })
    .filter(message => 
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const unreadCount = sampleMessages.filter(m => !m.read).length;

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
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communication center</p>
        </div>
        <div className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span className="font-semibold">{unreadCount} New Messages</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMessageType('staff')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  messageType === 'staff'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Staff
              </button>
              <button
                onClick={() => setMessageType('parent')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  messageType === 'parent'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Parents
              </button>
            </div>
          </div>

          {/* Read/Unread Filter */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setReadFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                readFilter === 'all'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setReadFilter('unread')}
              className={`px-4 py-2 rounded-lg ${
                readFilter === 'unread'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setReadFilter('read')}
              className={`px-4 py-2 rounded-lg ${
                readFilter === 'read'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Read
            </button>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border transition-colors ${
                  message.read ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {message.read ? (
                      <CheckCircle2 className="w-5 h-5 text-gray-400 mr-3" />
                    ) : (
                      <Circle className="w-5 h-5 text-blue-500 mr-3" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{message.subject}</h3>
                      <p className="text-sm text-gray-500">
                        From: {message.sender} • {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    message.role === 'staff' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {message.role === 'staff' ? 'Staff' : 'Parent'}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 ml-8">
                  {message.content}
                </p>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No messages found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;