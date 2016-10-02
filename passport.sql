create table users (
   id SERIAL PRIMARY KEY,
   username varchar(100) unique,
   password varchar(100)
);
