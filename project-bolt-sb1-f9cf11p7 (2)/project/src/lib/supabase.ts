import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseKey);
};

// Only create client if configuration exists
export const supabase = isSupabaseConfigured() 
  ? createClient<Database>(supabaseUrl!, supabaseKey!)
  : null;

export const uploadMedia = async (file: File, childId: string): Promise<string | null> => {
  if (!supabase) {
    console.error('Supabase is not configured');
    return null;
  }

  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${childId}/${Math.random()}.${fileExt}`;
  const filePath = `media/${fileName}`;

  const { data, error } = await supabase.storage
    .from('activities')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('activities')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const getActivities = async (filters?: {
  childId?: string;
  type?: string;
  search?: string;
}) => {
  if (!supabase) {
    console.error('Supabase is not configured');
    return [];
  }

  let query = supabase
    .from('activities')
    .select('*')
    .order('timestamp', { ascending: false });

  if (filters?.childId) {
    query = query.eq('child_id', filters.childId);
  }

  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type);
  }

  if (filters?.search) {
    query = query.or(`notes.ilike.%${filters.search}%,details->>'caption'.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }

  return data;
};

export const createActivity = async (activity: {
  childId: string;
  type: string;
  notes?: string;
  mediaUrls?: string[];
  details: Record<string, any>;
}) => {
  if (!supabase) {
    console.error('Supabase is not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('activities')
    .insert([
      {
        child_id: activity.childId,
        type: activity.type,
        notes: activity.notes || '',
        staff_id: (await supabase.auth.getUser()).data.user?.id,
        media_urls: activity.mediaUrls,
        details: activity.details
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating activity:', error);
    return null;
  }

  return data;
};