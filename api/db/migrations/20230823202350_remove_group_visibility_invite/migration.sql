/*
  Warnings:

  - The values [INVITE] on the enum `GroupVisibility` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GroupVisibility_new" AS ENUM ('PRIVATE', 'LINK', 'PUBLIC');
ALTER TABLE "Group" ALTER COLUMN "visibility" DROP DEFAULT;
ALTER TABLE "Group" ALTER COLUMN "visibility" TYPE "GroupVisibility_new" USING ("visibility"::text::"GroupVisibility_new");
ALTER TYPE "GroupVisibility" RENAME TO "GroupVisibility_old";
ALTER TYPE "GroupVisibility_new" RENAME TO "GroupVisibility";
DROP TYPE "GroupVisibility_old";
ALTER TABLE "Group" ALTER COLUMN "visibility" SET DEFAULT 'PRIVATE';
COMMIT;
