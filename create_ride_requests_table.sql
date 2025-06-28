-- Create ride_requests table
CREATE TABLE IF NOT EXISTS ride_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  to_location TEXT NOT NULL,
  leave_date DATE NOT NULL,
  contact TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ride_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for ride_requests table
-- Allow anyone to read ride requests
CREATE POLICY "Allow public read access to ride requests" ON ride_requests
  FOR SELECT USING (true);

-- Allow anyone to insert ride requests
CREATE POLICY "Allow public insert access to ride requests" ON ride_requests
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update ride requests (for status changes)
CREATE POLICY "Allow public update access to ride requests" ON ride_requests
  FOR UPDATE USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ride_requests_updated_at 
  BEFORE UPDATE ON ride_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 