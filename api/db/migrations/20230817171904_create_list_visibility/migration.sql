-- CreateEnum
CREATE TYPE "ListVisibility" AS ENUM ('PRIVATE', 'GROUP', 'LINK', 'PUBLIC');

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "visibility" "ListVisibility" NOT NULL DEFAULT 'PRIVATE';
