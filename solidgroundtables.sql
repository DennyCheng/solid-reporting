DROP TABLE IF EXISTS "Case Managers";

CREATE TABLE "Case Managers" (
  "CaseMgrID" SERIAL NOT NULL, 
  "LastName" VARCHAR(255), 
  "FirstName" VARCHAR(255), 
  "MI" VARCHAR(255), 
  PRIMARY KEY ("CaseMgrID")
);

CREATE TABLE "Destination" (
  "DestID" VARCHAR(255) NOT NULL, 
  "Destination" VARCHAR(255), 
  PRIMARY KEY ("DestID")
);

CREATE TABLE "Head of Household" (
  "HoHID" SERIAL NOT NULL, 
  "Case Manager" INTEGER NOT NULL, 
  "LastName" VARCHAR(35) NOT NULL, 
  "FirstName" VARCHAR(35) NOT NULL, 
  "MI" VARCHAR(35), 
  "Address" VARCHAR(255), 
  "City" VARCHAR(255), 
  "State" VARCHAR(2) DEFAULT E'MN', 
  "ZIPPostal" VARCHAR(255), 
  "CellPhone" VARCHAR(255), 
  "Date of Birth" TIMESTAMP NOT NULL, 
  "Age" VARCHAR(255), 
  "Gender" VARCHAR(255) NOT NULL, 
  "Race Code" VARCHAR(255), 
  "#of Persons in HH" INTEGER, 
  "Currently Employed" VARCHAR(255), 
  "Is There a Learning Disability" TEXT, 
  "Applied for SSD" VARCHAR(255), 
  "Improved Econ Stability" VARCHAR(255), 
  "Program Entry Date" TIMESTAMP NOT NULL, 
  "Program" VARCHAR(255) NOT NULL, 
  "Housing Unit #" INTEGER, 
  "Program Exit Date" TIMESTAMP, 
  "Parenting Education" BOOLEAN DEFAULT E'0', 
  "P-Start Date" TIMESTAMP, 
  "Parenting Completed" TIMESTAMP, 
  "Budgeting Class" BOOLEAN DEFAULT E'0', 
  "B-Start Date" TIMESTAMP, 
  "Budgeting Completed" TIMESTAMP, 
  "Tenant Training" BOOLEAN DEFAULT E'0', 
  "T-Start Date" TIMESTAMP, 
  "Tenant Training Completed" TIMESTAMP, 
  "DBT" VARCHAR(40), 
  "DBT Start Date" TIMESTAMP, 
  "DBT Completed" TIMESTAMP, 
  "Has or Had experienced or at risk for violence" VARCHAR(255), 
  "HoH Mthly  Earned Income" NUMERIC(19,4), 
  "HoH Mthly UnEarned Incom" NUMERIC(19,4), 
  "County of Last Residence" VARCHAR(255), 
  "Reason for Leaving" TEXT, 
  "Destination" VARCHAR(255), 
  "Adult Edu Adv" TEXT, 
  "Completed Program?" VARCHAR(255), 
  "Achieve Housing Stability" TEXT, 
  "Abuse(d) Alcohol/Drugs" VARCHAR(255), 
  "Has Health Improved" TEXT, 
  "Is There a Diagnosed Mental Illness" VARCHAR(255), 
  "Is There a Disability" BOOLEAN DEFAULT E'0', 
  "Need Child Care" BOOLEAN DEFAULT E'0', 
  "Already Have Child Care: Date Received" TIMESTAMP, 
  "Is Child Care Affordable" BOOLEAN DEFAULT E'0', 
  "# of 4-5 yrs olds Enrolled in Pre-School" INTEGER, 
  "Date Entered into Pre-School for Child 1" TIMESTAMP, 
  "Date Entered into Pre-School for Child 2" TIMESTAMP, 
  "Date Entered into Pre-School for Child 3" TIMESTAMP, 
  PRIMARY KEY ("HoHID")
);

CREATE TABLE "Head of Household-2" (
  "HoH-2ID" SERIAL NOT NULL, 
  "Case Manager" INTEGER, 
  "Head of Household" INTEGER, 
  "LastName" VARCHAR(35) NOT NULL, 
  "FirstName" VARCHAR(35) NOT NULL, 
  "MI" VARCHAR(35), 
  "Address" VARCHAR(255), 
  "City" VARCHAR(255), 
  "State" VARCHAR(2), 
  "ZIPPostal" VARCHAR(255), 
  "CellPhone" VARCHAR(255), 
  "Date of Birth" TIMESTAMP NOT NULL, 
  "Age" VARCHAR(255), 
  "Gender" VARCHAR(255) NOT NULL, 
  "Race Code" VARCHAR(255), 
  "Currently Employed" BOOLEAN DEFAULT E'0', 
  "Is There a Learning Disability" TEXT, 
  "Applied for SSD" BOOLEAN DEFAULT E'0', 
  "Improved Econ Stability" TEXT, 
  "Program Entry Date" TIMESTAMP NOT NULL, 
  "Program" INTEGER, 
  "Program Exit Date" TIMESTAMP, 
  "Parenting Education" BOOLEAN DEFAULT E'0', 
  "P-Start Date" TIMESTAMP, 
  "Parenting Completed" TIMESTAMP, 
  "Budgeting Class" BOOLEAN DEFAULT E'0', 
  "B-Start Date" TIMESTAMP, 
  "Budgeting Completed" TIMESTAMP, 
  "Tenant Training" BOOLEAN DEFAULT E'0', 
  "T-Start Date" TIMESTAMP, 
  "Tenant Training Completed" TIMESTAMP, 
  "DBT" VARCHAR(40), 
  "DBT Start Date" TIMESTAMP, 
  "DBT Completed" TIMESTAMP, 
  "Has or Had experienced or at risk for violence" VARCHAR(255), 
  "HoH-2 Mthly Earned Income" NUMERIC(19,4), 
  "HoH-2 Mthly UnEarned Income" NUMERIC(19,4), 
  "County of Last Residence" VARCHAR(255), 
  "Reason for Leaving" TEXT, 
  "Destination" VARCHAR(255), 
  "Adult Edu Adv" TEXT, 
  "Completed Program?" VARCHAR(255), 
  "Achieve Housing Stability" TEXT, 
  "Abuse(d) Alcohol/Drugs" BOOLEAN DEFAULT E'0', 
  "Has Health Improved" TEXT, 
  "Is There a Diagnosed Mental Illness" VARCHAR(255), 
  "Is There a Disability" BOOLEAN DEFAULT E'0', 
  PRIMARY KEY ("HoH-2ID")
);

SELECT setval('"Head of Household-2_HoH-2ID_seq"', MAX("HoH-2ID")) FROM "Head of Household-2";

CREATE INDEX "Head of Household-2_Gender ID" ON "Head of Household-2" ("Gender");

CREATE INDEX "Head of Household-2_Race Code" ON "Head of Household-2" ("Race Code");

CREATE INDEX "Head of Household-2_ZIP_PostalCode" ON "Head of Household-2" ("ZIPPostal");

CREATE TABLE "Members of Household" (
  "MoHID" SERIAL NOT NULL, 
  "Case Manager" INTEGER, 
  "Head of Household" INTEGER, 
  "Last Name" VARCHAR(35) NOT NULL, 
  "First Name" VARCHAR(35) NOT NULL, 
  "MI" VARCHAR(255), 
  "CellPhone" VARCHAR(255), 
  "Date of Birth" TIMESTAMP, 
  "Age" VARCHAR(255), 
  "Gender" VARCHAR(8), 
  "Race Code" VARCHAR(70), 
  "Currently Employed" BOOLEAN DEFAULT E'0', 
  "Is There a Learning Disability" TEXT, 
  "Applied for SSD" VARCHAR(255), 
  "Improved Econ Stability" VARCHAR(255), 
  "Program Entry Date" TIMESTAMP, 
  "Program" INTEGER, 
  "Program Exit Date" TIMESTAMP, 
  "Housing Unit #" INTEGER, 
  "Regular School Attendance" BOOLEAN DEFAULT E'0', 
  "Abused(d) Alcohol/Drugs" BOOLEAN DEFAULT E'0', 
  "Has Health Improved" VARCHAR(255), 
  "Is There a Diagnosed Mental Illness" VARCHAR(255), 
  "Is There a Disability" BOOLEAN DEFAULT E'0', 
  "MoH Mthly Earned Inc" NUMERIC(19,4), 
  "MoH Mthly UnEarned Inc" NUMERIC(19,4), 
  PRIMARY KEY ("MoHID")
);

SELECT setval('"Members of Household_MoHID_seq"', MAX("MoHID")) FROM "Members of Household";

CREATE INDEX "Members of Household_MoHID" ON "Members of Household" ("MoHID");

CREATE TABLE "Members_of_Household_ExportErrors" (
  "Error" VARCHAR(255), 
  "Field" VARCHAR(255), 
  "Row" INTEGER
);


