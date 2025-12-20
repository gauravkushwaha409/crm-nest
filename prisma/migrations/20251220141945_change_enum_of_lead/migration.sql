/*
  Warnings:

  - The values [FERTILITY_PRESERVATION,INFERTILITY_TREATMENT,INFERTILITY_DIAGNOSIS] on the enum `LeadService` will be removed. If these variants are still used in the database, this will fail.
  - The values [LINKEDIN] on the enum `LeadSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LeadCategory" ADD VALUE 'SPAN_TEST_LEAD';
ALTER TYPE "LeadCategory" ADD VALUE 'GYANEA_PATIENT';

-- AlterEnum
BEGIN;
CREATE TYPE "LeadService_new" AS ENUM ('IVF', 'IUI', 'EGG_FREEZING', 'EMBRYO_FREEZING', 'DONOR_PROGRAM_EGG', 'DONAR_PROGRAM_SPERM', 'PGT_PGD', 'TESA_PESA', 'ANTENATAL_CHECKUP', 'INFERTILITY_DIAGNOSIS_GENERAL_COUNSELLING', 'GYANEA');
ALTER TABLE "leads" ALTER COLUMN "service" TYPE "LeadService_new" USING ("service"::text::"LeadService_new");
ALTER TYPE "LeadService" RENAME TO "LeadService_old";
ALTER TYPE "LeadService_new" RENAME TO "LeadService";
DROP TYPE "public"."LeadService_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LeadSource_new" AS ENUM ('WHATSAPP', 'FACEBOOK', 'INSTAGRAM', 'YOUTUBE', 'WEBSITE', 'TIKTOK', 'DOCTOR_REFERRAL', 'SELF_CONTACT', 'ADVERTISEMENT', 'FRIENDS_FAMILY', 'EXISTING_PATIENT', 'TV', 'RADIO', 'OTHER');
ALTER TABLE "leads" ALTER COLUMN "source" TYPE "LeadSource_new" USING ("source"::text::"LeadSource_new");
ALTER TYPE "LeadSource" RENAME TO "LeadSource_old";
ALTER TYPE "LeadSource_new" RENAME TO "LeadSource";
DROP TYPE "public"."LeadSource_old";
COMMIT;
