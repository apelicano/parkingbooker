# 🚗 ParkingBooker

A minimalist web app to book and offer condo parking slots. Built with **Next.js**, **Supabase**, and **Tailwind CSS**.

## 🛠 Stack

- **Framework:** Next.js (App Router, plain JS)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Auth:** Supabase Auth (TBD)
- **Hosting:** Vercel (TBD)

## ✅ Status

Currently in active development. MVP goal:  
- Parking owners can list their slots + availability  
- Parking seekers can view available slots and book  
- Auth, booking status filters, and validations coming soon

## 🚀 Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/parkingbooker.git
   cd parkingbooker
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment:**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run dev server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view in browser.

## 📁 Project Structure

```bash
parkingbooker/
├─ db/
│  └─ schema.sql           # Canonical SQL schema + indexes
├─ public/
├─ src/
│  ├─ lib/                 # Supabase client
│  ├─ app/                 # Next.js App Router pages
│  └─ components/          # React components (e.g., SlotCard)
├─ .env.local              # Local env vars (not committed)
├─ package.json
├─ tailwind.config.js
└─ README.md
```

## 🧭 Roadmap

See [`roadmap.md`](./roadmap.md) for full build phases and features checklist.

---

> Built with caffeine, Next.js, and a dash of desperation.
> *Your parking problems, solved.* 🚘