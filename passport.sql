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

SELECT "HoHID", "LastName", "FirstName", "Race Code", "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
UNION

SELECT "Head of Household-2"."Head of Household" as HoHID, "Head of Household-2"."LastName", "Head of Household-2"."FirstName", "Head of Household-2"."Race Code", "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
UNION

SELECT "Members of Household"."Head of Household" as HoHID, "Members of Household"."Last Name" as LastName, "Members of Household"."First Name" as FirstName, "Members of Household"."Race Code", "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
;
