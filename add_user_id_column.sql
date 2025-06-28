-- Add user_id column to rides table (for future authentication)
ALTER TABLE rides ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create index for better performance
CREATE INDEX idx_rides_user_id ON rides(user_id);

-- Update the policies to use user_id when authentication is implemented
-- DROP POLICY IF EXISTS "Allow anonymous inserts" ON rides;
-- CREATE POLICY "Allow authenticated inserts" ON rides
-- FOR INSERT WITH CHECK (auth.uid() = user_id);

-- DROP POLICY IF EXISTS "Allow anonymous reads" ON rides;
-- CREATE POLICY "Allow public reads" ON rides
-- FOR SELECT USING (true); 