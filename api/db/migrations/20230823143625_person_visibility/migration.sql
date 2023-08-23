-- CreateEnum
CREATE TYPE "PersonVisibility" AS ENUM ('PRIVATE', 'GROUP', 'PUBLIC');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "visibility" "PersonVisibility" NOT NULL DEFAULT 'PRIVATE';
