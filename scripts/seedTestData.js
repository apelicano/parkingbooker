// scripts/seedTestData.js
import 'dotenv/config'; // ✅ Add this to load .env
import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';

// ⬇️ Now this will work
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


const stubUserId = 'e693d6d0-dc1d-47cb-9021-a4dd6d4611ef'; // update if needed

async function main() {
  console.log('🌱 Seeding test data...');

  // 1. Insert Slots
  const slots = Array.from({ length: 3 }, () => ({
    label: `P${faker.number.int({ min: 1, max: 50 })}`,
    location: faker.location.streetAddress(),
    notes: faker.lorem.words(5),
    owner_id: stubUserId,
  }));

  const { data: slotData, error: slotError } = await supabase
    .from('slots')
    .insert(slots)
    .select('id');

  if (slotError) throw slotError;

  // 2. Insert Availabilities
  const availabilities = [];

  for (const slot of slotData) {
    const now = new Date();
    for (let i = 1; i <= 2; i++) {
      const from = new Date(now.getTime() + i * 2 * 60 * 60 * 1000); // +2h, +4h
      const to = new Date(from.getTime() + 2 * 60 * 60 * 1000); // +2h duration

      availabilities.push({
        slot_id: slot.id,
        available_from: from.toISOString(),
        available_until: to.toISOString(),
      });
    }
  }

  const { data: availData, error: availError } = await supabase
    .from('availabilities')
    .insert(availabilities)
    .select('id, slot_id');

  if (availError) throw availError;

  // 3. Optional: Insert 1 fake booking per availability
  const bookings = availData.map((a, i) => ({
    availability_id: a.id,
    user_id: stubUserId,
    status: ['pending', 'confirmed', 'cancelled'][i % 3],
    message: `Booking for ${a.slot_id}`,
  }));

  const { error: bookingError } = await supabase.from('bookings').insert(bookings);
  if (bookingError) throw bookingError;

  console.log('✅ Done seeding test data.');
}

main().catch((err) => {
  console.error('❌ Seed failed:', err.message);
});
