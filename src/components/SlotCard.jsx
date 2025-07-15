// src/components/SlotCard.jsx

export default function SlotCard({ label, location, availableFrom, availableUntil }) {
  return (
    <li className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{label}</h2>
      {location && <p className="text-sm text-gray-600">{location}</p>}
      <p className="text-sm">
        From: {new Date(availableFrom).toLocaleString()} <br />
        Until: {new Date(availableUntil).toLocaleString()}
      </p>
    </li>
  );
}
