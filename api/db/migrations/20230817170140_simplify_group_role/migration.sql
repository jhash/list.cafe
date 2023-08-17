/*
  Warnings:

  - You are about to drop the column `groupRoleId` on the `GroupMembership` table. All the data in the column will be lost.
  - You are about to drop the `GroupRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `GroupMembership` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "GroupMembership" DROP CONSTRAINT "GroupMembership_groupRoleId_fkey";

-- DropForeignKey
ALTER TABLE "GroupRole" DROP CONSTRAINT "GroupRole_groupId_fkey";

-- DropTable
DROP TABLE "GroupRole";

-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('VIEW', 'EDIT', 'ADMIN', 'OWNER');

-- AlterTable
ALTER TABLE "GroupMembership" DROP COLUMN "groupRoleId",
ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "groupRole" "GroupRole" NOT NULL DEFAULT 'VIEW';

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
