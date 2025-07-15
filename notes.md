## Canonical Schema + Indexes (DB execution) ```sql
-- USERS table (basic info)
create table users (
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
```

## Schema Reference (developer readability)
```json
{
  "users": {
    "description": "Basic info about each user",
    "columns": {
      "id": "uuid, primary key, default uuid_generate_v4()",
      "full_name": "text, not null",
      "email": "text, unique",
      "phone": "text",
      "created_at": "timestamp with time zone, default now()"
    }
  },
  "slots": {
    "description": "Parking slot details, linked to owner",
    "columns": {
      "id": "uuid, primary key, default uuid_generate_v4()",
      "label": "text, not null",
      "location": "text (optional)",
      "owner_id": "uuid, references users(id)",
      "notes": "text",
      "created_at": "timestamp with time zone, default now()"
    }
  },
  "availabilities": {
    "description": "Time blocks during which a slot is available",
    "columns": {
      "id": "uuid, primary key, default uuid_generate_v4()",
      "slot_id": "uuid, references slots(id)",
      "available_from": "timestamp with time zone, not null",
      "available_until": "timestamp with time zone, not null",
      "created_at": "timestamp with time zone, default now()"
    },
    "relations": {
      "slot_id → slots.id": {
        "alias": "slots"
      }
    }
  },
  "bookings": {
    "description": "User bookings of a specific availability window",
    "columns": {
      "id": "uuid, primary key, default uuid_generate_v4()",
      "availability_id": "uuid, references availabilities(id)",
      "user_id": "uuid, references users(id)",
      "status": "text, default 'pending' (pending | confirmed | cancelled)",
      "message": "text",
      "created_at": "timestamp with time zone, default now()"
    }
  }
}
```

## Project structure
```
my-parking-app/
├─ src/
│  ├─ lib/
│  │  └─ supabase.js  ← where client lives
│  └─ ...             ← rest of app code
├─ .env.local         ← stays here
├─ package.json
├─ next.config.js
└─ ...
```

### ⛏ Routes You’ll Build (Pages under `/app`)
```
/app
├── page.js                ← Landing
├── slots/
│   └── page.js            ← List of available slots
├── slots/[id]/
│   └── page.js            ← View slot details, book it
├── bookings/
│   └── page.js            ← My bookings list
```

### 🔧 Components to Create
```
/components
├── SlotCard.jsx          ← Displays slot info (location, label)
├── BookingForm.jsx       ← Lets user select time, submit booking
├── Navbar.jsx
├── LoadingSpinner.jsx    ← Reusable UI for async states
```

### Make sure all your imports point to the new supabase client path:
```js
// BEFORE (if it was in root)
import { supabase } from './supabase';

// AFTER (once it's in src/lib/)
import { supabase } from '@/lib/supabase'; // if using alias

// OR
import { supabase } from '../../lib/supabase'; // if relative
```