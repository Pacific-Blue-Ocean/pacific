-- NOTE: This schema depends on schema-friends

-- psql -d pacific -f database/schema-user-preferences.sql

-- Connect to database
\c pacific

-- Drop tables
drop table if exists preferences_steps cascade;
drop table if exists preferences cascade;
drop table if exists users_preferences cascade;
drop table if exists locations_types cascade;
drop table if exists locations cascade;

-- Create tables
create table preferences_steps (
  id          bigserial not null primary key,
  label       varchar(50) not null,
  question    varchar(255) not null,
  order       integer not null
);

create table preferences (
  id           bigserial not null primary key,
  preference_step_id  bigserial not null,
  parent_preference_id bigserial null,
  label        varchar(50) not null,
  description  varchar(255) null,
  foreign key (preference_step_id) references preferences_steps(id),
  foreign key (parent_preference_id) references preferences(id),
);

create table users_preferences (
  user_id  bigserial not null,
  preferences_id  bigserial not null,
  foreign key (user_id) references users(id),
  foreign key (preferences_id) references preferences(id)
);

create table locations_types (
  id  bigserial not null primary key,
  label varchar(255) null,
);

create table locations (
  id        bigserial not null primary key,
  location_type_id  bigserial not null,
  label     varchar(255) null,
  foreign key (location_type_id) references locations_types(id),
);


alter table users add location_id bigserial not null;
alter table users add constraint  foreign key (location_id) references locations(id);

-- Populate preferences_steps table
insert into preferences_steps
  (label, question, order)
values
  ('About Me', 'What best describes you?', 1), -- id 1
  ('My Interests', 'What type of activities are you interested on?', 2), -- id 2
  ('My Location', 'Where would you like to go out?', 3); -- id 3

-- Populate preferences table
insert into preferences
  (preference_step_id, parent_preference_id, label, description)
values
  (1, null, 'Students', 'Teens in the summer or college students looking for a weekend activity with friends'), -- id 1
  (1, null, 'Young Adults',  'People at a new city or those looking to spice up their day to day'), -- id 2
  (1, null, 'Empty Nesters', 'Parents who no longer have the responsibility of kids and want a new hobby'), -- id 3
  (2, null, 'Outdoor - Active',   null), -- id 4
  (2, 4, 'Sports leagues and/or places to play', null), -- id 5
  (2, 4, 'Play parks (trampoline parks or laser tag etc.)', null), -- id 6
  (2, null, 'Health/Wellness', null), -- id 7
  (2, 7, 'Massage', null), -- id 8
  (2, 7, 'Yoga', null), -- id 9
  (2, 7, 'Gym', null), -- id 10
  (2, 7, 'Earwax removal', null), -- id 11
  (2, null, 'Outdoor - Social', null), -- id 12
  (2, 12, 'Bars/Happy Hours ', null), -- id 13
  (2, 12, 'Local events ', null), -- id 14
  (2, 12, 'Concerts ', null), -- id 15
  (2, null, 'Online ', null), -- id 16
  (2, 16, 'Tournaments ', null), -- id 17
  (2, 16, 'Video game suggestions ', null), -- id 18
  (2, 16, 'Twitch.Youtube streams ', null), -- id 19


-- Populate users_preferences table
insert into relationships
  (from_user_id, to_user_id)
values
  (4, 1),
  (4, 9),
  (4, 16);

-- Populate locations_types table
insert into locations_types
  (label)
values
  ('City'), -- id 1
  ('Region'); -- id 2


-- Populate locations table
insert into locations
  (location_type_id, label)
values
  (1, 'San Francisco'), -- id 1
  (1, 'Los Angeles'), -- id 2
  (1, 'New York'), -- id 3
  (2, 'Bay Area'); -- id 4

-- Update users rows
UPDATE users SET location_id = 1 WHERE id = 4; -- Update user Feranda with the location San Francisco




