/*
  Warnings:

  - You are about to drop the column `groupRole` on the `GroupMembership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMembership" DROP COLUMN "groupRole";

-- DropEnum
DROP TYPE "GroupRole";
