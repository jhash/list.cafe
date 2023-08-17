/*
  Warnings:

  - You are about to drop the column `name` on the `ListMembership` table. All the data in the column will be lost.
  - You are about to drop the `ListGroupRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ListRole" AS ENUM ('VIEW', 'CONTRIBUTE', 'EDIT', 'ADMIN', 'OWNER');

-- DropForeignKey
ALTER TABLE "ListGroupRole" DROP CONSTRAINT "ListGroupRole_groupId_fkey";

-- DropForeignKey
ALTER TABLE "ListGroupRole" DROP CONSTRAINT "ListGroupRole_listId_fkey";

-- AlterTable
ALTER TABLE "ListMembership" DROP COLUMN "name",
ADD COLUMN     "listRole" "ListRole" NOT NULL DEFAULT 'VIEW';

-- DropTable
DROP TABLE "ListGroupRole";

-- CreateTable
CREATE TABLE "ListGroupMembership" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listRole" "ListRole" NOT NULL DEFAULT 'VIEW',
    "listId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "ListGroupMembership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListGroupMembership" ADD CONSTRAINT "ListGroupMembership_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListGroupMembership" ADD CONSTRAINT "ListGroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
