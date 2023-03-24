drop table if exists inventory;
drop table if exists model;

create table model (
    id integer primary key,
    name char(20),
    model char(20),
    soc char(20),
    memory_mb integer,
    ethernet boolean,
    release_year integer
);

create table inventory (
    id integer primary key,
    model_id integer references model (id),
    quantity integer
);