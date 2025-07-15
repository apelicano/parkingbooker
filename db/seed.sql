-- Make sure UUID extension is enabled
create extension if not exists "uuid-ossp";

-- Clear existing data (in proper order to maintain FK constraints)
truncate table bookings restart identity cascade;
truncate table availabilities restart identity cascade;
truncate table slots restart identity cascade;
truncate table users restart identity cascade;

-- Insert a test user
insert into users (id, full_name, email, phone)
values (
  uuid_generate_v4(),
  'Juan Dela Cruz',
  'juan@example.com',
  '09171234567'
);

-- Insert a parking slot owned by the user
insert into slots (id, label, location, owner_id, notes)
values (
  uuid_generate_v4(),
  'P6',
  'East Tower - near elevator',
  (select id from users where email = 'juan@example.com'),
  'Shaded and close to entrance'
);

-- Insert availability for the slot
insert into availabilities (id, slot_id, available_from, available_until)
values (
  uuid_generate_v4(),
  (select id from slots where label = 'P6'),
  now(),
  now() + interval '4 hours'
);

-- Optional: Insert a booking for the availability
insert into bookings (id, availability_id, user_id, status, message)
values (
  uuid_generate_v4(),
  (select a.id from availabilities a join slots s on a.slot_id = s.id where s.label = 'P6'),
  (select id from users where email = 'juan@example.com'),
  'pending',
  'I’ll be parking around 2PM.'
);
