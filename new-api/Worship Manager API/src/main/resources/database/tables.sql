drop table app_user;
create table app_user (
    id serial primary key,
    email varchar(255) not null unique,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null
);

drop table person;
create table person (
    id serial primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null unique,
    user_id integer references app_user(id)
);

drop table type;
create table type (
    id serial primary key,
    type varchar(255) not null,
    color varchar(255) not null,
    background varchar(255) not null,
    user_id integer references app_user(id)
);

drop table role;
create table role (
    id serial primary key,
    role_name varchar(255) not null,
    user_id integer references app_user(id)
);

drop table song;
create table song (
    id serial primary key,
    name varchar(255) not null,
    page integer,
    last_used timestamp,
    user_id integer references app_user(id)
);

drop table service;
create table service (
    id serial primary key,
    date timestamp default current_timestamp,
    theme varchar(255) not null,
    type_id integer references service_type(id),
    user_id integer references app_user(id)
);

drop table event;
create table event (
    id serial primary key,
    service_id integer references service(id),
    type_id integer references service_event_type(id),
    event_order integer not null,
    song_id integer references song(id)
);

drop table event_type;
create table event_type (
    id serial primary key,
    type varchar(255) not null,
    user_id integer references app_user(id)
);
\