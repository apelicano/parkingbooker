// src/components/BookingCard.jsx
export default function BookingCard({ booking }) {
  const status = booking.status?.toLowerCase();
  const slot = booking.availability?.slot;

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <li className="border p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">Booking ID: {booking.id.slice(0, 8)}…</p>
        <span
          className={`text-sm px-2 py-1 rounded ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
        >
          {status}
        </span>
      </div>
      <p>
        <strong>Slot:</strong>{' '}
        {slot?.label || '—'} ({slot?.location || '—'})
      </p>
      <p>
        <strong>Date:</strong>{' '}
        {new Date(booking.created_at).toLocaleString()}
      </p>
    </li>
  );
}
