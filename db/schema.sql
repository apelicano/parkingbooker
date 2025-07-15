-- DO NOT RUN IN PRODUCTION
-- Canonical schema for reference and dev use only

-- USERS table (basic info) create table users (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text unique,
  phone text,
  created_at timestamp with time zone default now()
);

-- SLOTS table (parking slot details)
create table slots (
  id uuid primary key default uuid_generate_v4(),
  label text not null,                -- e.g., "P6, East Tower"
  location text,                      -- optional: building/area
  owner_id uuid references users(id), -- the owner offering it
  notes text,
  created_at timestamp with time zone default now()
);

-- AVAILABILITIES table (when slots are open)
create table availabilities (
  id uuid primary key default uuid_generate_v4(),
  slot_id uuid references slots(id),
  available_from timestamp with time zone not null,
  available_until timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

-- BOOKINGS table (when someone books an available slot)
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  availability_id uuid references availabilities(id),
  user_id uuid references users(id),
  status text default 'pending',   -- pending / confirmed / cancelled
  message text,
  created_at timestamp with time zone default now()
);

create extension if not exists "uuid-ossp";

create index on slots(label);
create index on availabilities(slot_id);
create index on availabilities(available_from);
create index on bookings(user_id);