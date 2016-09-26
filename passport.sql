create table users (
   userId SERIAL PRIMARY KEY,
   username varchar(100) unique,
   password varchar(100)
);
