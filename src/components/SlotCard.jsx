import Link from 'next/link';

export default function SlotCard({ id, label, location, notes, badge }) {
  const badgeColor =
    badge === 'Available'
      ? 'bg-green-100 text-green-800'
      : badge === 'Fully Booked'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-200 text-gray-600';

  return (
    <li className="border p-4 rounded shadow">
      <Link href={`/slots/${id}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{label}</h2>
          <span className={`text-xs px-2 py-1 rounded ${badgeColor}`}>
            {badge}
          </span>
        </div>
        {location && <p className="text-sm">{location}</p>}
        {notes && <p className="text-sm text-gray-600 italic">{notes}</p>}
      </Link>
    </li>
  );
}
