-- db/wipe.sql
-- ✅ Step 1: SQL to Wipe Clean
-- Disable constraints temporarily (if needed)
-- BEGIN;

-- Delete in dependency order
DELETE FROM bookings;
DELETE FROM availabilities;
DELETE FROM slots;

-- Optionally delete test users (if you use stub users)
-- DELETE FROM users WHERE email LIKE '%@test.dev';

-- COMMIT;
