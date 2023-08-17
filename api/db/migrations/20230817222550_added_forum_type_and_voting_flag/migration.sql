-- AlterEnum
ALTER TYPE "ListType" ADD VALUE 'FORUM';

-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN     "voting" BOOLEAN NOT NULL DEFAULT false;
