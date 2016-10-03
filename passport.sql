create table users (
   id SERIAL PRIMARY KEY,
   username varchar(100) unique,
   password varchar(100),
   reset_password_token varchar(50),
   reset_password_expires varchar(100)
);
