-- db/reseed.sql
-- ✅ Step 2: SQL Mock Data Seed (Slot → Avail → Booking)
-- 🔧 Stub user ID
-- Use your actual UUID for a user
-- or create a new user entry manually
-- Replace this if you already have a seeded or logged-in user
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM users WHERE id = '00000000-0000-0000-0000-000000000001'
  ) THEN
    INSERT INTO users (id, full_name, email)
    VALUES ('00000000-0000-0000-0000-000000000001', 'Test User', 'testuser@mock.dev');
  END IF;
END;
$$;

-- 🌐 Insert Slots
INSERT INTO slots (id, label, location, notes, owner_id)
VALUES
  ('00000000-0000-0000-0000-000000000101', 'P1', 'North Wing', 'Near entrance', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000102', 'P2', 'South Wing', 'Shaded spot', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000103', 'P3', 'Basement', 'Near elevator', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000104', 'P4', 'East Tower', 'Wide slot', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000105', 'P5', 'West Tower', 'Quiet zone', '00000000-0000-0000-0000-000000000001');

-- 🕐 Insert Availabilities (future time blocks)
INSERT INTO availabilities (id, slot_id, available_from, available_until)
VALUES
  -- P1
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000101', NOW() + INTERVAL '2 hour', NOW() + INTERVAL '4 hour'),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000101', NOW() + INTERVAL '5 hour', NOW() + INTERVAL '7 hour'),

  -- P2
  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000102', NOW() + INTERVAL '3 hour', NOW() + INTERVAL '5 hour'),
  ('00000000-0000-0000-0000-000000001004', '00000000-0000-0000-0000-000000000102', NOW() + INTERVAL '6 hour', NOW() + INTERVAL '8 hour'),

  -- P3
  ('00000000-0000-0000-0000-000000001005', '00000000-0000-0000-0000-000000000103', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hours'),
  ('00000000-0000-0000-0000-000000001006', '00000000-0000-0000-0000-000000000103', NOW() + INTERVAL '1 day 3 hours', NOW() + INTERVAL '1 day 5 hours'),

  -- P4
  ('00000000-0000-0000-0000-000000001007', '00000000-0000-0000-0000-000000000104', NOW() + INTERVAL '30 minutes', NOW() + INTERVAL '2 hours'),
  ('00000000-0000-0000-0000-000000001008', '00000000-0000-0000-0000-000000000104', NOW() + INTERVAL '6 hours', NOW() + INTERVAL '8 hours'),

  -- P5
  ('00000000-0000-0000-0000-000000001009', '00000000-0000-0000-0000-000000000105', NOW() + INTERVAL '12 hours', NOW() + INTERVAL '13 hours'),
  ('00000000-0000-0000-0000-000000001010', '00000000-0000-0000-0000-000000000105', NOW() + INTERVAL '13 hours', NOW() + INTERVAL '15 hours');

-- 📅 Insert Bookings (1–2 per availability)
INSERT INTO bookings (availability_id, user_id, status, message)
VALUES
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000001', 'confirmed', 'Test booking P1-1'),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000001', 'pending', 'Test booking P1-2'),

  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000001', 'cancelled', 'Test booking P2-1'),

  ('00000000-0000-0000-0000-000000001004', '00000000-0000-0000-0000-000000000001', 'confirmed', 'Test booking P2-2'),

  ('00000000-0000-0000-0000-000000001005', '00000000-0000-0000-0000-000000000001', 'pending', 'Test booking P3-1');

-- 👤 Same stub user
-- Slots P6–P10: Edge Cases
INSERT INTO slots (id, label, location, notes, owner_id)
VALUES
  ('00000000-0000-0000-0000-000000000106', 'P6', 'Edge A', 'No availabilities', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000107', 'P7', 'Edge B', 'Only past availability', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000108', 'P8', 'Edge C', 'Fully booked availability', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000109', 'P9', 'Edge D', 'Mixed availability', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000110', 'P10', 'Edge E', 'Cancelled booking only', '00000000-0000-0000-0000-000000000001');

-- ⏳ P7: Only past availability
INSERT INTO availabilities (id, slot_id, available_from, available_until)
VALUES
  ('00000000-0000-0000-0000-000000001011', '00000000-0000-0000-0000-000000000107', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day');

-- 📌 P8: Future availability, already booked
INSERT INTO availabilities (id, slot_id, available_from, available_until)
VALUES
  ('00000000-0000-0000-0000-000000001012', '00000000-0000-0000-0000-000000000108', NOW() + INTERVAL '1 hour', NOW() + INTERVAL '3 hour');

INSERT INTO bookings (availability_id, user_id, status, message)
VALUES
  ('00000000-0000-0000-0000-000000001012', '00000000-0000-0000-0000-000000000001', 'confirmed', 'Fully booked P8');

-- 🌓 P9: Mixed past + future
INSERT INTO availabilities (id, slot_id, available_from, available_until)
VALUES
  ('00000000-0000-0000-0000-000000001013', '00000000-0000-0000-0000-000000000109', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '2 hours'),
  ('00000000-0000-0000-0000-000000001014', '00000000-0000-0000-0000-000000000109', NOW() + INTERVAL '4 hours', NOW() + INTERVAL '6 hours');

-- ❌ P10: Booking was cancelled, still bookable
INSERT INTO availabilities (id, slot_id, available_from, available_until)
VALUES
  ('00000000-0000-0000-0000-000000001015', '00000000-0000-0000-0000-000000000110', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '4 hours');

INSERT INTO bookings (availability_id, user_id, status, message)
VALUES
  ('00000000-0000-0000-0000-000000001015', '00000000-0000-0000-0000-000000000001', 'cancelled', 'Cancelled P10');
