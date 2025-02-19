export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  allergies: string[];
  guardians: Guardian[];
  attendance: AttendanceRecord[];
  medications: Medication[];
  activities: ActivityLog[];
}

export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  isEmergencyContact: boolean;
}

export interface AttendanceRecord {
  id: string;
  childId: string;
  checkIn: string;
  checkOut: string | null;
  checkedInBy: string;
  checkedOutBy: string | null;
}

export interface Medication {
  id: string;
  childId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  lastAdministered: string | null;
}

export interface ActivityLog {
  id: string;
  childId: string;
  type: ActivityType;
  timestamp: string;
  notes: string;
  staff: string;
  mediaUrls?: string[]; // For photos and videos
  details: ActivityDetails;
}

export type ActivityType = 
  | 'photo' 
  | 'video' 
  | 'food' 
  | 'nap' 
  | 'potty' 
  | 'note' 
  | 'medication' 
  | 'incident' 
  | 'health_check';

export interface ActivityDetails {
  // Photo/Video details
  caption?: string;
  
  // Food details
  meal?: {
    type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
    foods: string[];
    portions?: string;
    finished?: 'all' | 'most' | 'some' | 'none';
  };
  
  // Nap details
  nap?: {
    startTime: string;
    endTime?: string;
    quality?: 'good' | 'fair' | 'poor';
  };
  
  // Potty details
  potty?: {
    type: 'wet' | 'bm' | 'both' | 'dry';
    success: boolean;
  };
  
  // Medication details
  medication?: {
    name: string;
    dosage: string;
    givenBy: string;
  };
  
  // Incident details
  incident?: {
    type: 'injury' | 'behavior' | 'illness' | 'other';
    severity: 'low' | 'medium' | 'high';
    actionTaken: string;
    witnesses?: string[];
  };
  
  // Health check details
  healthCheck?: {
    temperature?: number;
    symptoms?: string[];
    notes?: string;
    action?: string;
  };
}