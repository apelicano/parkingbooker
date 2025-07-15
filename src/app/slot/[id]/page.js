// src/app/slot/[id]/page.js
import { supabase } from '@/lib/supabase';

export default async function SlotDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('slots')
    .select(`
      label,
      location,
      notes,
      availabilities (
        id,
        available_from,
        available_until
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching slot:', error.message);
    return <div className="p-4 text-red-600">Error loading slot details</div>;
  }

  if (!data) {
    return <div className="p-4">Loading slot details...</div>;
  }

  const { label, location, notes, availabilities } = data;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{label}</h1>
      <p className="text-gray-600">{location}</p>
      {notes && <p className="italic">{notes}</p>}

      <h2 className="text-xl font-semibold mt-6">Availability Windows</h2>
      {availabilities.length === 0 ? (
        <p>No future availability for this slot.</p>
      ) : (
        <ul className="space-y-2">
          {availabilities.map(({ id, available_from, available_until }) => (
            <li key={id} className="border p-4 rounded shadow">
              <p>From: {new Date(available_from).toLocaleString()}</p>
              <p>Until: {new Date(available_until).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
