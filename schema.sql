-- ============================================
-- BJJ Tracker — Supabase Schema
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES
-- ============================================
create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  display_name  text,
  belt_rank     text check (belt_rank in ('white','blue','purple','brown','black')) default 'white',
  academy       text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- SESSIONS
-- ============================================
create table public.sessions (
  id                  uuid default uuid_generate_v4() primary key,
  user_id             uuid references public.profiles(id) on delete cascade not null,
  session_date        date not null default current_date,
  session_type        text not null check (session_type in ('Gi','No-Gi','Open Mat','Seminar','Drilling','Competition')),
  intensity_level     smallint not null check (intensity_level between 1 and 5) default 3,
  mat_hours           numeric(4,2) not null default 1.5 check (mat_hours > 0 and mat_hours <= 12),
  notes               text,
  techniques_covered  text[] default '{}',
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index idx_sessions_user_id on public.sessions(user_id);
create index idx_sessions_date on public.sessions(session_date desc);

alter table public.sessions enable row level security;

create policy "Users can view own sessions"
  on public.sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on public.sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own sessions"
  on public.sessions for update
  using (auth.uid() = user_id);

create policy "Users can delete own sessions"
  on public.sessions for delete
  using (auth.uid() = user_id);

-- ============================================
-- PINNED TECHNIQUES
-- ============================================
create table public.pinned_techniques (
  id              uuid default uuid_generate_v4() primary key,
  user_id         uuid references public.profiles(id) on delete cascade not null,
  technique_id    text not null,
  pinned_at       timestamptz default now(),
  unique(user_id, technique_id)
);

alter table public.pinned_techniques enable row level security;

create policy "Users can view own pins"
  on public.pinned_techniques for select
  using (auth.uid() = user_id);

create policy "Users can insert own pins"
  on public.pinned_techniques for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own pins"
  on public.pinned_techniques for delete
  using (auth.uid() = user_id);

-- ============================================
-- HELPER VIEWS
-- ============================================

-- Monthly mat hours summary
create or replace view public.monthly_stats as
select
  user_id,
  date_trunc('month', session_date)::date as month,
  count(*)::int as session_count,
  sum(mat_hours)::numeric(6,2) as total_hours,
  round(avg(intensity_level), 1)::numeric(3,1) as avg_intensity
from public.sessions
group by user_id, date_trunc('month', session_date);

-- Weekly sessions (for consistency chart)
create or replace view public.weekly_stats as
select
  user_id,
  date_trunc('week', session_date)::date as week_start,
  count(*)::int as session_count,
  sum(mat_hours)::numeric(6,2) as total_hours
from public.sessions
group by user_id, date_trunc('week', session_date);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger sessions_updated_at
  before update on public.sessions
  for each row execute procedure public.set_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
