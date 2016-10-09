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
SELECT SUM (numberOfPeople), 'Adults' as role, "Program"
FROM(
SELECT COUNT (*) as numberOfPeople, "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Program"
UNION
SELECT COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Head of Household"."Program" ) AS Adult
GROUP BY "Program"
UNION
SELECT COUNT (*) as numberOfPeople, 'Children' AS role, "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' and "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Head of Household"."Program"
ORDER BY "Program", role;



Total people gender *
SELECT "Gender", SUM (numberOfPeople), "Program"
FROM

(SELECT "Gender", COUNT (*) as numberOfPeople, "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Gender", "Program"
UNION

SELECT "Head of Household-2"."Gender", COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Head of Household-2"."Gender", "Head of Household"."Program"
UNION

SELECT "Members of Household"."Gender", COUNT (*) as numberOfPeople, "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Members of Household"."Gender", "Head of Household"."Program") as People
GROUP BY "Gender", "Program";


Race - Adults *
SELECT "Race Code", SUM (Race), "Program"
FROM
(SELECT "Race Code", COUNT (*) as Race, "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Race Code", "Program"
UNION
SELECT "Head of Household-2"."Race Code", COUNT (*) as Race, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Head of Household-2"."Race Code", "Head of Household"."Program") as Races
GROUP BY "Race Code", "Program";


Race - Children *
SELECT "Members of Household"."Race Code" as Race, COUNT (*), "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Members of Household"."Race Code", "Head of Household"."Program";


Age - Children
SELECT "Members of Household"."Date of Birth" as DOB, "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31');


Age - Adults
SELECT "Date of Birth" as DOB, "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
UNION
SELECT "Head of Household-2"."Date of Birth" as DOB, "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
;

Last Resedence
SELECT "County of Last Residence", COUNT (*), "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "County of Last Residence", "Program"
;

Household Income
SELECT "HoH Mthly  Earned Income", "HoH Mthly UnEarned Incom", "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
;

Person Exiting Housing -- HoHID 223 is missing exit date. Will be omitted from report.
SELECT "Reason for Leaving", COUNT (*), "Program"
FROM "Head of Household"
WHERE "Head of Household"."Program Exit Date" >= '2015-9-25' and "Head of Household"."Program Exit Date" <= '2016-12-31'
GROUP BY "Reason for Leaving", "Program"
;



--OUTCOMES

Housing Stability
SELECT "Achieve Housing Stability", COUNT(*), "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
GROUP BY "Achieve Housing Stability", "Program"
ORDER BY "Program"
;

Educational Advancement - ADULTS
SELECT "Adult Edu Adv", COUNT(*), "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Adult Edu Adv" != '') and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Adult Edu Adv", "Program"
UNION
SELECT "Head of Household-2"."Adult Edu Adv", COUNT (*), "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household"."Adult Edu Adv" != '') and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Head of Household-2"."Adult Edu Adv", "Head of Household"."Program"
;

Is There a Learning Disability - Adult
SELECT "Is There a Learning Disability", COUNT(*), "Program"
FROM "Head of Household"
WHERE ("Head of Household"."Is There a Learning Disability" != '' and "Head of Household"."Is There a Learning Disability" != 'NO' ) and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Is There a Learning Disability", "Program"
UNION
SELECT "Head of Household-2"."Is There a Learning Disability", COUNT (*), "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household-2"."Is There a Learning Disability" != '' and "Head of Household-2"."Is There a Learning Disability" != 'NO' ) and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Head of Household-2"."Is There a Learning Disability", "Head of Household"."Program"
;

Is There a Learning Disability - Children
SELECT "Members of Household"."Is There a Learning Disability", COUNT (*), "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Members of Household"."Is There a Learning Disability" != '' and "Members of Household"."Is There a Learning Disability" != 'NO' and "Members of Household"."Is There a Learning Disability" != 'No') and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Members of Household"."Is There a Learning Disability", "Head of Household"."Program"
;

Employment - Adults
SELECT "Currently Employed", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Head of Household"."Currently Employed" IS NOT NULL AND "Head of Household"."Currently Employed" != '0' AND "Head of Household"."Currently Employed" != 'No' ) AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Currently Employed", "Program"

SELECT "Head of Household-2"."Currently Employed", COUNT (*), "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household-2"."Currently Employed" IS NOT NULL and "Head of Household-2"."Currently Employed" != 'NO' ) and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Head of Household-2"."Currently Employed", "Head of Household"."Program";

Improved Econ Stability
SELECT "Improved Econ Stability", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Improved Econ Stability" IS NOT NULL AND "Improved Econ Stability" != '') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Improved Econ Stability", "Program"


UNION
SELECT "Head of Household-2"."Improved Econ Stability", COUNT (*), "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household-2"."Improved Econ Stability" IS NOT NULL AND "Head of Household-2"."Improved Econ Stability" != '') and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Head of Household-2"."Improved Econ Stability", "Head of Household"."Program"
;

Disability - Adult
SELECT "Is There a Disability", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Is There a Disability" IS NOT FALSE) AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Is There a Disability", "Program"
UNION
SELECT "Head of Household-2"."Is There a Disability", COUNT (*), "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household-2"."Is There a Disability" IS NOT FALSE) and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Head of Household-2"."Is There a Disability", "Head of Household"."Program"
;

Adult MI

SELECT "Is There a Diagnosed Mental Illness", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Is There a Diagnosed Mental Illness" IS NOT NULL AND "Is There a Diagnosed Mental Illness" != 'NO' AND "Is There a Diagnosed Mental Illness" != 'No') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Is There a Diagnosed Mental Illness", "Program"
UNION
SELECT "Head of Household-2"."Is There a Diagnosed Mental Illness", COUNT (*), "Head of Household"."Program"
FROM "Head of Household-2"
LEFT JOIN "Head of Household" ON "Head of Household-2"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Head of Household-2"."Is There a Diagnosed Mental Illness" IS NOT NULL AND "Head of Household-2"."Is There a Diagnosed Mental Illness" != 'NO' AND "Head of Household-2"."Is There a Diagnosed Mental Illness" != 'No') and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Head of Household-2"."Is There a Diagnosed Mental Illness", "Head of Household"."Program"
;

Disability - Children

SELECT "Members of Household"."Is There a Disability", COUNT (*), "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE("Members of Household"."Is There a Disability" IS NOT FALSE) AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Members of Household"."Is There a Disability", "Head of Household"."Program"
;

Child MI

SELECT "Members of Household"."Is There a Diagnosed Mental Illness", COUNT (*), "Head of Household"."Program"
FROM "Members of Household"
LEFT JOIN "Head of Household" ON "Members of Household"."Head of Household" = "Head of Household"."HoHID"
WHERE ("Members of Household"."Is There a Diagnosed Mental Illness" != 'NO') and (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Members of Household"."Is There a Diagnosed Mental Illness", "Head of Household"."Program"
;

Parenting Edu Goal

SELECT "Parenting Education", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Parenting Education" IS NOT FALSE) AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Parenting Education", "Program";

SELECT COUNT(*) "Parenting Completed", "Program"
FROM "Head of Household"
WHERE("Head of Household"."Parenting Completed" >= '2015-01-01' AND "Head of Household"."Parenting Completed" <= '2015-12-31') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

SELECT COUNT(*) "Parenting Completed" , "Program"
FROM "Head of Household"
WHERE("Head of Household"."Parenting Completed" < '2015-01-01') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

Budgeting Goal

SELECT "Budgeting Class", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Budgeting Class" IS NOT FALSE) AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Budgeting Class", "Program";

SELECT COUNT(*) "Budgeting Completed", "Program"
FROM "Head of Household"
WHERE("Head of Household"."Budgeting Completed" >= '2015-01-01' AND "Head of Household"."Budgeting Completed" <= '2015-12-31') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

SELECT COUNT(*) "Budgeting Completed" , "Program"
FROM "Head of Household"
WHERE("Head of Household"."Budgeting Completed" < '2015-01-01') AND (("Head of Household"."Budgeting Completed" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

Family Violence
SELECT "Has or Had experienced or at risk for violence", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Has or Had experienced or at risk for violence" IS NOT NULL AND "Has or Had experienced or at risk for violence" != 'NO' AND "Has or Had experienced or at risk for violence" != 'No') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Has or Had experienced or at risk for violence", "Program";

Tenant Training

SELECT "Tenant Training", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Tenant Training" IS NOT FALSE) AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Tenant Training", "Program";

SELECT COUNT(*) "Tenant Training Completed", "Program"
FROM "Head of Household"
WHERE("Head of Household"."Tenant Training Completed" >= '2015-01-01' AND "Head of Household"."Tenant Training Completed" <= '2015-12-31') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

SELECT COUNT(*) "Tenant Training Completed" , "Program"
FROM "Head of Household"
WHERE("Head of Household"."Tenant Training Completed" < '2015-01-01') AND
(("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";


DBT
SELECT "DBT", COUNT(*), "Program"
FROM "Head of Household"
WHERE("DBT" IS NOT NULL AND "DBT" != 'No')  AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "DBT", "Program";

SELECT COUNT(*) "DBT Completed", "Program"
FROM "Head of Household"
WHERE("Head of Household"."Tenant Training Completed" >= '2015-01-01' AND "Head of Household"."Tenant Training Completed" <= '2015-12-31') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

SELECT COUNT(*) "DBT Completed" , "Program"
FROM "Head of Household"
WHERE("Head of Household"."Tenant Training Completed" < '2015-01-01') AND
(("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Program";

Improved Health
SELECT "Has Health Improved", COUNT(*), "Program"
FROM "Head of Household"
WHERE("Has Health Improved" != '') AND (("Head of Household"."Program Exit Date" >= '2015-01-01' AND "Head of Household"."Program Exit Date" <= '2015-12-31')
OR ("Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" IS NULL)
OR ("Head of Household"."Program Entry Date" <= '2015-01-01' AND "Head of Household"."Program Exit Date" >= '2015-12-31')
OR ("Head of Household"."Program Entry Date" >= '2015-01-01'AND "Head of Household"."Program Entry Date" <= '2015-12-31' AND "Head of Household"."Program Exit Date" >= '2015-12-31'))
GROUP BY "Has Health Improved", "Program";
