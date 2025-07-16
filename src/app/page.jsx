// src/app/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SlotCard from '@/components/SlotCard';

export default function HomePage() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    async function fetchSlots() {
      const { data, error } = await supabase
        .from('slot_statuses')
        .select('*');


      if (error) {
        console.error('Error fetching slots:', error.message);
        return;
      }

      setSlots(data);
    }

    fetchSlots();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Available Parking Slots</h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const now = new Date();
          const futureAvailabilities = slot.availabilities?.filter(
            (a) => new Date(a.available_until) > now
          );

          let badge = 'Unavailable';
          if (slot.availabilities?.length > 0) {
            badge = futureAvailabilities.length > 0 ? 'Available' : 'Fully Booked';
          }

          return (
            <SlotCard
              key={slot.slot_id}
              id={slot.slot_id}
              label={slot.label}
              location={slot.location}
              notes={slot.notes}
              badge={badge}
            />
          );
        })}
      </ul>
    </main>
  );
}
