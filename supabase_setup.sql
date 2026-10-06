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

-- Table des packs promo affichés sur la page Tarifs (gérée depuis /admin)
create table packs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  image_url text not null,
  storage_path text not null,
  ordre integer not null default 0
);

alter table packs enable row level security;

-- Tout le monde peut voir les packs (ils s'affichent sur le site public)
create policy "Lecture publique packs" on packs
  for select to anon using (true);

create policy "Lecture authentifiée packs" on packs
  for select to authenticated using (true);

-- Seule une personne connectée (le cabinet, via /admin) peut ajouter, modifier ou supprimer un pack
create policy "Ajout authentifié packs" on packs
  for insert to authenticated with check (true);

create policy "Modification authentifiée packs" on packs
  for update to authenticated using (true);

create policy "Suppression authentifiée packs" on packs
  for delete to authenticated using (true);

-- Bucket de stockage pour les images des packs (public en lecture)
insert into storage.buckets (id, name, public)
values ('packs', 'packs', true)
on conflict (id) do nothing;

create policy "Lecture publique images packs" on storage.objects
  for select to public using (bucket_id = 'packs');

create policy "Upload authentifié images packs" on storage.objects
  for insert to authenticated with check (bucket_id = 'packs');

create policy "Suppression authentifiée images packs" on storage.objects
  for delete to authenticated using (bucket_id = 'packs');
