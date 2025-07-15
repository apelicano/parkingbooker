// src/app/page.js
import { supabase } from '@/lib/supabase';
import SlotCard from '@/components/SlotCard';
import LoadingSpinner from '@/components/LoadingSpinner'; // ⬅️ Add this


export default async function SlotsPage() {
  const { data, error } = await supabase
    .from('availabilities')
    .select(`
      id,
      available_from,
      available_until,
      slots (
        label,
        location
      )
    `)
    .gt('available_until', new Date().toISOString());

  if (!data && !error) {
    // Show spinner while loading (only works with useEffect — see below)
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Error fetching slots:', error.message);
    return <div className="p-4 text-red-600">Error loading slots</div>;
  }

  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Available Parking Slots</h1>
    {data.length === 0 ? (
      <p>No available slots right now.</p>
    ) : (
      <ul className="space-y-4">
        {data.map(({ id, available_from, available_until, slots }) => (
          <SlotCard
            key={id}
            label={slots.label}
            location={slots.location}
            availableFrom={available_from}
            availableUntil={available_until}
          />
        ))}
      </ul>
    )}
  </div>
);

}
