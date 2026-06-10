create extension if not exists pgcrypto;

create table if not exists public.genesis_contributions (
  id uuid primary key default gen_random_uuid(),
  wallet_address text not null,
  contribution_amount_sol numeric(20, 9) not null check (contribution_amount_sol >= 1),
  transaction_signature text not null unique,
  treasury_wallet text not null,
  network text not null default 'Solana Mainnet',
  status text not null default 'Confirmed',
  estimated_nex_allocation numeric(30, 9) not null default 0,
  locked_ns_credits numeric(30, 9) not null default 0,
  solscan_url text,
  user_agent text,
  source_page text default '/app/genesis',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists genesis_contributions_wallet_address_idx
  on public.genesis_contributions (wallet_address);

create index if not exists genesis_contributions_created_at_idx
  on public.genesis_contributions (created_at desc);

alter table public.genesis_contributions enable row level security;

drop policy if exists "Genesis contributions are readable by anon" on public.genesis_contributions;
drop policy if exists "Genesis contributions can be inserted by anon" on public.genesis_contributions;

revoke all on public.genesis_contributions from anon;
revoke all on public.genesis_contributions from authenticated;

-- Public users must not query raw rows or insert arbitrary contribution records.
-- Genesis writes and admin reads must be performed through server-side API functions
-- using SUPABASE_SERVICE_ROLE_KEY after Solana mainnet transaction verification.

create or replace function public.set_genesis_contributions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_genesis_contributions_updated_at
  on public.genesis_contributions;

create trigger set_genesis_contributions_updated_at
  before update on public.genesis_contributions
  for each row
  execute function public.set_genesis_contributions_updated_at();
