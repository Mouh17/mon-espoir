-- Table des demandes de rendez-vous
create table rendez_vous (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  prenom text not null,
  nom text not null,
  telephone text not null,
  email text,
  date_disponible date,
  service text
);

-- Table des messages de contact
create table messages_contact (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  prenom text not null,
  nom text not null,
  email text,
  telephone text not null,
  objet text,
  message text
);

-- Autoriser l'insertion publique (le site doit pouvoir écrire sans compte utilisateur)
alter table rendez_vous enable row level security;
alter table messages_contact enable row level security;

create policy "Autoriser insertion publique rdv" on rendez_vous
  for insert to anon with check (true);

create policy "Autoriser insertion publique messages" on messages_contact
  for insert to anon with check (true);

-- Autoriser la LECTURE uniquement aux utilisateurs connectés (page /admin)
create policy "Autoriser lecture authentifiée rdv" on rendez_vous
  for select to authenticated using (true);

create policy "Autoriser lecture authentifiée messages" on messages_contact
  for select to authenticated using (true);
