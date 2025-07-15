// src/app/slot/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SlotDetailsPage() {
  const { id } = useParams(); // ⬅️ Now a hook, not a server param
  const [slot, setSlot] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const { data, error } = await supabase
        .from('slots')
        .select(`
          id, label, location, notes,
          availabilities (
            id,
            available_from,
            available_until
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching slot details:', error.message);
        return;
      }

      setSlot(data);
      setAvailabilities(data.availabilities || []);
    }

    fetchData();
  }, [id]);

  async function bookSlot(availabilityId) {
    const userId = 'e693d6d0-dc1d-47cb-9021-a4dd6d4611ef'; // TEMP stub user

    const { error } = await supabase.from('bookings').insert([
      {
        availability_id: availabilityId,
        user_id: userId,
        status: 'pending',
      },
    ]);

    if (error) {
      console.error('Booking failed:', error.message);
      setStatus('❌ Booking failed.');
    } else {
      setStatus('✅ Booking successful!');
    }

    setTimeout(() => setStatus(''), 3000);
  }

  if (!slot) return <div className="p-6">Loading slot details...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{slot.label}</h1>
      <p className="text-gray-600">{slot.location}</p>
      <p className="italic">{slot.notes}</p>

      <h2 className="text-xl font-semibold mt-6">Availability Windows</h2>
      <ul className="space-y-2">
        {availabilities.map((a) => (
          <li key={a.id} className="border p-4 rounded shadow space-y-1">
            <p>From: {new Date(a.available_from).toLocaleString()}</p>
            <p>Until: {new Date(a.available_until).toLocaleString()}</p>
            <button
              onClick={() => bookSlot(a.id)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>

      {status && <p className="mt-4 font-semibold">{status}</p>}
    </div>
  );
}

