# BJJ Tracker

A free, minimalist progress tracker for Brazilian Jiu-Jitsu.

Log mat time, track techniques, and measure consistency. Synced across devices.

## Use it now!

**[bjj.caseyjr.org](https://bjj.caseyjr.org)** — enter your email, click the magic link, start tracking. No download, no password, no setup.

On iPhone, tap Share → Add to Home Screen for a native app experience.

## Features

- **Session Logging** — Log session type (Gi, No-Gi, Open Mat, etc.), intensity, mat hours, techniques covered, and rolling notes in seconds.
- **Technique Library** — 50+ categorized BJJ techniques (guard, passing, submissions, sweeps, takedowns, escapes, back attacks, control). Pin the moves you're currently drilling to your dashboard if you wish.
- **Add Custom Techniques** — Add your own techniques to the library.
- **Analytics** — Total mat hours, monthly breakdown, weekly consistency chart, session type distribution, and most-practiced techniques.
- **Cross-Device Sync** — Log on your laptop, see it on your phone and vice versa. Data syncs via Supabase.
- **PWA** — Add to home screen on iPhone for a native app experience. Dark mode, no browser chrome.
- **Magic Link Auth** — No passwords. Enter your email, click the link, you're in.

## Privacy

Your data is yours. Each user's data is isolated at the database level with Row Level Security. No tracking, no analytics on users, no ads.

## Screenshots

![Image](https://github.com/user-attachments/assets/c16ad2d2-40ad-410c-b914-13391b30dc86)

![Image](https://github.com/user-attachments/assets/0c724a55-9f2c-4c37-b381-5a42fc738c2d)

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Inline styles, Tailwind-inspired color palette
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Auth:** Supabase Magic Link (passwordless)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Hosting:** Vercel
- **PWA:** Service worker + Web App Manifest with full iOS support

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Supabase](https://supabase.com) account

### Setup

1. **Clone the repo**

```bash
git clone https://github.com/miguelito4/bjj-tracker.git
cd bjj-tracker
npm install
```

2. **Create a Supabase project** at [supabase.com/dashboard](https://supabase.com/dashboard) and run `schema.sql` in the SQL Editor to create all tables and policies.

3. **Add environment variables** — copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Run it**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy

Deploy to Vercel in one click or via CLI:

```bash
vercel
```

Add your environment variables in the Vercel dashboard and update your Supabase **Authentication → URL Configuration** with your production URL.

## Database Schema

See `schema.sql` for the full schema. Tables:

- **profiles** — User display name, belt rank, academy
- **sessions** — Session date, type, intensity, mat hours, notes, techniques covered
- **pinned_techniques** — Techniques pinned to a user's dashboard

All tables have Row Level Security policies ensuring users can only access their own data.

## License

MIT License — see [LICENSE](LICENSE) for details.

## Author

Built by [Mike Casey](https://github.com/miguelito4) and Claude.
