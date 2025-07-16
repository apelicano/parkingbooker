// src/app/my-bookings/page.js
'use client';
import BookingCard from '@/components/BookingCard';


import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      // Optional: filter by current user in Phase 3
      // const {
      //   data: { user },
      //   error: userError
      // } = await supabase.auth.getUser();
      // if (userError) console.error('User fetch error:', userError);

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          status,
          created_at,
          availability:availabilities (
            id,
            slot:slots (
              label,
              location
            )
          )
        `)
        // .eq('user_id', user?.id) // Uncomment when using Supabase Auth
        .order('created_at', { ascending: false });

      console.log('Bookings with nested slot info:', data);
      if (error) {
        console.error('Fetch error:', error);
        setBookings([]);
      } else {
        setBookings(data);
      }

      setLoading(false);
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    filter === 'all' ? true : booking.status?.toLowerCase() === filter
  );

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded border font-medium ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p>No bookings found for filter: <strong>{filter}</strong></p>
      ) : (
        <ul className="space-y-4">
          {filteredBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
))}

        </ul>
      )}
    </main>
  );
}
