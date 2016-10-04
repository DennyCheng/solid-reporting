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
 and "Head of Household"."Program" = 'EMPII'
UNION

SELECT "Head of Household-2"."Head of Household" as HoHID, "Head of Household-2"."LastName", "Head of Household-2"."FirstName", "Head of Household-2"."Race Code", "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
 and "Head of Household"."Program" = 'EMPII'
UNION

SELECT "Members of Household"."Head of Household" as HoHID, "Members of Household"."Last Name" as LastName, "Members of Household"."First Name" as FirstName, "Members of Household"."Race Code", "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
 and "Head of Household"."Program" = 'EMPII'
;


Total people Adult/Children *
SELECT "Gender", SUM (numberOfPeople), "Program"
FROM

(SELECT "Head of Household"."Gender", COUNT (*) as numberOfPeople, "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Head of Household"."Gender", "Program"
UNION

SELECT "Head of Household-2"."Gender", COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Head of Household-2"."Gender", "Head of Household"."Program"
UNION

SELECT "Members of Household"."Gender", COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Members of Household"."Gender", "Head of Household"."Program") as People
GROUP BY "Gender", "Program";


Total people gender *
SELECT "Gender", SUM (numberOfPeople), "Program"
FROM

(SELECT "Gender", COUNT (*) as numberOfPeople, "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Gender", "Program"
UNION

SELECT "Head of Household-2"."Gender", COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Head of Household-2"."Gender", "Head of Household"."Program"
UNION

SELECT "Members of Household"."Gender", COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Members of Household"."Gender", "Head of Household"."Program") as People
GROUP BY "Gender", "Program";


Race - Adults *
SELECT "Race Code", SUM (Race), "Program"
FROM
(SELECT "Race Code", COUNT (*) as Race, "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Race Code", "Program"
UNION
SELECT "Head of Household-2"."Race Code", COUNT (*) as Race, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Head of Household-2"."Race Code", "Head of Household"."Program") as Races
GROUP BY "Race Code", "Program";


Race - Children *
SELECT "Members of Household"."Race Code" as Race, COUNT (*), "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "Members of Household"."Race Code", "Head of Household"."Program";


Age - Children
SELECT "Members of Household"."Date of Birth" as DOB, "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31';


Age - Adults
SELECT "Date of Birth" as DOB, "Program"
FROM "Head of Household"
WHERE
"Head of Household"."Program Exit Date" > '2016-1-1' and "Head of Household"."Program Exit Date" < '2016-3-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-1-1' and "Head of Household"."Program Exit Date" > '2016-3-31'
UNION
SELECT "Head of Household-2"."Date of Birth" as DOB, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE
"Head of Household"."Program Exit Date" > '2016-1-1' and "Head of Household"."Program Exit Date" < '2016-3-31'
OR "Head of Household"."Program Exit Date" IS NULL and "Head of Household"."Program" = 'EMP'
OR "Head of Household"."Program Entry Date" < '2015-1-1' and "Head of Household"."Program Exit Date" > '2016-3-31'
;

Last Resedence
SELECT "County of Last Residence", COUNT (*), "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
GROUP BY "County of Last Residence", "Program"
;

Household Income
SELECT "HoH Mthly  Earned Income", "HoH Mthly UnEarned Incom", "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31'
OR "Head of Household"."Program Exit Date" IS NULL
OR "Head of Household"."Program Entry Date" < '2015-12-31' and "Head of Household"."Program Exit Date" > '2016-12-31'
;

Person Exiting Housing -- HoHID 223 is missing exit date. Will be omitted from report.
SELECT "Reason for Leaving", COUNT (*), "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-9-25' and "Head of Household"."Program Exit Date" < '2016-12-31'
GROUP BY "Reason for Leaving", "Program"
;
