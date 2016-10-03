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


vvv - change 'EMPII' to what ever you want the program to be in the query

Total people Adult/Children
SELECT COUNT (*) as numberOfPeople
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
 and "Head of Household"."Program" = 'EMPII' --change 'EMPII' to what ever you want the program to be in the query
UNION

SELECT COUNT (*) as numberOfPeople
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
 and "Head of Household"."Program" = 'EMPII'
UNION

SELECT COUNT (*) as numberOfPeople
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
and "Head of Household"."Program" = 'EMPII'
;

Total people gender
SELECT "Gender", COUNT (*) as numberOfPeople, 'head of household' as role
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
GROUP BY "Gender"
UNION

SELECT "Head of Household-2"."Gender", COUNT (*) as numberOfPeople
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
GROUP BY "Head of Household-2"."Gender"
UNION

SELECT "Members of Household"."Gender", COUNT (*) as numberOfPeople
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
GROUP BY "Members of Household"."Gender"
;

Race - Adults
SELECT "Race Code" as Race, COUNT (*)
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
and "Head of Household"."Program" = 'EMPII'
GROUP BY "Race Code"

UNION ALL

SELECT "Head of Household-2"."Race Code" as Race, COUNT (*)
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
and "Head of Household"."Program" = 'EMPII'
GROUP BY "Head of Household-2"."Race Code";

Race - Children
SELECT "Members of Household"."Race Code" as Race, COUNT (*)
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
and "Head of Household"."Program" = 'EMPII'
GROUP BY "Members of Household"."Race Code";

Age - Children
SELECT "Members of Household"."Date of Birth" as DOB
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
and "Head of Household"."Program" = 'EMPII';

Age - Adults
SELECT "Date of Birth" as DOB
FROM "Head of Household"
WHERE
"Head of Household"."Program Exit Date" > '2016-1-1' and "Head of Household"."Program Exit Date" < '2016-3-31' and "Head of Household"."Program" = 'EMP'
OR "Head of Household"."Program Exit Date" IS NULL and "Head of Household"."Program" = 'EMP'
OR "Head of Household"."Program Entry Date" < '2015-1-1' and "Head of Household"."Program Exit Date" > '2016-3-31' and "Head of Household"."Program" = 'EMP'
UNION
SELECT "Head of Household-2"."Date of Birth" as DOB
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE
"Head of Household"."Program Exit Date" > '2016-1-1' and "Head of Household"."Program Exit Date" < '2016-3-31' and "Head of Household"."Program" = 'EMP'
OR "Head of Household"."Program Exit Date" IS NULL and "Head of Household"."Program" = 'EMP'
OR "Head of Household"."Program Entry Date" < '2015-1-1' and "Head of Household"."Program Exit Date" > '2016-3-31' and "Head of Household"."Program" = 'EMP'
;

Last Resedence
SELECT "County of Last Residence", COUNT (*)
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
and "Head of Household"."Program" = 'EMPII'
GROUP BY "County of Last Residence"
;

Household Income
SELECT "HoH Mthly  Earned Income", "HoH Mthly UnEarned Incom"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-12-31' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL
 and "Head of Household"."Program" = 'EMPII'
;

Person Exiting Housing
SELECT "Reason for Leaving", COUNT (*)
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" > '2015-9-25' and "Head of Household"."Program Exit Date" < '2016-12-31' OR "Head of Household"."Program Exit Date" IS NULL and "Head of Household"."Program" = 'EMPII'
GROUP BY "Reason for Leaving"
;
