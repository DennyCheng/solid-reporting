create table users (
   id SERIAL PRIMARY KEY,
   username varchar(100) unique,
   password varchar(100)
);


SELECT "HoHID", "LastName", "FirstName"
FROM "Head of Household"
UNION
SELECT "Head of Household" as HoHID, "LastName", "FirstName"
FROM "Head of Household-2"
UNION
SELECT "Head of Household" as HoHID, "Last Name" as LastName, "First Name" as FirstName
FROM "Members of Household"

--UNION is the key here. You can join multiple tables together and include all the data on the rows
--by doing it with a union. You need to use "as" to make sure that all the colums line up. This changes
--the title of the colum to what ever you want. In this case to match the tile of the "Head of Household"
