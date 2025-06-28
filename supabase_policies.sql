-- Enable RLS on the rides table (if not already enabled)
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert rides (anonymous posting)
CREATE POLICY "Allow anonymous inserts" ON rides
FOR INSERT WITH CHECK (true);

-- Policy to allow anyone to read rides (public viewing)
CREATE POLICY "Allow anonymous reads" ON rides
FOR SELECT USING (true);

-- Policy to allow users to update their own rides (optional, for future use)
-- CREATE POLICY "Allow users to update own rides" ON rides
-- FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own rides (optional, for future use)
-- CREATE POLICY "Allow users to delete own rides" ON rides
-- FOR DELETE USING (auth.uid() = user_id); 