create table app_user (
    id serial primary key,
    email varchar(255) not null unique,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null
);

create table person (
    id serial primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null unique,
    user_id integer references app_user(id)
);

create table service_type (
    id serial primary key,
    type varchar(255) not null,
    color varchar(255) not null,
    background varchar(255) not null,
    user_id integer references app_user(id)
);

create table service_role (
    id serial primary key,
    role varchar(255) not null,
    user_id integer references app_user(id)
);

create table service_event_type (
    id serial primary key,
    type varchar(255) not null,
    user_id integer references app_user(id)
);

create table song (
    id serial primary key,
    name varchar(255) not null,
    page integer,
    last_used timestamp,
    user_id integer references app_user(id)
);

create table service (
    id serial primary key,
    date timestamp default current_timestamp,
    theme varchar(255) not null,
    type_id integer references service_type(id),
    user_id integer references app_user(id)
);

create table service_people (
    id serial primary key,
    service_id integer references service(id),
    person_id integer references person(id),
    role_id integer references service_role(id)
);

create table service_event (
    id serial primary key,
    service_id integer references service(id),
    type_id integer references service_event_type(id),
    event_order integer not null,
    song_id integer references song(id)
);