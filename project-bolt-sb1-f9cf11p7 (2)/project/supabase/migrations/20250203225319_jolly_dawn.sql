/*
  # Activities Schema Setup

  1. New Tables
    - `activities`
      - `id` (uuid, primary key)
      - `child_id` (uuid, foreign key)
      - `type` (activity_type enum)
      - `timestamp` (timestamptz)
      - `notes` (text)
      - `staff_id` (uuid, foreign key)
      - `media_urls` (text array)
      - `details` (jsonb)
      - `created_at` (timestamptz)

  2. Types
    - `activity_type` enum for all activity types

  3. Security
    - Enable RLS on activities table
    - Add policies for staff members to manage activities
*/

-- Create activity type enum
CREATE TYPE activity_type AS ENUM (
  'photo',
  'video',
  'food',
  'nap',
  'potty',
  'note',
  'medication',
  'incident',
  'health_check'
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  type activity_type NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  notes text,
  staff_id uuid NOT NULL,
  media_urls text[],
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Staff can view all activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can create activities"
  ON activities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = staff_id);

CREATE POLICY "Staff can update their own activities"
  ON activities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = staff_id)
  WITH CHECK (auth.uid() = staff_id);

-- Create indexes
CREATE INDEX activities_child_id_idx ON activities(child_id);
CREATE INDEX activities_timestamp_idx ON activities(timestamp);
CREATE INDEX activities_type_idx ON activities(type);